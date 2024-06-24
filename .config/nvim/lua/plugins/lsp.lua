return {
	{
		"williamboman/mason.nvim",
		config = function()
			require("mason").setup()
		end,
	},
	{
		"williamboman/mason-lspconfig.nvim",
		config = function()
			require("mason-lspconfig").setup({
				ensure_installed = { "lua_ls", "clangd", "rust_analyzer" },
			})
		end,
	},
	{
		"folke/neodev.nvim",
	},
	{
		"neovim/nvim-lspconfig",
		config = function()
			local capabilities = vim.lsp.protocol.make_client_capabilities()
			local on_attach = function(_, bufnr)
				local buf_set_keymap = function(keys, func)
					vim.keymap.set("n", keys, func, { buffer = bufnr })
				end

				buf_set_keymap("<leader>r", vim.lsp.buf.rename)
				buf_set_keymap("<leader>a", vim.lsp.buf.code_action)
				buf_set_keymap("gD", vim.lsp.buf.declaration)
				buf_set_keymap("gd", vim.lsp.buf.definition)
				buf_set_keymap("gI", vim.lsp.buf.implementation)
				buf_set_keymap("K", vim.lsp.buf.hover)

				buf_set_keymap("gr", require("telescope.builtin").lsp_references)
				buf_set_keymap("<leader>s", require("telescope.builtin").lsp_document_symbols)
				buf_set_keymap("<leader>S", require("telescope.builtin").lsp_dynamic_workspace_symbols)

				vim.api.nvim_buf_create_user_command(bufnr, "Format", function(_)
					vim.lsp.buf.format()
				end, {})
			end
			capabilities = require("cmp_nvim_lsp").default_capabilities(capabilities)

			require("mason").setup()
			require("mason-lspconfig").setup_handlers({
				function(server_name)
					require("lspconfig")[server_name].setup({
						on_attach = on_attach,
						capabilities = capabilities,
					})
				end,

				["lua_ls"] = function()
					require("neodev").setup()
					require("lspconfig").lua_ls.setup({
						on_attach = on_attach,
						capabilities = capabilities,
					})
				end,
			})
		end,
	},
}
