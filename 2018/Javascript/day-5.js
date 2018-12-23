function isUpperCase(char) {
  return char === char.toUpperCase();
}

function isLowerCase(char) {
  return char === char.toLowerCase();
}

function causeReaction(char, next) {
  const diffCases = (isUpperCase(char) && isLowerCase(next)) || (isLowerCase(char) && isUpperCase(next));
  return diffCases && char.toLowerCase() === next.toLowerCase();
}

function scanPolymer(input) {
  let final = input;

  for (let i = 0; i < final.length - 1; i++) {
    const curr = final[i];
    const next = final[i + 1];
    const prev = final[i - 1];

    if (prev && causeReaction(curr, prev)) {
      final = final.slice(0, i - 1) + final.slice(i - 1 + 2, final.length);
      i -= 2;
    } else if (causeReaction(curr, next)) {
      final = final.slice(0, i) + final.slice(i + 2, final.length);
      i--;
    }
  }

  return final;
}

function removeChar(input, char) {
  let final = input.replace(new RegExp(char, 'g'), '');
  return final.replace(new RegExp(char.toUpperCase(), 'g'), '');
}

function findShortestPolymer(input) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const totals = {};

  for (let i = 0; i < alphabet.length; i++) {
    const letter = alphabet[i];
    const inputMinusLetter = removeChar(input, letter);
    const scanned = scanPolymer(inputMinusLetter);

    totals[letter] = scanned.length;
  }

  return totals;
}
