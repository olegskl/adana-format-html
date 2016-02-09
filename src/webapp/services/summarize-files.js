function countsReducer(result, {metrics}) {
  Object
    .keys(metrics)
    .forEach(tagName => {
      const {passed, total} = metrics[tagName];
      if (result[tagName]) {
        result[tagName].passed += passed;
        result[tagName].total += total;
      } else {
        result[tagName] = {passed, total};
      }
    });
  return result;
}

export default function summarizeFiles(files) {
  const summarizedCounts = files.reduce(countsReducer, {});
  return Object
    .keys(summarizedCounts)
    .reduce((result, tagName) => {
      const {passed, total} = summarizedCounts[tagName];
      result[tagName].value = total ? passed / total : 0;
      return result;
    }, summarizedCounts);
}
