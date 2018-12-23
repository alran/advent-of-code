class Recipe {
  constructor(val) {
    this.value = val;
    this.next = null;
    this.prev = null;
  }
}

function printList(head) {
  let start = head;
  let count = 0;
  let curr = head;
  const arr = [];
  while (curr !== head || (curr === head && count === 0)) {
    arr.push(curr.value);
    curr = curr.next;
    count++;
  }
  console.log(arr);
}

function printLast10(head) {
  let count = 0;
  let curr = head.prev;
  const arr = [];
  while (count < 10) {
    arr.unshift(curr.value);
    curr = curr.prev;
    count++;
  }
  console.log(arr.join(''));
  return arr.join('');
}

// Part 1

function calculateScores(totalCount) {
  let head = new Recipe(3);
  let end = new Recipe(7)

  head.next = end;
  head.prev = end;
  end.next = head;
  end.prev = head;

  let recipe1 = head;
  let recipe2 = end;

  let count = 2;
  while (count < totalCount + 10) {
    const sum = recipe1.value + recipe2.value;
    const newNums = sum.toString().split('');

    for (let i = 0; i < newNums.length; i++) {
      const newNode = new Recipe(parseInt(newNums[i]));
      newNode.prev = head.prev;
      head.prev.next = newNode;
      head.prev = newNode;
      newNode.next = head;
    }

    let amtToMove = recipe1.value + 1;
    for (let timesToMove = 0; timesToMove < amtToMove; timesToMove++) {
      recipe1 = recipe1.next;
    }

    amtToMove = recipe2.value + 1;
    for (let timesToMove = 0; timesToMove < amtToMove; timesToMove++) {
      recipe2 = recipe2.next;
    }

    count += newNums.length;
  }

  return printLast10(head);
}

// Part 2

function calculateScores(targetEnd) {
  let final = [3, 7];
  targetEnd = targetEnd.toString();
  let one = 0;
  let two = 1;
  let oneVal;
  let twoVal;
  let sum;
  let newNums;

  let count = 2;
  while (true) {
    oneVal = final[one];
    twoVal = final[two];
    sum = oneVal + twoVal;
    newNums = sum.toString().split('');

    for (let i = 0; i < newNums.length; i++) {
      final.push(newNums[i] * 1);
      count++;

      for (let i = 1; i <= targetEnd.length; i++) {
        if (final[final.length - i] !== targetEnd[targetEnd.length - i] * 1) {
          break;
        } else if (i === targetEnd.length) {
          console.log('finished', count - targetEnd.length);
          return;
        }
      }
    }

    one = (oneVal + 1 + one) % final.length;
    two = (twoVal + 1 + two) % final.length;
  }
}
