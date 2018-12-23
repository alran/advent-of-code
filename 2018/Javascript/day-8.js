function calculate(input) {
  let totalMetadata = 0;
  let seen = new Array(input.length);
  let visitedSpaces = 0;

  function addOneSeen(idx) {
    seen[idx] = true;
    visitedSpaces++
  }

  function findNextUnseen(startIdx) {
    let firstUnseen = null;
    let i = startIdx;
    while (firstUnseen === null) {
      if (!seen[i]) {
        firstUnseen = i;
      }
      i++;
    }
    return firstUnseen;
  }

  function calculateMetadata(idx) {
    // now we have the start node at least.
    const numChildren = input[idx];
    const numMetadata = input[idx + 1];
    const nodeCount = 0;

    addOneSeen(idx);
    addOneSeen(idx + 1);

    let childrenCovered = 0;
    while (childrenCovered < numChildren) {
      calculateMetadata(findNextUnseen(idx)); // go to next unseen place.
      childrenCovered++;
    }

    totalMetadata += processMetadata(numMetadata, findNextUnseen(idx));
  }

  function processMetadata(numMetadata, metadataCountIdx) {
    // iterate from here until the first space where its not seen.
    let metadataStartIdx = findNextUnseen(metadataCountIdx);

    let total = 0;
    for (let i = metadataStartIdx; i < metadataStartIdx + numMetadata; i++) {
      const curr = input[i];
      total += curr;
      addOneSeen(i);
    }

    return total;
  }

  calculateMetadata(0);
  return totalMetadata;
}


function calculate(input) {
  let totalMetadata = 0;
  let seen = new Array(input.length);
  let visitedSpaces = 0;
  let savedMetadata = {};

  function addOneSeen(idx) {
    seen[idx] = true;
    visitedSpaces++
  }

  function findNextUnseen(startIdx) {
    let firstUnseen = null;
    let i = startIdx;
    while (firstUnseen === null) {
      if (!seen[i]) {
        firstUnseen = i;
      }
      i++;
    }
    return firstUnseen;
  }

  function calculateMetadata(idx) {
    const numChildren = input[idx];
    const numMetadata = input[idx + 1];
    const nodeCount = 0;

    addOneSeen(idx);
    addOneSeen(idx + 1);
    const childData = [];

    let childrenCovered = 0;
    while (childrenCovered < numChildren) {
      const data = calculateMetadata(findNextUnseen(idx));
      childData.push(data);
      childrenCovered++;
    }

    const metadata = processMetadata(numMetadata, findNextUnseen(idx), childData);
    totalMetadata += metadata;

    if (idx === 0) {
      console.log("ANSWER", metadata);
    }

    return metadata;
  }

  function processMetadata(numMetadata, metadataCountIdx, childData) {
    let metadataStartIdx = findNextUnseen(metadataCountIdx);

    let total = 0;
    for (let i = metadataStartIdx; i < metadataStartIdx + numMetadata; i++) {
      const metadata = input[i];

      if (childData.length > 0) {
        if (metadata <= childData.length) {
          total += childData[metadata - 1];
        }
      } else {
        total += metadata;
      }

      addOneSeen(i);
    }

    return total;
  }

  calculateMetadata(0);
  return totalMetadata;
}
