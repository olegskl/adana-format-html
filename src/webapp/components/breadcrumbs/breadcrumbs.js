import h from 'virtual-dom/h';

function generateBreadcrumb(name, path) {
  return h('a', {
    className: 'breadcrumb',
    href: `#/${path}`
  }, [name]);
}

function generateBreadcrumbList(path) {
  return path.map((dir, index) => {
    const href = path.slice(0, index + 1).join('/');
    return generateBreadcrumb(dir, href);
  });
}

export default function breadcrumbs({location}) {
  return h('div', {
    className: 'breadcrumbs'
  }, [
    generateBreadcrumb('all files', ''),
    ...generateBreadcrumbList(location.path || [])
  ]);
}
