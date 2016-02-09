export default function selectFiles(files, selector) {
  const prefix = selector.join('/');
  return files.filter(file => file.path.startsWith(prefix));
}
