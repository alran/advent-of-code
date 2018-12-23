
function print(input) {
  console.log(input.join('\n'));
}

function transform(input) {
  let nextStage;
  let row;
  let curr;
  let surrounding;

  for (let i = 0; i < 10; i++) {
    nextStage = [];

    for (let rowCounter = 0; rowCounter < input.length; rowCounter++) {
      nextStage.push(new Array(input[0].length));
    }

    // iterate through each of the elements in the list.
    for (let rowIdx = 0; rowIdx < input.length; rowIdx++) {
      row = input[rowIdx];

      for (let colIdx = 0; colIdx < row.length; colIdx++) {
        curr = row[colIdx];
        surrounding = { '.': 0, '|': 0, '#': 0, undefined: 0 };

        if (input[rowIdx - 1]) {
          surrounding[input[rowIdx - 1][colIdx]]++;
          surrounding[input[rowIdx - 1][colIdx + 1]]++;
          surrounding[input[rowIdx - 1][colIdx - 1]]++;
        }

        if (input[rowIdx + 1]) {
          surrounding[input[rowIdx + 1][colIdx]]++;
          surrounding[input[rowIdx + 1][colIdx - 1]]++;
          surrounding[input[rowIdx + 1][colIdx + 1]]++;
        }

        surrounding[input[rowIdx][colIdx - 1]]++;
        surrounding[input[rowIdx][colIdx + 1]]++;

        if (curr === '.') {
          // open
          nextStage[rowIdx][colIdx] = surrounding['|'] >= 3 ? '|' : '.';
        } else if (curr === '|') {
          // trees
          nextStage[rowIdx][colIdx] = surrounding['#'] >= 3 ? '#' : '|';
        } else if (curr === '#') {
          // lumberyard
          nextStage[rowIdx][colIdx] = (surrounding['#'] >= 1 && surrounding['|'] >= 1) ? '#' : '.';
        }
      }
    }

    print(nextStage.map(row => row.join('')));
    input = nextStage;
  }

  // multiply wooded acres by number of lumberyards
  let wooded = 0;
  let lumberyards = 0;

  for (let rowIdx = 0; rowIdx < input.length; rowIdx++) {
    row = input[rowIdx];

    for (let colIdx = 0; colIdx < row.length; colIdx++) {
      curr = row[colIdx];

      if (curr === '|') {
        wooded++;
      } else if (curr === '#') {
        lumberyards++;
      }
    }
  }

  return wooded * lumberyards;
}
