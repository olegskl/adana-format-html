// Alternative implementation of adana-analyze lines:
export default function lines(locations) {
  const index = {};
  locations.forEach(entry => {
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
