/**
 * Serve task.
 * @module gulp/tasks/serve
 */

import runSequence from 'run-sequence';

export default function serveTask(done) {
  runSequence('build', 'watch', done);
}
