# yari's dotfiles :3
This is the repo for my current hyprland setup.

___

## screenshots
![IMG_7603](https://github.com/yari-dog/hyprland-dotfiles/assets/75224849/5194337e-df5a-4a47-b9fa-a3e67e58265c)


___

## main components
| package                                                     | use                              |
|-------------------------------------------------------------|----------------------------------|
| [hyprland](https://github.com/hyprwm/Hyprland)              | window manager                   |
| [waybar](https://github.com/Alexays/Waybar)      | bar |
| [nvim](https://neovim.io/) (puppymacs :3) | text editor                      |
| [foot](https://codeberg.org/dnkl/foot)                      | terminal                         |
| [fish](https://github.com/fish-shell/fish-shell)            | shell                            |
| [starship](https://github.com/starship/starship)            | prompt                           |
| [rofi](https://github.com/davatorium/rofi)              | runner                           |

___

## general info

### my build
| part    | part 2 electric boogaloo  |
|---------|---------------------------|
| cpu     | i9 9900k                  |
| gpu     | 6900 XT                   |
| mb      | asus maximus XI hero wifi |
| storage | too many SSDs             |
| distro  | i use yiffos btw            |

### dependencies
there's a lot of dependencies in the [dependencies file](dependencies), at some point i'll put them here, but not rn

### stow
honestly, my recommendation for managing dotfiles is with [stow](https://www.gnu.org/software/stow/)

it's a super simple program that symlinks it's contents to the parent directory of the directory it was invoked in

deadass just

``` 
> cd ~/

> git clone <repo>

> cd <repo>

> stow .
```

idk how stow handles pre-existing files but if you backup your existing config beforehand it can't hurt to try

you might need to rm the various directories included in this repo though, idk

___

## credits & thanks
ethan's cat
___
