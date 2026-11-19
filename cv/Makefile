.PHONY: all install clean
all:
	latexmk $(if $(CV_CANARY),-usepretex='\def\cvcanary{$(CV_CANARY)}') cv_en.tex cv_cz.tex
install: all
	cp build/cv_en.pdf ../public/cv/jan-zamostny-cv-en.pdf
	cp build/cv_cz.pdf ../public/cv/jan-zamostny-cv-cs.pdf
clean:
	latexmk -C cv_en.tex cv_cz.tex; rm -rf build
