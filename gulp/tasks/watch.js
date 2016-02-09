/**
 * Build changes watcher task.
 * @module gulp/tasks/watch
 */

import gulpWatch from 'gulp-watch';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import mergeStream from 'merge-stream';
import applyTransform from '../middleware/apply-transform';
import {src, dest} from '../config';

function watchWebapp() {
  return gulpWatch(`${src.root}/**/*.*`, {read: false}, () => {
    runSequence('report-file');
  });
}

function watchLib() {
  return gulpWatch(src.libraryFiles, {read: false}, () => {
    runSequence('library-files');
  });
}

/**
* Watches the output folder for changes and reloads the browser.
* @param  {Function} [done] Optional done callback (not used).
* @return {Stream}          Merged webapp/lib stream.
*/
export default function watchTask() {
  browserSync.create().init({
    files: [
      `${dest.root}/*.*`
    ],
    server: {
      baseDir: dest.root,
      index: '/report.html'
    },
    middleware: [
      applyTransform()
    ]
  });

  return mergeStream(
    watchWebapp(),
    watchLib()
  );
}
