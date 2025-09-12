config.bind("n", "scroll left", mode="normal")
config.bind("e", "scroll down", mode="normal")
config.bind("i", "scroll up", mode="normal")
config.bind("o", "scroll right", mode="normal")


config.bind("N", "back", mode="normal")
config.bind("O", "forward", mode="normal")
config.bind("I", "tab-prev", mode="normal")
config.bind("E", "tab-next", mode="normal")

config.bind(",", "scroll-page 0 0.5", mode="normal")
config.bind(".", "scroll-page 0 -0.5", mode="normal")

config.bind("H", "search-prev", mode="normal")
config.bind("h", "search-next", mode="normal")
config.bind("u", "undo", mode="normal")
config.bind("a", "mode-enter insert", mode="normal")

# caret mode
config.bind("m", "move-to-prev-char", mode="caret")
config.bind("n", "move-to-next-line", mode="caret")
config.bind("e", "move-to-prev-line", mode="caret")
config.bind("i", "move-to-next-char", mode="caret")

config.bind("M", "scroll left", mode="caret")
config.bind("N", "scroll down", mode="caret")
config.bind("E", "scroll up", mode="caret")
config.bind("I", "scroll right", mode="caret")

config.bind("f", "move-to-end-of-word", mode="caret")

config.bind("K", "tab-close", mode="normal")
config.bind("k", "cmd-repeat-last", mode="normal")

config.bind("s", "cmd-set-text -s :open", mode="normal")
config.bind("t", "cmd-set-text -s :open -t", mode="normal")

config.bind("<Ctrl-.>", "spawn --userscript qute-1pass.sh", mode="normal")
