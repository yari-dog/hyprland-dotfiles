vim.g.mapleader = " "
vim.g.maplocalleader = " "

vim.o.clipboard = "unnamedplus"

vim.o.number = true

vim.o.signcolumn = "yes:1"

vim.o.tabstop = 4
vim.o.shiftwidth = 4

vim.o.updatetime = 300

vim.o.termguicolors = true

vim.o.ignorecase = true
vim.o.smartcase = true

vim.o.scrolloff=15

vim.o.foldcolumn = "1"
vim.o.foldlevel = 99
vim.o.foldlevelstart = 99
vim.opt.foldnestmax = 4
vim.o.foldenable = true
vim.opt.foldmethod = "expr"
vim.opt.foldexpr = "v:lua.vim.treesitter.foldexpr()"

