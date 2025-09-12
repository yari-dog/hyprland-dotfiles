#!/usr/bin/env bash

# current_wid=$(xdo id)
selection=$(rofi -i -dmenu $@ -theme ~/.config/rofi/scripts/kaomoji/kaomoji.rasi <$(dirname $0)/kaomoji.txt)
kaomoji=$(echo $selection | sed "s|$(echo -e "\ufeff").*||")
echo -n "$kaomoji" | wl-copy
# xdotool key --window $current_wid --clearmodifiers ctrl+v
