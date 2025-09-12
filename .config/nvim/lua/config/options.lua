vim.o.termguicolors = true
vim.o.guicursor = "n-v-c-sm:block,i-ci-ve:ver25-Cursor,r-cr-o:hor20"

-- Sync clipboard between OS and Neovim.
--  Schedule the setting after `UiEnter` because it can increase startup-time.
--  Remove this option if you want your OS clipboard to remain independent.
--  See `:help 'clipboard'`
vim.schedule(function()
    vim.o.clipboard = 'unnamedplus'
end)

vim.o.number = true         -- enable line numbers
vim.o.relativenumber = true -- show relative numbers

vim.o.signcolumn = "yes:1"  -- enable signcolumn, put current line no in sign column
vim.o.smartindent = true    -- syntax aware indentations for newline inserts
vim.o.expandtab = true      -- expand tab input with spaces characters
vim.o.tabstop = 4           -- num of space characters per tab
vim.o.shiftwidth = 4        -- spaces per indentation level
vim.o.shiftround = true     -- < and > set to multiple of shiftwidth
vim.o.ignorecase = true     -- in search
vim.o.smartcase = true      -- in search
vim.o.scrolloff = 15        -- how far from middle do i need to be to scroll

vim.o.foldcolumn = "1"
vim.o.foldlevel = 99
vim.o.foldlevelstart = 99
vim.o.foldnestmax = 4
vim.o.foldenable = true
vim.o.foldmethod = "expr"
vim.o.foldexpr = "v:lua.vim.treesitter.foldexpr()"
vim.o.winborder = "none"

vim.o.completeopt = "menuone,noselect,popup"   -- fuck if i know

vim.o.showmode = false                         -- its already in lualine
vim.o.breakindent = true                       -- on wrapping, or whatever, indent the new line
vim.o.undofile = true                          -- undo history
vim.o.inccommand = 'split'                     --preview substitutions
vim.o.showcmd = true                           -- show like hjkl stuff in bottom

vim.o.completeopt = "menu,menuone,popup,fuzzy" -- modern completion menu
vim.o.complete = ".,o"                         -- use buffer and omnifunc
vim.o.autocomplete = false
vim.o.pumheight = 7
