;; function to run load-file twice as a hack
(defun reload-init-file ()
  (interactive)
  (load-file user-init-file)
  (ignore (elpaca-process-queues nil)))

(defun find-config-file (filename)
  (interactive)
  (find-file (expand-file-name filename user-emacs-directory)))

(use-package general
  :ensure t  
  :config
  (general-evil-setup)

  ;; (colemak dh)
  ;; left/previous is always n
  ;; right/next is always o
  ;; new/make/create is always m
  ;; kill/close is always k

  (general-create-definer yari/leader-keys
    :states '(normal insert visual emacs)
    :keymaps 'override
    :prefix "SPC"
    :global-prefix "M-SPC") ;; for insert mode
  ;; general bindings 
  (yari/leader-keys
    "." '(find-file :wk "find file")
    "SPC" '(counsel-M-x :wk "Counsel M-x")
    "f r" '(counsel-recentf :wk "find recent files")
    "TAB TAB" '(comment-line :wk "comment lines"))

  ;; make C-i actually C-i and not tab because that's a thing for some reason
  (define-key input-decode-map (kbd "C-i") (kbd "H-i"))
  ;; window management
  (general-define-key
   ;; for window navigation in colemac mod-dh
   :states '(normal insert visual emacs treemacs)
   :keymaps 'override
   ;; moving cursor between windows
   ;; using C- prefix because I want to be able to do it no matter what mode i'm in
   "C-n" '(evil-window-left :wk "window left")
   "C-e" '(evil-window-down :wk "window down")
   "H-i" '(evil-window-up :wk "window up")
   "C-o" '(evil-window-right :wk "window right"))

  ;; general window stuff
  (yari/leader-keys
    "w" '(:ignore t :wk "windows")
    "w k" '(evil-window-delete :wk "kill window")
    "w m" '(evil-window-vnew :wk "make new window")
    "w h" '(evil-window-vsplit :wk "side split")
    "w d" '(evil-window-split :wk "down split"))

  ;; swaps buffers between windows
  (yari/leader-keys 
    "w N" '(buf-move-left :wk "swap window left")
    "w E" '(buf-move-down :wk "swap window down")
    "w I" '(buf-move-up :wk "swap window up")
    "w O" '(buf-move-right :wk "swap window right"))

  ;;same as movement above but SPC w <> instead
  (yari/leader-keys
    "w n" '(evil-window-left :wk "window left")
    "w e" '(evil-window-down :wk "window down")
    "w i" '(evil-window-up :wk "window up")
    "w o" '(evil-window-right :wk "window right"))

  ;; buffer control
  (yari/leader-keys
    "b" '(:ignore t :wk "buffer") ;; b is the prefix for the rest, :ignore says "this isn't a real binding" 
    "b s" '(switch-to-buffer :wk "switch buffer") ;; :wk is a tool hint for which-key plugin
    "b k" '(kill-this-buffer :wk "kill buffer")
    "b e" '(next-buffer :wk "next buffer")
    "b n" '(previous-buffer :wk "previous buffer")
    "b r" '(revert-buffer :wk "reload buffer (revert)")
    "b i" '(ibuffer :wk "ibuffer")
    "b R" '(rename-buffer :wk "rename buffer"))

  ;; eval (mostly just for when modifying the config)
  (yari/leader-keys
    "e" '(:ignore t :wk "buffer")
    "e r" '(eval-region :wk "eval selected region")
    "e b" '(eval-buffer :wk "eval buffer"))

  ;; help binds
  (yari/leader-keys
    "h" '(:ignore t :wk "help")
    "h f" '(describe-function :wk "describe function")
    "h v" '(describe-variable :wk "describe variable")
    "h r r" '(reload-init-file :wk "reload config")
    ;; docs
    "h d" '(:ignore t :wk "emacs docs")
    "h d m" '(info-emacs-manual :wk "The Emacs manual")
    "h d n" '(view-emacs-news :wk "View Emacs news")
    "h k" '(describe-key :wk "Describe key")
    "h m" '(describe-mode :wk "Describe mode")
    ;; not docs
    "h x" '(describe-command :wk "Display full documentation for command")
    "h v" '(describe-variable :wk "Describe variable"))

  ;; tabs
  (yari/leader-keys
    "t" '(:ignore t :wk "tabs")
    "t m" '(tab-line-new-t b :wk "new tab")
    "t k" '(tab-line-close-tab :wk "close tab")
    "t n" '(tab-line-switch-to-prev-tab :wk "previous tab")
    "t o" '(tab-line-switch-to-next-tab :wk "next tab"))

  ;; switch
  (yari/leader-keys
    "s" '(:ignore t :wk "switch")
    "s v" '(vterm-toggle :wk "toggle vterm")
    "s t" '(treemacs :wk "toggle treemacs"))

  ;; zoom
  (general-define-key
   :states '(normal insert visual emacs)
   :keymaps 'override
   "C-=" '(text-scale-increase :wk "increase font size")
   "C--" '(text-scale-decrease :wk "decrease font size"))

  ;; text manipulation
  (yari/leader-keys
    "e" '(:ignore t :wk "edit")
    "e h" '(mark-whole-buffer :wk "mark whole buffer")
    "e c" '(:ignore t :wk "cursor")
    "e c o" '(evil-end-of-line :wk "end of line")
    "e c n" '(evil-beginning-of-line :wk "start of line"))
    
  ;; magit
  (yari/leader-keys
    "g" '(:ignore t :wk "Git")    
    "g /" '(magit-displatch :wk "Magit dispatch")
    "g ." '(magit-file-displatch :wk "Magit file dispatch")
    "g b" '(magit-branch-checkout :wk "Switch branch")
    "g c" '(:ignore t :wk "Create") 
    "g c b" '(magit-branch-and-checkout :wk "Create branch and checkout")
    "g c c" '(magit-commit-create :wk "Create commit")
    "g c f" '(magit-commit-fixup :wk "Create fixup commit")
    "g C" '(magit-clone :wk "Clone repo")
    "g f" '(:ignore t :wk "Find") 
    "g f c" '(magit-show-commit :wk "Show commit")
    "g f f" '(magit-find-file :wk "Magit find file")
    "g f g" '(magit-find-git-config-file :wk "Find gitconfig file")
    "g F" '(magit-fetch :wk "Git fetch")
    "g g" '(magit-status :wk "Magit status")
    "g i" '(magit-init :wk "Initialize git repo")
    "g l" '(magit-log-buffer-file :wk "Magit buffer log")
    "g r" '(vc-revert :wk "Git revert file")
    "g s" '(magit-stage-file :wk "Git stage file")
    "g t" '(git-timemachine :wk "Git time machine")
    "g u" '(magit-stage-file :wk "Git unstage file"))

  ;; open
  (yari/leader-keys
    "o" '(:ignore t :wk "open")
    "o c" '((lambda () (interactive) (find-config-file "config.org")) :wk "edit emacs config")
    "o i" '((lambda () (interactive) (find-config-file "init.el")) :wk "edit emacs init")
    "o k" '((lambda () (interactive) (find-config-file "keybinds.el")) :wk "edit emacs keybinds")
    "o f" '(counsel-find-file :wk "find file")
    "o r" '(counsel-recentf :wk "recent files")
    "o b" '(counsel-bookmark :wk "bookmarks"))

  ;; projectile
  (yari/leader-keys
    "p" '(:ignore t :wk "projectile")
    "p f" '(counsel-projectile-find-file :wk "find file")
    "p p" '(counsel-projectile-switch-project :wk "switch project")
    "p r" '(counsel-projectile-recentf :wk "recent files")
    "p d" '(counsel-projectile-find-dir :wk "find directory")
    "p m" '(projectile-command-map :wk "projectile mode map"))
) 

(provide 'keybinds)
