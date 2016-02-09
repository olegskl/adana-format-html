import filelist from '../filelist/filelist';
import file from '../file/file';

export default function filebox(subtree) {
  switch (subtree.type) {
  case 'file':
    return file(subtree);
  case 'dir':
  default:
    return filelist(subtree);
  }
}
