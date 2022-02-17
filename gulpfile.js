const {src, dest, watch, parallel,series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
// const imagemin = require('gulp-imagemin');
const imagemin = require('gulp-tinypng-free');
const del = require('del');
const fileinclude = require('gulp-file-include');




function brousersync(){
   browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
  
}

function cleandist() {
   return del('dist')
}

function clean() {
   return del('app/components')
}



function images(){
   return src('app/images/**/*')
   .pipe(imagemin({}))
   .pipe(dest('dist/images'));
      

}

// *********************Подключение стилей********************
function scripts(){
   return src([
      'app/js/burger.js', // подключить сюда
      'app/js/main.js'
   ])
   .pipe(concat('main.min.js'))
   .pipe(uglify())
   .pipe(dest('app/js'))
   .pipe(browserSync.stream());
}


function styles(){
   return src('app/scss/style.scss')
       .pipe(scss({outputStyle:'compressed'})) // 'expanded' 'compressed'
       .pipe(concat('style.min.css'))
       .pipe(autoprefixer({
         overrideBrowserslist: ['last 10 versions'],
         grid: true
       }))
       .pipe(dest('app/css'))
       .pipe(browserSync.stream());
}

function htmls(){
  return src('app/html/**/*.html')
     .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
     }))
     .pipe(dest('app/'));
}


function build(){
   return src([
      'app/css/style.min.css',
       'app/founts/**/*',
       'app/js/main.min.js',
       'app/*.html'
   ], {base: 'app'})
   .pipe(dest('dist'))
}


function watching(){
   watch(['app/scss/**/*.scss'], styles);
   watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
   watch(['app/html/**/*.html'],htmls).on('change', browserSync.reload)
}

exports.styles = styles;
exports.watching =  watching;
exports.brousersync = brousersync;
exports.scripts = scripts;
exports.images = images;
exports.cleandist = cleandist;
exports.htmls = htmls;
exports.clean = clean;


exports.build = series(cleandist,images,build,clean) ; 
exports.default = parallel( styles, scripts, brousersync, watching, htmls);