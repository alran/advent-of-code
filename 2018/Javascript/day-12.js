function getPlantCount(initialState, rules, generations = 0) {
  if (generations === 20) {
    let total = 0;
    let count = generations * 3 * -1;

    for (let j = 0; j < initialState.length; j++) {
      if (initialState[j] === '#') {
        total += count;
      }
      count++;
    }
    return total;
  }

  initialState = '...' + initialState + '...';

  let nextGen = '';

  for (let i = 0; i < initialState.length; i++) {
    const startIdx = i - 2 < 0 ? 0 : i - 2;
    let segment = initialState.slice(startIdx, i + 3);
    if (i === 1) {
      segment = '.' + segment;
    } else if (i === 0) {
      segment = '..' + segment;
    } else if (i === initialState.length - 1) {
      segment += '..';
    } else if (i === initialState.length - 2) {
      segment += '.';
    }
    const matchingRule = rules.find(rule => rule[0] === segment);

    if (matchingRule) {
      nextGen += matchingRule[1];
    } else {
      nextGen += '.';
    }
  }

  return getPlantCount(nextGen, rules, generations + 1);
}

function getMassivePlantCount() {
  const totalAt1000Gen = 74776;
  const amtChangeOver1000Gen = 73000;
  return ((50000000000 - 1000) / 1000) * amtChangeOver1000Gen + totalAt1000Gen;
}
