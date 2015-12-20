var gulp = require('gulp')
var gutil = require('gulp-util')
var uglify = require('gulp-uglify')
var watchPath = require('gulp-watch-path')
//帮助调试
var sourcemaps = require('gulp-sourcemaps')
var minifycss = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')
var less = require('gulp-less')
var imagemin = require('gulp-imagemin')
var combiner = require('stream-combiner2')

//深度压缩png图片
//var pngquant = require('imagemin-pngquant');
//利用缓存保证没有修改的不用重新压缩或者编译
var cache = require('gulp-cache');


//jslint
var jslint = require('gulp-jslint');

var handlerError = function (err) {
    var colors = gutil.colors;
    console.log('\n');
    gutil.log(colors.red('ERROR!'));
    gutil.log("Filename: "+ colors.red(err.fileName));
    gutil.log('linenum: '+ colors.red(err.lineNumber));
    gutil.log('message: ' + err.message);
    gutil.log('plugin: ' + colors.yellow(err.plugins));
}

gulp.task('watchjs', function () {
    gulp.watch('src/js/**/*.js', function (event) {
        var paths = watchPath(event,'src/','public/');
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('public ' + paths.distPath);

        //帮助解决语法错误
        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            uglify(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)]);
        combined.on('error',handlerError);
    });
});

gulp.task('watchcss', function () {
    gulp.watch('src/css/**/*.css', function (event) {
        var paths = watchPath(event, 'src/', 'public/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('public ' + paths.distPath)

        var combined = combiner.obj(
            gulp.src(paths.srcPath),
            sourcemaps.init(),
            autoprefixer({
                browsers: 'last 2 versions'
            }),
            minifycss(),
            sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        );
        combined.on('error',handlerError);
    })
})

gulp.task('watchless', function () {
    gulp.watch('src/less/**/*.less', function (event) {
        var paths = watchPath(event, 'src/less/', 'src/css/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('public ' + paths.distPath)

        //// 1. 找到 less 文件
        //gulp.src(paths.srcPath)
        //    // 2. 编译为css
        //    .pipe(less())
        //    // 3. 另存文件
        //    .pipe(gulp.dest('public/css'))

        var combined = combiner.obj([
            gulp.src(paths.srcPath),
            less(),
            gulp.dest('src/css')
        ])
        combined.on('error', handlerError)
    })
})

gulp.task('watchimage', function () {
    gulp.watch('src/img/**/*', function (event) {
        var paths = watchPath(event,'src/','public/')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('public ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest('public/img'))
    })
})

gulp.task('uglifyjs', function () {
    var combined = combiner.obj([
        gulp.src('src/js/**/*.js'),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write('./'),
        gulp.dest('public/js/')]);
    combined.on('error', handlerError)
});
//有时我们也需要一次编译所有 css 文件。可以配置 minifyss 任务
gulp.task('minifycss', function () {
    var combined = combiner.obj([
        gulp.src('src/css/**/*.css'),
        sourcemaps.init(),
        autoprefixer({
            browsers: 'last 2 versions'
        }),
        minifycss(),
        sourcemaps.write('./'),
        gulp.dest('public/css/')]);
    combined.on('error', handlerError)
})

gulp.task('lesscss', function () {

    var combined = combiner.obj([
        gulp.src('src/less/**/*.less'),
        less(),
        gulp.dest('src/css')
    ]);
    combined.on('error',handlerError);
})

gulp.task('image', function () {
    var combined = combiner.obj([
        gulp.src('src/img/**/*'),
        imagemin(
            {
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true//类型：Boolean 默认：false 无损压缩jpg图片
            //interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            //multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            //svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            //use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }
        ),
        gulp.dest('public/img')
    ])
    combined.on('error',handlerError);
})

//JSLint Task
gulp.task('jslint', function () {
    return gulp.src('src/js/**/*')
    .pipe(jslint({
        node: true,
        nomen: true,
        sloppy: true,
        plusplus: true,
        unparam: true,
        stupid: true
    }));
});

gulp.task('default',['image','uglifyjs','lesscss','minifycss',
    'watchjs','watchcss','watchimage','watchless','jslint' ]);