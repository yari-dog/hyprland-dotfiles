return {
	{
		"NvChad/nvim-colorizer.lua",
		event = "User FilePost",
		opts = { user_default_options = { name = false } },
		config = function(_, opts)
			require("colorizer").setup(opts)

			vim.defer_fn(function()
				require("colorizer").attach_to_buffer(0)
			end, 0)
		end,
	},
	{
		"folke/noice.nvim",
		event = "VeryLazy",
		opts = {},
		dependencies = {
			"MunifTanjim/nui.nvim",
			"rcarriga/nvim-notify",
		},
		config = function()
			require("noice").setup({
				popupmenu = {
					enabled = true,
					backend = "nui",
					kind_icons = false,
				},
			})
		end,
	},
}
