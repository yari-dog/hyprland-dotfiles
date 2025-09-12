vim.pack.add({
    "https://github.com/stevearc/oil.nvim",     -- file explorer
    "https://github.com/echasnovski/mini.pick", -- like telescope stuff
    "https://github.com/folke/which-key.nvim",  -- tell me what key
    "https://github.com/lambdalisue/vim-suda",  -- save as sudo if i forgor, doesnt need setup
})


require('oil').setup({
    keymaps = {
        ["n"] = { "actions.parent", mode = "n" },
        ["p"] = { "actions.preview", mode = "n" },
        ["qq"] = { "actions.close", mode = "n" },
        ["wv"] = { "actions.select", opts = { vertical = true } },
        ["wh"] = { "actions.select", opts = { horizontal = true } },
    },

    keymaps_help = {
        border = "bold"
    },
})

require('which-key').setup {
    preset = "helix",
    delay = 0,
    icons = {
        colors = false,
        keys = {
            Up = '<Up> ',
            Down = '<Down> ',
            Left = '<Left> ',
            Right = '<Right> ',
            C = '<C-…> ',
            M = '<M-…> ',
            D = '<D-…> ',
            S = '<S-…> ',
            CR = '<CR> ',
            Esc = '<Esc> ',
            ScrollWheelDown = '<ScrollWheelDown> ',
            ScrollWheelUp = '<ScrollWheelUp> ',
            NL = '<NL> ',
            BS = '<BS> ',
            Space = '<Space> ',
            Tab = '<Tab> ',
            F1 = '<F1>',
            F2 = '<F2>',
            F3 = '<F3>',
            F4 = '<F4>',
            F5 = '<F5>',
            F6 = '<F6>',
            F7 = '<F7>',
            F8 = '<F8>',
            F9 = '<F9>',
            F10 = '<F10>',
            F11 = '<F11>',
            F12 = '<F12>',

        },
    },
    win = {
        border = "shadow", -- none, single, double, shadow
    },
}

require('mini.pick').setup()
