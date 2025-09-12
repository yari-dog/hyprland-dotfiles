vim.pack.add({ "https://github.com/f4z3r/gruvbox-material.nvim" }) -- theme
require('gruvbox-material').setup()
vim.cmd.colorscheme 'gruvbox-material'

vim.pack.add({
    "https://github.com/sphamba/smear-cursor.nvim",   -- make cursor into sludge
    "https://github.com/nvim-lualine/lualine.nvim",   -- line
    "https://github.com/akinsho/bufferline.nvim",     -- buffer line
})


require('smear_cursor').setup {
    cursor_color = "#ebdbb2",
    trailing_stiffness = 0.3,
    damping = 0.8,
    trailing_exponent = 7,
    never_draw_over_target = true,
    gamma = 1,
    transparent_bg_fallback_color = "#282828",
}

require('lualine').setup({
    options = {
        theme = "gruvbox-material",
        component_separators = { left = "", right = "" },
        section_separators = { left = "", right = "" },
    },
    sections = {
        lualine_a = { -- mode
            {
                function()
                    local mode = vim.api.nvim_get_mode().mode
                    local mode_map = {
                        n = "N",
                        no = "N",
                        nov = "N",
                        niI = "N",
                        niR = "N",
                        niV = "N",
                        nt = "N",
                        v = "V",
                        vs = "V",
                        V = "V",
                        Vs = "V",
                        [""] = "V",
                        s = "S",
                        S = "S",
                        [""] = "S",
                        i = "I",
                        ic = "I",
                        ix = "I",
                        R = "R",
                        Rc = "R",
                        Rx = "R",
                        Rv = "R",
                        c = "C",
                        cv = "C",
                        ce = "C",
                        r = "R",
                        rm = "M",
                        ["r?"] = "?",
                        ["!"] = "!",
                        t = "T",
                    }
                    return mode_map[mode] or mode:sub(1, 1):upper()
                end,
                color = { gui = "bold" },
            },
        },

        lualine_c = {
            {
                function()
                    local filename = vim.fn.expand("%:t")
                    local file_status = ""
                    if vim.bo.modified then
                        file_status = file_status .. " *"
                    end
                    if vim.bo.readonly then
                        file_status = file_status .. " x"
                    end
                    if filename == "" then
                        return "[No Name]"
                    end

                    return filename .. file_status
                end,
                icon = "",
            },
        },
    },
    tabline = {},
    winbar = {},
    inactive_winbar = {},
    extensions = {},
})


-- bufferline
local bufferline = require('bufferline')
bufferline.setup {
    options = {
        style_preset = {
            bufferline.style_preset.no_italic,
            bufferline.style_preset.minimal
        },
        numbers = "none",
        close_command = "bdelete! %d",
        right_mouse_command = nil,
        left_mouse_command = "buffer %d",
        middle_mouse_command = nil,
        indicator = {
            icon = "", -- this should be omitted if indicator style is not 'icon'
        },
        buffer_close_icon = "X",
        modified_icon = "*",
        close_icon = "X",
        left_trunc_marker = "<",
        right_trunc_marker = ">",
        max_name_length = 18,
        max_prefix_length = 15,
        tab_size = 15,
        diagnostics = false,
        custom_filter = function(bufnr)
            -- if the result is false, this buffer will be shown, otherwise, this
            -- buffer will be hidden.

            -- filter out filetypes you don't want to see
            local exclude_ft = { "qf", "fugitive", "git" }
            local cur_ft = vim.bo[bufnr].filetype
            local should_filter = vim.tbl_contains(exclude_ft, cur_ft)

            if should_filter then
                return false
            end

            return true
        end,
        show_buffer_icons = false,
        show_buffer_close_icons = true,
        show_close_icon = true,
        show_tab_indicators = false,
        persist_buffer_sort = true, -- whether or not custom sorted buffers should persist
        enforce_regular_tabs = false,
        always_show_bufferline = true,
        sort_by = "id",
    },
}
