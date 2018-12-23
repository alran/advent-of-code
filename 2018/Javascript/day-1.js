function part1(input) {
  let total = 0;
  for (let i = 0; i < input.length; i++) {
    const current = input[i];
    total += parseInt(current);
  }

  return total;
}

function part2(input) {
  let totals = {};
  let total = 0;

  while (true) {
    for (let i = 0; i < input.length; i++) {
      const current = input[i];
      total += parseInt(current);

      if (totals[total]) {
        return total;
      }

      totals[total] = true;
    }
  }
}
