#!/usr/bin/env bash

set +e 

javascript_escape() {
    # shellcheck disable=SC2001
    sed "s,[\\\\'\"\/],\\\\&,g" <<< "$1"
}

js() {
cat <<EOF
    function isVisible(elem) {
        //if (!elem) return false; 
        var style = elem.ownerDocument.defaultView.getComputedStyle(elem, null);
        if (style.getPropertyValue("visibility") !== "visible" ||
            style.getPropertyValue("display") === "none" ||
            style.getPropertyValue("opacity") === "0") {
            return false;
        }
        return elem.offsetWidth > 0 && elem.offsetHeight > 0;
    };
    function hasPasswordField(form) {
        //if (!form) return false; 
        var inputs = form.getElementsByTagName("input");
        for (var j = 0; j < inputs.length; j++) {
            if (inputs[j].type == "password") return true;
        }
        return false;
    };
    function loadData2Form (form) {
        //if (!form) return; 
        var inputs = form.getElementsByTagName("input");
        var username_filled = false; 
        for (var j = 0; j < inputs.length; j++) {
            var input = inputs[j];
            if (!username_filled && isVisible(input) && (input.type == "text" || input.type == "email" || input.type == "tel" || input.type == "url" || input.type == "number")) {
                input.focus(); input.value = "$(javascript_escape "${USERNAME}")";
                input.dispatchEvent(new Event('change', { bubbles: true })); input.blur(); // bubbles:true from new
                username_filled = true;
            }
            if (input.type == "password" && isVisible(input)) {
                input.focus(); input.value = "$(javascript_escape "${PASSWORD}")";
                input.dispatchEvent(new Event('change', { bubbles: true })); input.blur(); // bubbles:true from new
            }
        }
    };
    var forms = document.getElementsByTagName("form");
    if("$(javascript_escape "${QUTE_URL}")" == window.location.href) {
        for (var i = 0; i < forms.length; i++) {
            if (hasPasswordField(forms[i])) {
                loadData2Form(forms[i]);
            }
        }
    } else {
        alert("Secrets will not be inserted.\\nUrl of this page (" + window.location.href + ") and the one where the user script was started (" + "$(javascript_escape "${QUTE_URL}")" + ") differ.");
    }
EOF
}

if [ -z "$QUTE_FIFO" ]; then echo "Error: QUTE_FIFO not set." >&2; exit 1; fi
if [ -z "$QUTE_URL" ]; then echo "message-error 'QUTE_URL not set.'" >> "$QUTE_FIFO"; exit 1; fi

URL=$(echo "$QUTE_URL" | awk -F/ '{print $3}' | sed 's/^www\.//g') 
TOKEN_TMPDIR="${TMPDIR:-/tmp}"
TOKEN_CACHE="$TOKEN_TMPDIR/1pass.token" 

echo "message-info 'Looking for password for $URL...'" >> "$QUTE_FIFO"

TOKEN=""
OP_SESSION_ARGS="" 

if [ -f "$TOKEN_CACHE" ]; then
    TOKEN_FROM_CACHE=$(cat "$TOKEN_CACHE")
    if op whoami --session="$TOKEN_FROM_CACHE" > /dev/null 2>&1; then
        TOKEN="$TOKEN_FROM_CACHE"
    else
        TOKEN="" 
        > "$TOKEN_CACHE" 
    fi
fi

if [ -z "$TOKEN" ]; then
    if op whoami > /dev/null 2>&1; then
        OP_SESSION_ARGS="" 
    else
        if ! command -v rofi > /dev/null; then echo "message-error '1P: rofi missing.'" >> "$QUTE_FIFO"; exit 1; fi
        MASTER_PASSWORD=$(rofi -dmenu -password -p "1Password Master Password:" -mesg "Enter master password to get session token") 
        
        if [ -z "$MASTER_PASSWORD" ]; then
            TOKEN=""
        else
            TOKEN=$(echo "$MASTER_PASSWORD" | op signin --raw 2>/dev/null)
            if [ -n "$TOKEN" ]; then
                install -m 600 /dev/null "$TOKEN_CACHE"
                echo "$TOKEN" > "$TOKEN_CACHE"
            else
                : 
            fi
        fi
    fi
fi

if [ -n "$TOKEN" ]; then
    OP_SESSION_ARGS="--session=$TOKEN"
fi


