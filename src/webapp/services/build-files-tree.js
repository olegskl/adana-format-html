function treeReducer(result, file) {
  file.path.split('/').reduce(function (x, dir, i, dirs) {
    if (i === dirs.length - 1) {
      x[dir] = file.path;
    } else if (!x[dir]) {
      x[dir] = {};
    }
    return x[dir];
  }, result);
  return result;
}

export default function buildFilesTree(files) {
  return files.reduce(treeReducer, {});
}
