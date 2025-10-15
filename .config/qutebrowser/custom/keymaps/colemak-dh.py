config.bind("n", "scroll left", mode="normal")
config.bind("e", "scroll down", mode="normal")
config.bind("i", "scroll up", mode="normal")
config.bind("o", "scroll right", mode="normal")

# g binds for go
config.bind("gn", "back", mode="normal")
config.bind("ge", "tab-prev", mode="normal")
config.bind("gE", "tab-move -", mode="normal")
config.bind("gi", "tab-next", mode="normal")
config.bind("gI", "tab-move +", mode="normal")
config.bind("go", "forward", mode="normal")


# replace go
config.bind("gO", "cmd-set-text :open {url:pretty}", mode="normal")
config.bind("gOO", "cmd-set-text :open -t -r {url:pretty}", mode="normal")


config.bind("k", "scroll-page 0 0.5", mode="normal")
config.bind("m", "scroll-page 0 -0.5", mode="normal")

config.bind("H", "search-prev", mode="normal")
config.bind("h", "search-next", mode="normal")

config.bind("u", "undo", mode="normal")

config.bind("a", "mode-enter insert", mode="normal")
config.bind("t", "mode-enter insert", mode="normal")

# caret mode
config.bind("n", "move-to-prev-char", mode="caret")
config.bind("e", "move-to-next-line", mode="caret")
config.bind("i", "move-to-prev-line", mode="caret")
config.bind("o", "move-to-next-char", mode="caret")

config.bind("N", "scroll left", mode="caret")
config.bind("E", "scroll down", mode="caret")
config.bind("I", "scroll up", mode="caret")
config.bind("O", "scroll right", mode="caret")

config.bind("f", "move-to-end-of-word", mode="caret")

config.bind("K", "tab-close", mode="normal")

config.bind("s", "cmd-set-text -s :open", mode="normal")
config.bind("S", "cmd-set-text -s :open -t", mode="normal")


config.bind("<Ctrl-.>", "spawn --userscript qute-1pass.sh", mode="normal")
