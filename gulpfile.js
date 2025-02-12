const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass")); // o gulp-sass é um pacote responsável por integrar o sass ao gulp mas quem vai fazer a compilação do sass, é o pacote do sass, por isso 2 require
const sourcemaps = require("gulp-sourcemaps"); // mapear erros de scss caso
const uglify = require("gulp-uglify"); // compilar o js
const imagemin = require("gulp-imagemin"); // comprimir imagens

function compilaSass() {
  return gulp
    .src("./src/styles/main.scss") // executar o gulp src para pegar os arquivos fonte
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    ) // depois com o pipe vamos executar a compilação do sass e minimificar o css
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./build/styles")); // e aqui vamos enviá-los para a pasta destino
}

function comprimeJs(){
  return gulp.src('./src/scripts/*.js') // passar onde estão os arquivos JS
    .pipe(uglify()) // executar o plugin do gulp
    .pipe(gulp.dest('./build/scripts')) // para onde mandaremos os arquivos js comprimidos
}

function comprimeImagens(){
  return gulp.src('./src/img/*') // passar onde estão os arquivos de imagens
    .pipe(imagemin()) // executar o plugin do gulp
    .pipe(gulp.dest("./build/img")) // para onde mandaremos os arquivos img comprimidos
}

exports.default = gulp.parallel(compilaSass, comprimeJs, comprimeImagens);

exports.watch = function (){
  gulp.watch("./src/styles/*.scss", { ignoreInitial: false }, gulp.series(compilaSass));
  gulp.watch("./src/scripts/*.js", { ignoreInitial: false }, gulp.series(comprimeJs));
  gulp.watch("./src/img/*", { ignoreInitial: false }, gulp.series(comprimeImagens));
}
