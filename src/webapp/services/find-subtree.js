export default function findSubtree(tree, path) {
  let subtree = tree;
  if (!path.length) { return subtree; }

  for (const dir of path) {
    if (subtree.contents[dir]) {
      subtree = subtree.contents[dir];
    } else {
      subtree = {
        contents: {}
      };
      break;
    }
  }

  return subtree;
}
