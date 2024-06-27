-- basic movement
vim.keymap.set({ "n", "v" }, "n", "h")
vim.keymap.set({ "n", "v" }, "e", "gj")
vim.keymap.set({ "n", "v" }, "i", "gk")
vim.keymap.set({ "n", "v" }, "o", "l")

-- window navigation
vim.keymap.set({ "n", "v" }, "<C-n>", "<C-w>h")
vim.keymap.set({ "n", "v" }, "<C-e>", "<C-w>j")
vim.keymap.set({ "n", "v" }, "<C-i>", "<C-w>k")
vim.keymap.set({ "n", "v" }, "<C-o>", "<C-w>l")

-- splits
vim.keymap.set("n", "<leader>sh", "<C-w>v") -- split horizontal
vim.keymap.set("n", "<leader>sd", "<C-w>s") -- split horizontal
vim.keymap.set("n", "<leader>so", "<C-w>c") -- close

vim.keymap.set("t", "<C-space>", "<C-\\><C-n><C-w>h", { silent = true })

-- change things now that we've overwritten
vim.keymap.set("n", "t", "i")
vim.keymap.set("n", "m", "n")
vim.keymap.set("n", "M", "N")

vim.keymap.set("n", "H", "^")
vim.keymap.set("n", "L", "$")
