class Point {
  constructor(position, velocity) {
    this.x = position[0];
    this.y = position[1];
    this.velocity = velocity;
  }

  shift() {
    this.x += this.velocity[0];
    this.y += this.velocity[1];
  }
}

function printPoints(points, size) {
  const graph = [];

  for (let numRows = 0; numRows < size.height + 2; numRows++) {
    graph.push(new Array(size.width * 2).fill(' '));
  }

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (graph[point.y - Math.abs(size.lowestY) + 1] && graph[point.y - Math.abs(size.lowestY) + 1][point.x - Math.abs(size.lowestX) + 1]) {
      graph[point.y - Math.abs(size.lowestY) + 1][point.x - Math.abs(size.lowestX) + 1] = '#'
    }
  }

  return graph;
}

function getRange(points) {
  const sortedX = points.sort((a, b) => a.x - b.x);
  const width = Math.abs(sortedX[0].x - sortedX[sortedX.length - 1].x);
  const lowestX = sortedX[0].x;
  const sortedY = points.sort((a, b) => a.y - b.y);
  const height = Math.abs(sortedY[0].y - sortedY[sortedY.length - 1].y);

  return { width, height, lowestX, lowestY: sortedY[0].y };
}

function getMessage(input, targetSeconds) {
  const points = [];
  let seconds = 0;

  for (let i = 0; i < input.length; i++) {
    points.push(new Point(...input[i]));
  }
  let size = getRange(points);

  while (true) {
    for (let i = 0; i < points.length; i++) {
      points[i].shift();
    }
    seconds++;

    const newSize = getRange(points);
    if (!targetSeconds && newSize.width > size.width) {
      return getMessage(input, seconds - 1);
    }
    size = newSize;

    if (targetSeconds && seconds === targetSeconds) {
      printPoints(points, getRange(points));
      return;
    }
  }
}
