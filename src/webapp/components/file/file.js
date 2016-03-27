// import h from 'virtual-dom/h';
// import {create} from 'virtual-dom';
import CmW from './codemirror-widget';

// function generateLine(line, index) {
//   const modifier = line.count ? 'passed' : 'not-passed';
//   const lineCountClassName = line.covered ? `line-count--${modifier}` : 'line-count';
//   const lineTextClassName = line.count || !line.covered ? 'line-text' : 'line-text--not-passed';
//   return h('div', {className: 'line'}, [
//     h('pre', {className: 'line-number'}, [index + 1]),
//     h('pre', {className: lineCountClassName}, [line.covered ? line.count : '']),
//     h('pre', {
//       className: lineTextClassName,
//       innerHTML: line.text
//     }, [])
//   ]);
// }

export default function file(node) {
  // const lines = node.contents.split('\n').map(text => {
  //   return {count: 0, covered: false, text};
  // });
  // node.lines.forEach(line => {
  //   const lineNumber = line.line - 1;
  //   lines[lineNumber].covered = true;
  //   lines[lineNumber].count = line.count;
  // });
  // return h('div', {
  //   className: 'file'
  // }, lines.map(generateLine));
  return new CmW(node.contents, node.lines, node.branches || []);
}
