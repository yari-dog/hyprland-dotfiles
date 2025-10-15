config.load_autoconfig()

c.downloads.position = "bottom"
c.downloads.remove_finished = 600000  # 10 minutes

c.editor.command = ["nvim", "-f", "{file}", "-c", "normal {line}G{column0}l"]

c.hints.chars = "arstgmneio"

c.input.mode_override = "normal"
c.input.spatial_navigation = False

c.qt.workarounds.disable_hangouts_extension = True

c.scrolling.bar = "when-searching"
c.scrolling.smooth = False

# c.statusbar.show = "in-mode"
c.statusbar.show = "always"

c.tabs.background = True
c.tabs.last_close = "close"
# c.tabs.min_width = 600
# c.tabs.max_width = 800
c.tabs.position = "top"
c.tabs.select_on_remove = "last-used"
c.tabs.show = "multiple"

c.url.searchengines["DEFAULT"] = "https://kagi.com/search?q={}"
c.url.start_pages = "https://kagi.com/"
c.url.default_page = "https://kagi.com/"

c.window.hide_decoration = True

config.source("custom/gruvbox.py")
config.source("custom/keymaps/colemak-dh.py")