if op whoami $OP_SESSION_ARGS > /dev/null 2>&1; then
    UUID=$(op item list $OP_SESSION_ARGS --format json | \
           jq --arg url_pattern "$URL" -r \
           '([.[] | select(.urls[].href | strings | test("(?i)" + $url_pattern)) | .id] | first) // ""') || UUID=""

    if [ -z "$UUID" ] || [ "$UUID" == "null" ]; then
        echo "message-info 'No entry found for $URL by URL. Select item...'" >> "$QUTE_FIFO" 
        if ! command -v rofi > /dev/null; then echo "message-error '1P: rofi missing.'" >> "$QUTE_FIFO"; exit 1; fi

        SELECTED_TITLE=$(op item list $OP_SESSION_ARGS --format json | jq -r '.[].title' | rofi -dmenu -i -p "Select 1Password item for $URL:") || SELECTED_TITLE=""
        
        if [ -n "$SELECTED_TITLE" ]; then
            UUID=$(op item list $OP_SESSION_ARGS --format json | \
                   jq --arg title_exact "$SELECTED_TITLE" -r \
                   '([.[] | select(.title == $title_exact) | .id] | first) // ""') || UUID=""
        else
            UUID="" 
        fi
    fi

    if [ -n "$UUID" ] && [ "$UUID" != "null" ]; then
        ITEM_JSON=$(op item get $OP_SESSION_ARGS "$UUID" --format json)

        if [ -z "$ITEM_JSON" ] || ! echo "$ITEM_JSON" | jq -e . > /dev/null 2>&1; then
            echo "message-error '1P: Failed to get item details for $UUID.'" >> "$QUTE_FIFO"; exit 1;
        fi
        
        PASSWORD=$(echo "$ITEM_JSON" | jq -r '.fields[]? | select(.purpose=="PASSWORD") | .value // empty')
        
        if [ -n "$PASSWORD" ]; then
            ITEM_TITLE=$(echo "$ITEM_JSON" | jq -r '.title // "Item"') 
            USERNAME=$(echo "$ITEM_JSON" | jq -r '.fields[]? | select(.purpose=="USERNAME") | .value // empty')
            if [ -z "$USERNAME" ]; then
                 USERNAME=$(echo "$ITEM_JSON" | jq -r '.fields[]? | select(.label | strings | test("^(username|email|user)$"; "i")) | .value // empty')
            fi
            if [ -z "$USERNAME" ]; then 
                USERNAME=$(echo "$ITEM_JSON" | jq -r '[.fields[]? | select(.type == "STRING" and .purpose == null and (.label | strings | ascii_downcase | test("password|totp|otp") | not)) | .value] | first // empty')
            fi


            printjs() {
                js | sed 's,//.*$,,' | tr '\n' ' ' 
            }
            echo "jseval -q $(printjs)" >> "$QUTE_FIFO"
            echo "message-info '1P: Filled credentials for $ITEM_TITLE.'" >> "$QUTE_FIFO" 

            TOTP=$(op item get $OP_SESSION_ARGS "$UUID" --otp 2>/dev/null) || TOTP=""
            if [ -n "$TOTP" ]; then
                if command -v xclip > /dev/null; then
                    echo "$TOTP" | xclip -in -selection clipboard
                    echo "message-info 'Pasted one time password for $ITEM_TITLE to clipboard'" >> "$QUTE_FIFO" 
                else
                    echo "message-warn '1P: xclip missing, cannot copy OTP.'" >> "$QUTE_FIFO"
                fi
            fi
        else
            ITEM_TITLE_FOR_MSG=$(echo "$ITEM_JSON" | jq -r '.title // "$URL (item details)"')
            echo "message-error 'No password field found for $ITEM_TITLE_FOR_MSG'" >> "$QUTE_FIFO"
        fi
    else
        if [ -n "$SELECTED_TITLE" ]; then 
             echo "message-error 'Entry not found for selected title: \"$SELECTED_TITLE\"'" >> "$QUTE_FIFO"
        else 
             echo "message-error 'No entry found for $URL'" >> "$QUTE_FIFO"
        fi
    fi
else
    echo "message-error '1P: Authentication failed or session could not be established.'" >> "$QUTE_FIFO"
    if [ -n "$MASTER_PASSWORD" ] && [ -z "$TOKEN" ]; then # implies prompt happened but no token resulted
       [ -f "$TOKEN_CACHE" ] && > "$TOKEN_CACHE"
    fi
fi
