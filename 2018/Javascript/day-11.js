function findMostPower(serialNumber = 3628) {
  let largestCoord = null;
  let size = null;
  let largestAmount = 0;

  for (let i = 1; i <= 60; i++) {
    const result = calculateFuel(serialNumber, i);
    const mostFuel = result[1];

    if (mostFuel > largestAmount) {
      largestAmount = mostFuel;
      size = i;
      largestCoord = result[0];
    }
  }

  return [largestCoord, size];
}

function calculateFuel(serialNumber = 3628, size = 3) {
  const fuelPower = {};
  let coordinateWithMostPower = null;
  let amountOfPower = 0;

  for (let y = 1; y <= 300; y++) {
    fuelPower[y] = [];
    for (let x = 1; x <= 300; x++) {
      const rackId = x + 10;
      let powerLevel = rackId * y;
      powerLevel += serialNumber;
      powerLevel *= rackId;
      powerLevel = Math.floor((powerLevel / 100) % 10);
      powerLevel -= 5;
      fuelPower[y][x] = powerLevel;

      if (x > size - 1 && y > size - 1) {
        let total = 0;

        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            total += fuelPower[y - i][x - j];
          }
        }

        if (total > amountOfPower) {
          coordinateWithMostPower = [x - size + 1, y - size + 1];
          amountOfPower = total;
        }
      }
    }
  }

  return [coordinateWithMostPower, amountOfPower];
}
