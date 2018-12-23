function part1(input) {
  const squares = {};
  let numSquares = 0;

  for (let claimIdx = 0; claimIdx < input.length; claimIdx++) {
    const claim = input[claimIdx];
    const leftStart = claim[0];
    const topStart = claim[1];
    const widthHeight = claim[2].split('x');
    const width = parseInt(widthHeight[0]);
    const height = parseInt(widthHeight[1]);

    for (let rowIdx = topStart; rowIdx < topStart + height; rowIdx++) {
      for (let colIdx = leftStart; colIdx < leftStart + width; colIdx++) {
        const coords = `${ colIdx}, ${ rowIdx }`;
        if (squares[coords]) {
          squares[coords]++;
        } else {
          squares[coords] = 1;
        }

        if (squares[coords] === 2) {
          numSquares++;
        }
      }
    }
  }

  return numSquares;
}
