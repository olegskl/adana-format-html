/**
 * Report template file builder.
 * @module gulp/tasks/report-file
 */

import gulp from 'gulp';
import gulpIf from 'gulp-if';
import gulpPlumber from 'gulp-plumber';
import gulpUglify from 'gulp-uglify';
import gulpCssmin from 'gulp-cssmin';
import gulpHtmlmin from 'gulp-htmlmin';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpPostcss from 'gulp-postcss';
import postcssCustomProperties from 'postcss-custom-properties';
import autoprefixer from 'autoprefixer';
import postcssExtend from 'postcss-extend';
import postcssImport from 'postcss-import';

import notify from '../helpers/notify';
import {inlineScripts, inlineStyles} from '../helpers/inline';
import {env, src, dest, babelrc, browsers} from '../config';

/**
 * Returns a processed stream of critical styles.
 * @return {Stream} Processed critical styles stream.
 */
function streamCriticalStyles() {
  return gulp
    .src(src.stylesMain)
    .pipe(gulpPlumber(notify.andEndStream))
    .pipe(gulpPostcss([
      autoprefixer({browsers}),
      postcssImport(),
      postcssCustomProperties(),
      postcssExtend()
    ]))
    .pipe(gulpIf(env.needsMinification, gulpCssmin()));
}

/**
 * Returns a processed stream of critical scripts.
 * @return {Stream} Processed critical scripts stream.
 */
function streamCriticalScripts() {
  return browserify(src.scriptsMain)
    .transform(babelify.configure(babelrc))
    .bundle()
    .on('error', notify.andEndStream)
    .pipe(source('inline.js'))
    .pipe(buffer())
    .pipe(gulpIf(env.needsMinification, gulpUglify()));
}

/**
 * Builds the report template file.
 * @param  {Function} [done] Optional done callback (not used).
 * @return {Stream}          Generated index file stream.
 */
export default function reportFileTask() {
  return gulp
    .src(src.htmlIndex)
    .pipe(inlineStyles(streamCriticalStyles()))
    .pipe(inlineScripts(streamCriticalScripts()))
    .pipe(gulpIf(env.needsMinification, gulpHtmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(dest.root));
}
