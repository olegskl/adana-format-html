import gulp from 'gulp';

import cleanup from './gulp/tasks/cleanup';
import build from './gulp/tasks/build';
import serve from './gulp/tasks/serve';
import watch from './gulp/tasks/watch';
import reportFile from './gulp/tasks/report-file';
import libraryFiles from './gulp/tasks/library-files';

gulp
  .task('cleanup', cleanup)
  .task('build', build)
  .task('serve', serve)
  .task('watch', watch)
  .task('report-file', reportFile)
  .task('library-files', libraryFiles);
