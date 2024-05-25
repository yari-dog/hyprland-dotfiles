;; stop the fucking warning
(setq vc-follow-symlinks t)

(org-babel-load-file
 (expand-file-name
  "config.org"
  user-emacs-directory))
