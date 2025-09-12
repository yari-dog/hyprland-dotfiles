-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here
--

vim.g.mapleader = " "


vim.g.maplocalleader = " "

-- source
vim.keymap.set('n', '<leader>s', ':update<CR> :source<CR>')

-- select current line
vim.keymap.set({ 'n' }, "<CR>", "V")

-- Colemak up/down/right with nei
vim.keymap.set({ "n", "o", "x" }, "n", "h")
vim.keymap.set({ "n", "o", "x" }, "e", "gj", { remap = false })
vim.keymap.set({ "n", "o", "x" }, "i", "gk", { remap = false })
vim.keymap.set({ "n", "o", "x" }, "o", "l")

vim.keymap.set("x", "in", "") -- need to set it so that it doesnt fuck up if its already unmapped
vim.keymap.del("x", "in")     -- sends the fucking up-in-v issue to hell.

-- PageUp/PageDown
vim.keymap.set({ "n", "x" }, "m", "<PageUp>", { desc = "PgUp" })
vim.keymap.set({ "n", "x" }, "k", "<PageDown>", { desc = "PgDown" })

-- Jumplist navigation
vim.keymap.set({ "n" }, "<C-i>", "<C-i>", { desc = "Jumplist forward" })
vim.keymap.set({ "n" }, "<C-e>", "<C-o>", { desc = "Jumplist forward" })

-- End of word left/rigt
vim.keymap.set({ "n", "o", "x" }, "I", "ge", { desc = "End of word back" })
vim.keymap.set({ "n", "o", "x" }, "<M-i>", "gE", { desc = "End of WORD back" })
vim.keymap.set({ "n", "o", "x" }, "E", "e", { desc = "End of word forward" })
vim.keymap.set({ "n", "o", "x" }, "<M-e>", "E", { desc = "End of WORD forward" })

-- mini
vim.keymap.set('n', '<leader>po', ":Pick files<CR>", { desc = "mini.pick " })
vim.keymap.set('n', '<leader>ph', ":Pick help<CR>", { desc = "mini help" })

-- oil
vim.keymap.set('n', '<leader>e', ":Oil<CR>", { desc = "oil a mf" })

-- Text objects
-- diw is drw. daw is now dtw.
vim.keymap.set({ "o", "v" }, "r", "i", { desc = "O/V mode: inner (i)" })
vim.keymap.set({ "o", "v" }, "t", "a", { desc = "O/V mode: a/an (a)" })
-- Move visual replace from 'r' to 'R'
vim.keymap.set({ "o", "v" }, "R", "r", { desc = "Replace" })

-- Folds
vim.keymap.set({ "n", "x" }, "<Leader>f", "z", { desc = "folds" })
vim.keymap.set({ "n", "x" }, "<Leader>fa", "za", { desc = "toggle fold under cursor" })
vim.keymap.set({ "n", "x" }, "<Leader>fA", "zA", { desc = "toggle ALL folds under cursor" })
vim.keymap.set({ "n", "x" }, "<Leader>fi", "zc", { desc = "close fold under cursor" })
vim.keymap.set({ "n", "x" }, "<Leader>fI", "zC", { desc = "close ALL folds under cursor" })
vim.keymap.set({ "n", "x" }, "<Leader>fe", "zo", { desc = "open fold under cursor" })
vim.keymap.set({ "n", "x" }, "<Leader>fE", "zO", { desc = "open ALL folds under cursor" })

-- Undo/redo
vim.keymap.set({ "n" }, "<C-r>", "U")
vim.keymap.set({ "n" }, "U", "<C-r>")

-- inSert/append (T)
vim.keymap.set({ "n" }, "t", "i")
vim.keymap.set({ "n" }, "T", "I")
-- { modes = { "n" }, "a", "a" }, // so i remember i didnt change em to t and the fix if i do change
-- { modes = { "n" }, "A", "A" },
-- 'til
-- Breaks diffput
-- { modes = { "n", "o", "x" }, "p", "t" },
-- { modes = { "n", "o", "x" }, "P", "T" },
-- Fix diffput (t for 'transfer')
-- { modes = { "n" }, "dt", "dp", desc = "diffput (t for 'transfer')" },

-- Insert in Visual mode
vim.keymap.set({ "v" }, "T", "I")

-- Search
vim.keymap.set({ "n", "o", "x" }, "h", "n")
vim.keymap.set({ "n", "o", "x" }, "H", "N")

vim.keymap.set({ "n", "o", "x" }, ";", ",")
vim.keymap.set({ "n", "o", "x" }, ",", ";")

