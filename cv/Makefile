.PHONY: all install clean
all:
	latexmk cv_en.tex cv_cz.tex
install: all
	cp build/cv_en.pdf build/cv_cz.pdf ../public/
clean:
	latexmk -C cv_en.tex cv_cz.tex; rm -rf build
