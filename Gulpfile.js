var autoprefix = require("gulp-autoprefixer"),
    bourbon    = require("bourbon").includePaths,
    connect    = require("gulp-connect"),
    exec       = require("child_process").exec,
    gulp       = require("gulp"),
    sass       = require("gulp-sass");

var paths = {
  scss: [
    "./core/**/*.scss",
    "./contrib/*.scss"
  ]
};

gulp.task("sass", function () {
  return gulp.src(paths.scss)
    .pipe(sass({
      includePaths: ["styles"].concat(bourbon)
    }))
    .pipe(autoprefix("last 2 versions"))
    .pipe(gulp.dest("./contrib"))
    .pipe(connect.reload());
});

gulp.task("connect", function() {
  connect.server({
    root: "contrib",
    port: 8000,
    livereload: true
  });
});

gulp.task("default", ["sass", "connect"], function() {
  gulp.watch(paths.scss, ["sass"]);
});

gulp.task("accesslint", function() {
  connect.server({
    port: 8000
  });
  exec("bundle exec accesslint-ci scan http://localhost:8000");
  connect.serverClose();
});
