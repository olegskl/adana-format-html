const tagDict = {
  statement: 'Statements',
  branch: 'Branches',
  line: 'Lines',
  function: 'Functions'
};

export default function getMetricTagTitle(tagName) {
  return tagDict[tagName];
}
