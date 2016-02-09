import h from 'virtual-dom/h';
import findSubtree from '../../services/find-subtree';
import header from '../header/header';
import stats from '../stats/stats';
import footer from '../footer/footer';
import filebox from '../filebox/filebox';

export default function report(state) {
  const currentPath = state.location.path || [];
  const currentSubtree = findSubtree(state.files, currentPath);
  return h('div', {
    className: 'report'
  }, [
    header(state),
    stats(currentSubtree),
    filebox(currentSubtree),
    footer(state)
  ]);
}
