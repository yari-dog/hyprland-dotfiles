#!/bin/sh
XDG_CACHE_HOME="$HOME"/.cache
CACHE_DIR="$XDG_CACHE_HOME"/ags/user
CONFIG_DIR="$HOME"/.config/ags
SCRIPT_DIR="$HOME"/.config/ags/scripts
STATE_DIR="$XDG_STATE_HOME"/ags

IMG=$(swww query | awk -F 'image: ' '{print $2}' | head -n 1)

wal -c

wal -i "$IMG" -q -n -t -v -e --backend haishoku

cp "$HOME"/.cache/wal/colors.scss "$CACHE_DIR"/generated/colors.scss

cat "$CONFIG_DIR"/theme_gen/pywal_to_material.scss  >> "$CACHE_DIR"/generated/colors.scss

sass -I "$STATE_DIR/scss" -I "$CONFIG_DIR/scss/fallback" "$CACHE_DIR/user/generated/colors.scss" "$CACHE_DIR/user/generated/colors_classes.scss" --style compressed

cp "$CACHE_DIR"/user/generated/colors_classes.scss "$STATE_DIR"/scss/_material.scss

# ags
sass -I "$STATE_DIR/scss" -I "$CONFIG_DIR/scss" "$CONFIG_DIR/scss/main.scss" "$CACHE_DIR/user/generated/style.css"
ags run-js "App.resetCss(); App.applyCss('${CACHE_DIR}/user/generated/style.css');"
