import h from 'virtual-dom/h';
import breadcrumbs from '../breadcrumbs/breadcrumbs';

function breadcrumbsTitle() {
  return h('div', {
    className: 'breadcrumb-title'
  }, ['Code coverage report for']);
}

export default function header(state) {
  return h('h1', {
    className: 'header'
  }, [
    breadcrumbsTitle(),
    breadcrumbs(state)
  ]);
}
