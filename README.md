# devStackLayout

Simple Gulp 4 UI template for coding web templates.
Compiling SCSS, concating and minification to one file.
Concating and minification JS.
Livereload page

## Technologies
 * Gulp 4
 * Boostrap 5
 * Jquery
 * Sass

## Instalation
`npm install`

### Run devstack:
`gulp default`
Open your web browser: http://localhost:8080 -> You see simple wellcome page.
When you change html or scss, you live see the result. Great :-)


Your final website is on folder public (all css and js are concated and minificated)


## Gulp task
| Task   |      Description      |
|----------|---------------|
| default | Run livereload server, watcher and sass compilator |
| release | Rebuild sass, concat and minifi CSS. Concat and minifi JS |


## Versions
1.1.0 - migrate to Gulp 4
1.0.0 - base with Grunt