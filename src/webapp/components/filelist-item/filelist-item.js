import h from 'virtual-dom/h';
import toPercentage from '../../services/to-percentage';

function generateMetricsCells(metrics) {
  return Object.keys(metrics).map(tagName => {
    const {passed, total} = metrics[tagName];
    const ratio = total ? passed / total : 0;
    return h('div', {className: 'filelist-item__metric'}, [
      h('span', {className: 'filelist-item__metric__percentage'}, [toPercentage(ratio)]),
      h('span', {className: 'filelist-item__metric__counts'}, [`${passed}/${total}`])
    ]);
  });
}

export default function filelistItem(file) {
  return h('a', {
    className: 'filelist-item',
    href: `#/${file.path}`
  }, [
    h('div', {className: 'filelist-item__name'}, [file.name]),
    ...generateMetricsCells(file.metrics)
  ]);
}
