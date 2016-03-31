import h from 'virtual-dom/h';

function generateLineCountClassName(line) {
  if (!line.covered) { return 'line-count'; }
  return line.count ? 'line-count--passed' : 'line-count--not-passed';
}

function generateLineTextClassName(line) {
  if (!line.covered) { return 'line-text--not-covered'; }
  return line.count ? 'line-text' : 'line-text--not-passed';
}

function generateLine(line, index) {
  return h('div', {className: 'line'}, [
    h('pre', {
      className: 'line-number'
    }, [index + 1]),
    h('pre', {
      className: generateLineCountClassName(line)
    }, [line.covered ? line.count : '']),
    h('pre', {
      className: generateLineTextClassName(line),
      innerHTML: line.text
    }, [])
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
  }, lines.map(generateLine));
}
