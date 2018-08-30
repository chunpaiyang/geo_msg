var gulp = require('gulp');
const mocha = require('gulp-mocha');
const fs = require('fs');
const { spawnSync } = require('child_process');
var forever = require("forever-monitor");
var bg = require("gulp-bg");

gulp.task('setup', () => {
    spawnSync('./setup/setup.sh');
});

gulp.task('localstack',bg("./setup/start.sh"));

const exitCallback = (proc) => { if (proc.errorcode != 0) { process.exit(proc.errorcode); } };
gulp.task("stop", () => {
    bgtask.setCallback(exitCallback);
    bgtask.stop();
  }
);

gulp.task('test', () => {
    gulp.src('test/unittest.js', {read: false})
        .pipe(mocha({'reporter': 'nyan'}));
});

gulp.task('default', ['localstack']);
