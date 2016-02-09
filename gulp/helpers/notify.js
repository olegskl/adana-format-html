/**
 * Gulp pipeline notification helpers.
 * @module gulp/helpers/notify
 */

import gulpNotify from 'gulp-notify';

/**
 * Pops an error message
 * @param  {Error}     error Captured error.
 * @return {undefined}       Nothing returned.
 */
export default function notify(error) {
  // Send a message to the system notification center:
  gulpNotify.onError({
    title: 'Error',
    message: error.message
  })(error);
}

/**
 * Pops an error message and ends stream without breaking it.
 * @param  {Error}     error Captured error.
 * @return {undefined}       Nothing returned.
 */
notify.andEndStream = function (error) {
  notify(error);
  // Gracefully terminate the current stream to prevent
  // running next pipes which might be dependent on it:
  this.emit('end');
};

/**
 * Logs an error message and forces process to exit with error code.
 * @param  {Error}     error Captured error.
 * @return {undefined}       Nothing returned.
 */
notify.andExit = function (error) {
  notify(error);
  // Force exit with error code:
  process.exit(1); // eslint-disable-line no-process-exit, no-undef
};
