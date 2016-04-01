import h from 'virtual-dom/h';

function generateLineCountClassName(line) {
  if (!line.covered) { return 'line-count'; }
  return line.count ? 'line-count--passed' : 'line-count--not-passed';
}

function generateLineTextClassName(line) {
  if (!line.covered) { return 'line-text--not-covered'; }
  return line.count ? 'line-text' : 'line-text--not-passed';
}

function lineNumberGutter(lines) {
  return h('div', {className: 'gutter-line-number'}, [
    lines.map((line, index) => {
      const className = 'line-number';
      const textContent = index + 1;
      return h('pre', {className}, [textContent]);
    })
  ]);
}

function passCountGutter(lines) {
  return h('div', {className: 'gutter-pass-count'}, [
    lines.map(line => {
      const className = generateLineCountClassName(line);
      const textContent = line.covered ? line.count : '';
      return h('pre', {className}, [textContent]);
    })
  ]);
}

function codeGutter(lines) {
  return h('div', {className: 'gutter-code'}, [
    lines.map(line => {
      const className = generateLineTextClassName(line);
      const textContent = line.text;
      return h('pre', {className}, [textContent]);
    })
  ]);
}

export default function file(node) {
  const lines = node.contents.split('\n').map(text => {
    return {count: 0, covered: false, text};
  });
  node.lines.forEach(line => {
    const lineNumber = line.line - 1;
    lines[lineNumber].covered = true;
    lines[lineNumber].count = line.count;
  });
  return h('div', {
    className: 'file'
  }, [
    lineNumberGutter(lines),
    passCountGutter(lines),
    codeGutter(lines)
  ]);
}