-- Move to window using the <ctrl> hjkl keys
vim.keymap.set({ "n", "v" }, "<Leader>wn", "<C-w>h", { desc = "Go to Left Window", remap = false })
vim.keymap.set({ "n", "v" }, "<Leader>we", "<C-w>j", { desc = "Go to lower Window", remap = false })
vim.keymap.set({ "n", "v" }, "<Leader>wi", "<C-w>k", { desc = "Go to upper Window", remap = false })
vim.keymap.set({ "n", "v" }, "<Leader>wo", "<C-w>l", { desc = "Go to right Window", remap = false })
vim.keymap.set({ "n", "v" }, "<Leader>wN", "<C-w>H", { desc = "move window left", remap = false })
vim.keymap.set({ "n", "v" }, "<Leader>wE", "<C-w>J", { desc = "move window down", remap = false })
vim.keymap.set({ "n", "v" }, "<Leader>wI", "<C-w>K", { desc = "move window up", remap = false })
vim.keymap.set({ "n", "v" }, "<Leader>wO", "<C-w>L", { desc = "move window right", remap = false })

-- open windows in ,,
vim.keymap.set("n", "<Leader>wh", "<C-w>s", { desc = "open window horizontally" })
vim.keymap.set("n", "<Leader>wd", "<C-w>v", { desc = "open window vertically" })

vim.keymap.set("n", "<Leader>wk", ":q<CR>", { silent = true, desc = "1984 window" })

-- Misc overridden keys must be prefixed with g
vim.keymap.set({ "n", "x" }, "gU", "U")
vim.keymap.set({ "n", "x" }, "gK", "K")

-- extra alias
vim.keymap.set({ "n" }, "gh", "K")
vim.keymap.set({ "x" }, "gh", "K")
-- Resize window using <ctrl> arrow keys
vim.keymap.set({ "n" }, "<C-Up>", "<cmd>resize -2<cr>", { desc = "Increase Window Height" })
vim.keymap.set({ "n" }, "<C-Down>", "<cmd>resize +2<cr>", { desc = "Decrease Window Height" })
vim.keymap.set({ "n" }, "<C-Left>", "<cmd>vertical resize +2<cr>", { desc = "Decrease Window Width" })
vim.keymap.set({ "n" }, "<C-Right>", "<cmd>vertical resize -2<cr>", { desc = "Increase Window Width" })

-- Move Lines
vim.keymap.set({ "n" }, "<A-e>", "<cmd>execute 'move .+' . v:count1<cr>==", { desc = "Move Down" })
vim.keymap.set({ "n" }, "<A-i>", "<cmd>execute 'move .-' . (v:count1 + 1)<cr>==", { desc = "Move Up" })
vim.keymap.set({ "i" }, "<A-e>", "<esc><cmd>m .+1<cr>==gi", { desc = "Move Down" })
vim.keymap.set({ "i" }, "<A-i>", "<esc><cmd>m .-2<cr>==gi", { desc = "Move Up" })
vim.keymap.set({ "v" }, "<A-e>", ":<C-u>execute \"'<,'>move '>+\" . v:count1<cr>gv=gv", { desc = "Move Down" })
vim.keymap.set({ "v" }, "<A-i>", ":<C-u>execute \"'<,'>move '<-\" . (v:count1 + 1)<cr>gv=gv", { desc = "Move Up" })

-- buffers
vim.keymap.set({ "n" }, "<Leader>bn", "<cmd>bprevious<cr>", { desc = "Prev Buffer" })
vim.keymap.set({ "n" }, "<Leader>bo", "<cmd>bnext<cr>", { desc = "Next Buffer" })
vim.keymap.set({ "n" }, "<Leader>bk", "<cmd>bdelete<cr>", { desc = "Kill Buffer" })
vim.keymap.set({ "n" }, "<Leader>bl", "<cmd>ls<cr>", { desc = "list Buffer" })
-- stop overwriting registers when pasting or xing
vim.keymap.set({ "n", "v" }, "x", '"_x')
vim.keymap.set({ "x" }, "p", '"_dP')
vim.keymap.set({ "x" }, "P", "p")

-- jj to esc
vim.keymap.set({ "i", "v", "t", "o" }, "qq", "<Esc>")

-- escape terminal easier
vim.keymap.set({ "t" }, "<Esc>", "<C-\\><C-n>")

-- lsp binds
vim.keymap.set('n', '<leader>co', vim.diagnostic.open_float, { desc = "open float" })
vim.keymap.set('n', '<leader>c[', '[d', { desc = "goto prev warning/error" })
vim.keymap.set('n', '<leader>c]', ']d', { desc = "goto next warning/error" })
--  vim.keymap.set('n', '<leader>cf', require('conform').format, { desc = "format buffer" })
--  ^^ in lsp.lua
vim.keymap.set('n', '<leader>ca', vim.lsp.buf.code_action, { desc = "code action" })
vim.keymap.set('n', '<leader>cr', vim.lsp.buf.rename, { desc = "rename" })
vim.keymap.set('n', '<leader>cd', vim.lsp.buf.definition, { desc = "goto definition" })
vim.keymap.set('n', '<leader>ck', vim.lsp.buf.hover, { desc = "hover" })
