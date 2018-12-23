class DirectedEdge {
  constructor(v, w) {
    this.v = v;
    this.w = w;
  }

  from() {
    return this.v;
  }

  to() {
    return this.w;
  }
}

class Graph {
  constructor() {
    this.graph = {};
    this.degrees = {};

    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < this.alphabet.length; i++) {
      const letter = this.alphabet[i];
      this.graph[letter] = [];
      this.degrees[letter] = 0;
    }
  }

  getZeroDegreeElement() {
    const zeroDegreeElements = [];
    for (let i = 0; i < this.alphabet.length; i++) {
      const letter = this.alphabet[i];
      if (this.degrees[letter] === 0) {
        zeroDegreeElements.push(letter);
      }
    }

    return zeroDegreeElements.sort((a, b) => a > b ? 1 : (a < b ? -1 : 0))[0];
  }

  addEdge(v, w) {
    const newEdge = new DirectedEdge(v, w);
    this.graph[v].push(newEdge);

    // keep track of the number of things that are pointing to each element.
    this.degrees[w]++;

    return newEdge;
  }

  removeEdge(edge) {
    const edges = this.graph[edge.from()];
    const index = edges.indexOf(edge);
    const newEdges = [...edges.slice(0, index), ...edges.slice(index + 1)];
    this.degrees[edge.to()]--;

    this.graph[edge.from()] = newEdges;
    return newEdges;
  }

  removeRelatedEdges(v) {
    // find all vertices that include v and remove them.
    for (let letterIdx = 0; letterIdx < this.alphabet.length; letterIdx++) {
      const letter = this.alphabet[letterIdx];
      const edges = this.graph[letter];

      for (let edgeIdx = 0; edgeIdx < edges.length; edgeIdx++) {
        const edge = edges[edgeIdx];
        if (edge.from() === v || edge.to() === v) {
          this.removeEdge(edge);
        }
      };
    }
  }

  sort() {
    const final = [];
    while (final.length < this.alphabet.length) {
      // find zero degree element.
      const zeroDegreeElement = this.getZeroDegreeElement();

      // remove anywhere that includes it as an edge
      this.removeRelatedEdges(zeroDegreeElement);
      this.degrees[zeroDegreeElement] = null;

      // add it to the final order
      final.push(zeroDegreeElement);
    }
    return final;
  }
}

input = input.sort((a, b) => a[1] > b[1] ? 1 : (a[1] < b[1] ? -1 : 0));
x = new Graph();
for (let i = 0; i < input.length; i++) {
  const edge = input[i];
  x.addEdge(edge[0], edge[1]);
}
x.sort();
