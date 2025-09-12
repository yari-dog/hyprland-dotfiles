-- LSP
vim.pack.add({
    "https://github.com/neovim/nvim-lspconfig", -- just makes lsps work
    "https://github.com/folke/lazydev.nvim",    -- fix lua_ls malding about shit
    "https://github.com/stevearc/conform.nvim", -- code formatting while keeping stuff good
})
-- get lua_ls to shut the fuck up
require('lazydev').setup {
    ft = "lua",
}

vim.lsp.enable({ 'lua_ls' })

-- auto format, etc
require('conform').setup {
    format_on_save = {
        timeout_ms = 500,
        lsp_format = "fallback",
    }
}

vim.keymap.set('n', '<leader>cf', require('conform').format, { desc = "format buffer" })
-- idk
vim.diagnostic.config({
    virtual_text = false,
    severity_sort = true,
})


-- LSP adjacent
vim.pack.add({
    "https://github.com/windwp/nvim-autopairs"
})

require('nvim-autopairs').setup()

-- CMP
