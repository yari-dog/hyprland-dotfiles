source /usr/share/cachyos-fish-config/cachyos-config.fish

set fish_greeting

if status is-interactive
    # Commands to run in interactive sessions can go here
end

thefuck --alias | source

starship init fish | source

alias emacs "command emacsclient -c -a emacs"
alias ls "exa"
alias cat "bat"
alias htop "btop"
alias vim "nvim"

fish_vi_key_bindings
bind i up-or-search
bind e down-or-search
bind n backward-char
bind o forward-char
bind --erase --preset \cd
