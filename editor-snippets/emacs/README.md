# LungoJS snippets for Emacs

#### Created by David Basoko (basoko@gmail.com)

##USAGE

- Create a snippets folder in your emacs directory if it does not exist.

```
  mkdir ~/.emacs.d/snippets
  cd ~/.emacs.d/snippets
```

- Download this repo and locate the LungoJS snippets folder for emacs, its into html-mode folder.
- Put in your snippets directory, into the html-mode folder, the LungoJS snippets folder.

```
  ~/.emacs.d/snippets/html-mode/LungoJS/<snippets_files>
```

- Be sure that your snippets directory is loaded from your emacs init file. There should be something like this.

```
  (setq yas/root-directory '(".emacs.d/snippets"
                             "~/.emacs.d/other_directory/snippets/"))
  (mapc 'yas/load-directory yas/root-directory)
```

- Try them from the html-mode!