function roundToTwo(num) {
  const scaled = Math.round(`${num}e+2`);
  return +`${scaled}e-2`;
}

export default function toPercentage(x) {
  return `${roundToTwo(x * 100)}%`;
}
