class Marble {
  constructor(val) {
    this.value = val;
    this.next = null;
    this.prev = null;
  }
}

function playMarbles(playerCount = 412, marbleCount = 7164600 + 1) {
  const scores = {};
  let currMarble = null;
  let marbleIdx = 1;
  let totalPlayed = 0;
  let currPlayer = 1;
  addToCircle(marbleIdx);

  function addToCircle(num) {
    const marbleToAdd = new Marble(num);
    if (!currMarble) {
      marbleToAdd.prev = marbleToAdd;
      marbleToAdd.next = marbleToAdd;
    } else {
      const nextMarble = currMarble.next;
      const skipOneMarble = currMarble.next.next

      nextMarble.next = marbleToAdd;
      skipOneMarble.prev = marbleToAdd;

      marbleToAdd.next = skipOneMarble;
      marbleToAdd.prev = nextMarble;
    }

    currMarble = marbleToAdd;
  }

  function removeCurrentAnd7th(multiple23) {
    if (scores[currPlayer]) {
      scores[currPlayer] += multiple23;
    } else {
      scores[currPlayer] = multiple23;
    }

    const seventh = currMarble.prev.prev.prev.prev.prev.prev.prev;
    const seventhNext = seventh.next;
    const seventhPrev = seventh.prev;
    seventhPrev.next = seventhNext;
    seventhNext.prev = seventhPrev;
    currMarble = seventhNext;

    scores[currPlayer] += seventh.value;
  }

  while (totalPlayed < marbleCount) {
    const nextMarbleIdx = marbleIdx++;

    if (nextMarbleIdx % 23 === 0 && nextMarbleIdx > 0) {
      removeCurrentAnd7th(nextMarbleIdx);
    } else {
      addToCircle(nextMarbleIdx);
    }
    totalPlayed++;

    if (currPlayer === playerCount) {
      currPlayer = 1;
    } else {
      currPlayer++;
    }
  }

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
}

playMarbles();
