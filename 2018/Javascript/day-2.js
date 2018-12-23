function part1(input) {
  let twos = 0;
  let threes = 0;

  for (let i = 0; i < input.length; i++) {
    const str = input[i];
    const counts = {};

    for (let charIdx = 0; charIdx < str.length; charIdx++) {
      const letter = str[charIdx];
      if (counts[letter]) {
        counts[letter]++;
      } else {
        counts[letter] = 1;
      }
    }

    const finalCounts = Object.values(counts);
    if (finalCounts.find(num => num === 2)) {
      twos++;
    }

    if (finalCounts.find(num => num === 3)) {
      threes++;
    }
  }

  return threes * twos;
}

function part2(input) {
  // iterate through every string.
  for (let strIdx = 0; strIdx < input.length; strIdx++) {
    const str = input[strIdx];

    // iterate through all the strings after it, starting with the next one
    for (let nextIdx = 0; nextIdx < str.length; nextIdx++) {
      let numDifferences = 0;
      const nextStr = input[nextIdx];

      // iterate through all the characters
      for (let charIdx = 0; charIdx < str.length; charIdx++) {
        if (str[charIdx] !== nextStr[charIdx]) {
          numDifferences++;
        }
      }

      if (numDifferences === 1) {
        // we found it...
        console.log(`FOUND 1: ${ str } 2: ${ nextStr }`);
        return;
      }
    }
  }
}
