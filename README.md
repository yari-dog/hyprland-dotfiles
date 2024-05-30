# yari's dotfiles :3
This is the repo for my current hyprland setup.

___

## screenshots
coming soon :3

___

## main components
| package                                                     | use                              |
|-------------------------------------------------------------|----------------------------------|
| [hyprland](https://github.com/hyprwm/Hyprland)              | window manager                   |
| [ags (aylurs gtk shell)](https://github.com/Aylur/ags)      | widgets, (soon greeter & locker) |
| [emacs](https://www.gnu.org/software/emacs/) (puppymacs :3) | text editor                      |
| [foot](https://codeberg.org/dnkl/foot)                      | terminal                         |
| [fish](https://github.com/fish-shell/fish-shell)            | shell                            |
| [starship](https://github.com/starship/starship)            | prompt                           |
| [anyrun](https://github.com/anyrun-org/anyrun)              | runner                           |
| theme management                                            | home built :3                    |

___

## general info

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

## to note:
### AGS & GTK shit
my plan is to build the greeter & locker in AGS for the time being, as I need a useable development environment.
the locker would possibly be built using [gtk-session-lock](https://github.com/Cu3PO42/gtk-session-lock).
however, i do plan on switching to my own C based greeter & locker built with GTK, probably using my own locking system too. idk when that's gonna happen though

### emacs (puppymacs :3)
ill probably move this over to it's own repo soon, it feels weird keeping emacs in my regular dotfile repo but i don't want to deal with that rn

___

## credits & thanks
- [end-4](https://github.com/end-4)

i have taken a lot of inspiration (and quite a bit of code) from end-4's hyprland dots setup.
i kinda just used it as an outline, as i didn't like some of the ways stuff was done there, and i used a LOT of it to actually learn how the fuck to use GTK and stuff


___
