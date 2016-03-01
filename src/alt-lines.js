// Alternative implementation of adana-analyze lines:

function selector({tags}) {
  for (let i = 0; i < tags.length; i += 1) {
    if (tags[i] === 'expression' || tags[i] === 'statement' || tags[i] === 'directive') {
      return true;
    }
  }
  return false;
}

export function altLines(locations) {
  const index = {};
  locations
    .filter(selector)
    .forEach(entry => {
      const line = entry.loc.start.line;
      if (index.hasOwnProperty(line)) {
        index[line] = Math.max(index[line], entry.count);
      } else {
        index[line] = entry.count;
      }
    });
  return Object.keys(index).map(line => {
    return {
      line,
      passed: index[line] > 0,
      count: index[line]
    };
  });
}

export function extendWithLines(selectedTags, locations) {
  const lineIndex = {};
  selectedTags.line = [];
  locations
    .filter(selector)
    .forEach(location => {
      const lineNum = location.loc.start.line;
      if (lineIndex[lineNum]) { return; }
      lineIndex[lineNum] = true;
      selectedTags.line.push(location);
    });
}
