#!/bin/sh
XDG_CACHE_HOME="$HOME"/.cache
XDG_STATE_HOME="$HOME"/.local/state
CACHE_DIR="$XDG_CACHE_HOME"/ags/user
CONFIG_DIR="$HOME"/.config/ags
SCRIPT_DIR="$CONFIG_DIR"/scripts
STATE_DIR="$XDG_STATE_HOME"/ags

# get -l flag, if present, and the -i flag, which is the image path
# if -l is empty use swww query, else use the provided path

IMG=""
light_mode=false
backend=""

# get flags and arguments
# -i expects an argument, but is not required
# same for -b
# -l is a flag, and is not required
while getopts 'i:lb:' flag; do
	case "${flag}" in
		i) IMG="${OPTARG}" ;;
		l) light_mode=true ;;
		b) backend="${OPTARG}" ;;
	esac
done


# if image path is not provided, use swww query
if [ -z "$IMG" ]; then
	IMG=$(swww query | awk -F 'image: ' '{print $2}' | head -n 1)
fi


# set light mode to correct value
if [ "$light_mode" = true ]; then
    light_mode='-l'
else
    light_mode=''
fi


# if backend is not provided, use '' else '--backend $backend'
if [ -z "$backend" ]; then
	backend=''
else
	backend="--backend $backend"
fi

wal -c

wal -s -t -i "$IMG" -n -q -e $backend $light_mode 

cp "$HOME"/.cache/wal/colors.scss "$CACHE_DIR"/generated/colors.scss

cat "$SCRIPT_DIR"/theme_gen/pywal_to_material.scss  >> "$CACHE_DIR"/generated/colors.scss

cp "$CACHE_DIR"/generated/colors.scss "$STATE_DIR"/scss/_material.scss

# ags
sass -I "$STATE_DIR/scss" -I "$CONFIG_DIR/scss" "$CONFIG_DIR/scss/main.scss" "$CACHE_DIR/generated/style.css"
# following line breaks ags when the script is run from ags

#ags run-js "App.resetCss(); App.applyCss('${CACHE_DIR}/generated/style.css');"
$SCRIPT_DIR/theme_gen/apply.sh
