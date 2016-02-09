/**
 * Cleanup task for the build folder.
 * @module gulp/tasks/cleanup
 */

import del from 'del';
import {dest} from '../config';

export default function cleanupTask() {
  return del(dest.root);
}
