/**
 * Build task.
 * @module gulp/tasks/build
 */

import runSequence from 'run-sequence';

export default function buildTask(done) {
  runSequence(
    'cleanup',
    'library-files',
    'report-file',
    done
  );
}
