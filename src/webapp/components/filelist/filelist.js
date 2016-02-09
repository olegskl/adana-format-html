import h from 'virtual-dom/h';
import filelistHeader from '../filelist-header/filelist-header';
import filelistItem from '../filelist-item/filelist-item';

function generateFilelist(tree) {
  return Object
    .keys(tree.contents)
    .map(name => filelistItem(tree.contents[name]));
}

export default function filelist(subtree) {
  return h('div', {
    className: 'filelist'
  }, [
    filelistHeader(subtree),
    ...generateFilelist(subtree)
  ]);
}
