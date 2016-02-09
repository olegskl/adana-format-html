import h from 'virtual-dom/h';
import getMetricTagTitle from '../../services/get-metric-tag-title';

function generateMetricsNameCells(metrics) {
  return Object.keys(metrics).map(tagName => {
    return h('div', {
      className: 'filelist-header__metric'
    }, [getMetricTagTitle(tagName)]);
  });
}

export default function filelistHeader({metrics}) {
  return h('div', {
    className: 'filelist-header'
  }, [
    h('div', {className: 'filelist-header__name'}, ['File/folder name']),
    ...generateMetricsNameCells(metrics)
  ]);
}
