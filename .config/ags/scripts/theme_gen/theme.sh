#!/bin/sh
XDG_CACHE_HOME="$HOME"/.cache
XDG_STATE_HOME="$HOME"/.local/state
CACHE_DIR="$XDG_CACHE_HOME"/ags/user
CONFIG_DIR="$HOME"/.config/ags
SCRIPT_DIR="$CONFIG_DIR"/scripts
STATE_DIR="$XDG_STATE_HOME"/ags

IMG=$(swww query | awk -F 'image: ' '{print $2}' | head -n 1)

echo "$IMG"

wal -c

wal -i "$IMG" -n -e --backend haishoku

cp "$HOME"/.cache/wal/colors.scss "$CACHE_DIR"/generated/colors.scss

cat "$SCRIPT_DIR"/theme_gen/pywal_to_material.scss  >> "$CACHE_DIR"/generated/colors.scss

cp "$CACHE_DIR"/generated/colors.scss "$STATE_DIR"/scss/_material.scss

# ags
sass -I "$STATE_DIR/scss" -I "$CONFIG_DIR/scss" "$CONFIG_DIR/scss/main.scss" "$CACHE_DIR/generated/style.css"
ags run-js "App.resetCss(); App.applyCss('${CACHE_DIR}/generated/style.css');"
