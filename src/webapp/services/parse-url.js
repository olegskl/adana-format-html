import url from 'url';

export default function parseUrl(urlString) {
  const hash = url.parse(urlString).hash || '';
  const {pathname, query} = url.parse(hash.replace(/^#\/?/, ''), true);
  return {
    path: pathname ? pathname.split('/') : '',
    query
  };
}
