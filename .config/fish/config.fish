
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