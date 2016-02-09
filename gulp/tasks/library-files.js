/**
 * Library files transpiler.
 * @module gulp/tasks/library-files
 */

import gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import gulpPlumber from 'gulp-plumber';
import gulpChanged from 'gulp-changed';

import notify from '../helpers/notify';
import {src, dest, babelrc} from '../config';

/**
 * Transpiles the library files.
 * @param  {Function} [done] Optional done callback (not used).
 * @return {Stream}          Transpiled library file stream.
 */
export default function libraryFilesTask() {
  return gulp
    .src(src.libraryFiles)
    .pipe(gulpPlumber(notify.andEndStream))
    .pipe(gulpChanged(dest.root))
    .pipe(gulpBabel(babelrc))
    .pipe(gulp.dest(dest.root));
}
