# CV sources

Recreated LaTeX sources of `public/cv/jan-zamostny-cv-en.pdf` / `public/cv/jan-zamostny-cv-cs.pdf`.

- `cv.sty` - shared style (A4, 2 cm margins, Latin Modern, Font Awesome icons, `\cvsection`, `\cventry`, `cvlist`, `cvsub`)
- `cv_en.tex`, `cv_cz.tex` - documents (`cv_cz.tex` is a real Czech version)
- `fonts/` - Font Awesome Free TTFs (OFL), used because `fontawesome5.sty` is not installed
- `latexmkrc` - builds with XeLaTeX into `build/`

## Build

    cd cv
    make            # builds build/cv_en.pdf and build/cv_cz.pdf
    make install    # also copies them into ../public/cv/
    make clean
