var gulp = require('gulp');
const mocha = require('gulp-mocha');
const fs = require('fs');
const { spawnSync } = require('child_process');

gulp.task('setup', () => {
    spawnSync('./setup/setup.sh');
});

gulp.task('localstack', () => {
    spawnSync('./setup/start.sh');
});

gulp.task('test', () => {
    gulp.src('test/unittest.js', {read: false})
        .pipe(mocha({'reporter': 'nyan'}));
});

gulp.task('default', ['test']);
