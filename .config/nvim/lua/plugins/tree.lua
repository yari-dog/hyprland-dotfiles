return {
	"nvim-neo-tree/neo-tree.nvim",
	dependencies = {
		"nvim-lua/plenary.nvim",
		-- "nvim-tree/nvim-web-devicons",
		"MunifTanjim/nui.nvim",
	},
	config = function()
		require("neo-tree").setup({
			enable_git_status = true,
			open_files_do_not_replace_types = { "terminal" },
			use_libuv_file_watcher = true,
			follow_current_file = { enabled = true },
			hijack_netrw_behavior = "open_default",
			default_component_configs = {
				icon = { default = "*" },
				container = { enable_character_fade = true },
			},
		})
		vim.keymap.set("n", "<leader>t", ":Neotree filesystem reveal right<CR>")
	end,
}
