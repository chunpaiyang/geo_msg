var gulp = require('gulp');
const mocha = require('gulp-mocha');
const fs = require('fs');
const { spawnSync } = require('child_process');
var forever = require("forever-monitor");
var bg = require("gulp-bg");

gulp.task('test', () => {
    gulp.src('test/unittest.js', {read: false})
        .pipe(mocha({'reporter': 'nyan'}));
});

gulp.task('default', ['localstack']);
