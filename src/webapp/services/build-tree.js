function treeReducer(result, file) {
  file.path.split('/').reduce(function (x, dir, i, dirs) {
    if (i === dirs.length - 1) {
      x[dir] = Object.assign({type: 'file'}, file);
      return x[dir];
    }
    if (!x[dir]) {
      x[dir] = {
        type: 'dir',
        name: dir,
        path: dirs.slice(0, i + 1).join('/'),
        metrics: {},
        contents: {}
      };
    }
    return x[dir].contents;
  }, result);
  return result;
}

function summarize(tree) {
  tree.metrics = Object.keys(tree.contents).reduce((result, name) => {
    const node = tree.contents[name];
    const metrics = node.type === 'file' ? node.metrics : summarize(node).metrics;
    Object.keys(metrics).forEach(tagName => {
      const {passed, total} = metrics[tagName];
      if (result[tagName]) {
        result[tagName].passed += passed;
        result[tagName].total += total;
      } else {
        result[tagName] = {passed, total};
      }
    });
    return result;
  }, {});
  return tree;
}

export default function buildTree(files) {
  return summarize({
    type: 'dir',
    path: '/',
    contents: files.reduce(treeReducer, {})
  });
}
