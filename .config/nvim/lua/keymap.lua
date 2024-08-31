-- basic movement
vim.keymap.set({ "n", "v" }, "n", "h")
vim.keymap.set({ "n", "v" }, "e", "j")
vim.keymap.set({ "n", "v" }, "i", "k")
vim.keymap.set({ "n", "v" }, "o", "l")

-- colemak movements
-- word movement (j is left, l is right)
vim.keymap.set({ "n", "v" }, "j", "b")
vim.keymap.set({ "n", "v" }, "l", "w")
vim.keymap.set({ "n", "v" }, "J", "B")
vim.keymap.set({ "n", "v" }, "L", "W")
vim.keymap.set({ "n", "v" }, "h", "e")
vim.keymap.set({ "n", "v" }, "H", "E")
vim.keymap.set({ "n", "v" }, "gh", "ge")
vim.keymap.set({ "n", "v" }, "gH", "gE")

-- rebind jump list binds
vim.keymap.set({ "n", "v" }, "gn", "<C-o>")
vim.keymap.set({ "n", "v" }, "go", "<C-i>")

-- window navigation
vim.keymap.set({ "n", "v" }, "<C-n>", "<C-w>h")
vim.keymap.set({ "n", "v" }, "<C-e>", "<C-w>j")
vim.keymap.set({ "n", "v" }, "<C-i>", "<C-w>k")
vim.keymap.set({ "n", "v" }, "<C-o>", "<C-w>l")

-- splits
vim.keymap.set("n", "<leader>sh", "<C-w>v") -- split horizontal
vim.keymap.set("n", "<leader>sd", "<C-w>s") -- split horizontal
vim.keymap.set("n", "<leader>sk", "<C-w>c") -- close
vim.keymap.set("t", "<C-space>", "<C-\\><C-n><C-w>h", { silent = true })

-- change things now that we've overwritten
vim.keymap.set("n", "t", "i")
vim.keymap.set("n", "T", "I")
vim.keymap.set("n", "M", "n")
vim.keymap.set("n", "<C-M>", "N")

-- qol
vim.keymap.set("n", "<leader>,", ":nohlsearch<CR>", { silent = true }) -- clear search
vim.keymap.set("n", "U", "<C-R>") -- redo, to match undo
vim.keymap.set("n", "b", "%") -- match brackets

-- folding 
vim.keymap.set("n", "ft", "za") -- toggle fold
vim.keymap.set("n", "fi", "zj") -- move to next fold
vim.keymap.set("n", "fe", "zk") -- move to previous fold
vim.keymap.set("n", "fo", "zO") -- open all folds
vim.keymap.set("n", "fc", "zC") -- close all folds
vim.keymap.set("n", "[f", "[z") -- move to start of fold
vim.keymap.set("n", "]f", "]z") -- move to end of fold

-- just default ones that i should remember
-- gu -> lowercase, gU -> uppercase
-- MARKS EXIST. m{a-zA-Z} to set, '{a-zA-Z} to go to
-- make d not cut, <leader>d to cut
vim.keymap.set("n", "d", '"_d')
vim.keymap.set("n", "<leader>d", "d")
vim.keymap.set("n", "dd", '"_dd')
vim.keymap.set("n", "<leader>dd", "dd")
vim.keymap.set("n", "D", '"_D')
vim.keymap.set("n", "<leader>D", "D")
