source /usr/share/cachyos-fish-config/cachyos-config.fish

function y
	set tmp (mktemp -t "yazi-cwd.XXXXXX")
	yazi $argv --cwd-file="$tmp"
	if read -z cwd < "$tmp"; and [ -n "$cwd" ]; and [ "$cwd" != "$PWD" ]
		builtin cd -- "$cwd"
	end
	rm -f -- "$tmp"
end

set fish_greeting

if status is-interactive
    # Commands to run in interactive sessions can go here
end

thefuck --alias | source

starship init fish | source

op completion fish | source

# make fetch look pretty
alias fastfetch "hyfetch --args='--color-keys 3 --color-title 3'"

# replace with swag rust
alias ls eza
alias cat bat
alias htop btop
alias vim nvim

# vimsism
alias :q exit
alias :wq exit
alias gg "cd ../"

fish_vi_key_bindings
bind i up-or-search
bind e down-or-search
bind n backward-char
bind o forward-char
bind --erase --preset \cd
