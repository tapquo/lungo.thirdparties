# LungoJS snippets for Emacs

#### Created by David Basoko (basoko@gmail.com)

##USAGE

- Create a snippets folder in your emacs directory if it does not exist.
- Download this repo and locate the Lungo's snippets folder for emacs.

```
  mkdir ~/.emacs.d/snippets
  cd ~/.emacs.d/snippets
```

- Put in this directory the Lungo's snippets folder (LungoJS folder with html-mode subfolder).
- Be sure that your snippets directory is loaded. In your emacs init file there should be something like this.

```
  (setq yas/root-directory '(".emacs.d/snippets"
                             "~/.emacs.d/other_directory/snippets/"))
  (mapc 'yas/load-directory yas/root-directory)
```

- Try them from the html-mode!