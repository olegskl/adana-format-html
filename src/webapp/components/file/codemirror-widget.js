import codemirror from 'codemirror';

export default class CodemirrorWidget {
  constructor(code, lines, branches) {
    this.type = 'Widget';
    this.code = code;
    this.lines = lines;
    this.branches = branches;
  }

  init() {
    const el = document.createElement('div');
    el.classList.add('file');
    setTimeout(() => {
      const cm = codemirror(el, {
        value: this.code,
        lineNumbers: true,
        theme: 'neo',
        cursorBlinkRate: -1,
        readOnly: true,
        gutters: [
          'CodeMirror-linenumbers',
          'gutter-line-count'
        ]
      });

      const doc = cm.getDoc();

      this.branches
        .filter(branch => branch.count === 0)
        .forEach(({loc}) => {
          if (loc.start.line === loc.end.line && loc.start.column === loc.end.column) {
            const elseEl = document.createElement('span');
            elseEl.classList.add('else-branch-not-taken');
            doc.setBookmark({line: loc.start.line - 1, ch: loc.start.column}, elseEl);
          } else {
            doc.markText(
              {line: loc.start.line - 1, ch: loc.start.column},
              {line: loc.end.line - 1, ch: loc.end.column},
              {className: 'branch-not-taken'}
            );
          }
        });

      this.lines.forEach(line => {
        const lineNum = line.line - 1;
        const countEl = document.createElement('div');
        if (line.count) {
          countEl.classList.add('gutter-line-count-elt--covered');
        } else {
          doc.addLineClass(lineNum, 'background', 'line-not-covered');
          countEl.classList.add('gutter-line-count-elt--not-covered');
        }
        countEl.textContent = line.count;
        cm.setGutterMarker(
          lineNum,
          'gutter-line-count',
          countEl
        );
      });

    }, 0);
    return el;
  }

  update(previous) {
    if (previous.code === this.code) { return null; }
    return this.init();
  }
}
