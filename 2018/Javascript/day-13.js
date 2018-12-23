class Piece {
  constructor(currSymbol, spaceUnder, id) {
    const directions = { '>': 'right', '<': 'left', '^': 'up', 'v': 'down' };
    this.direction = directions[currSymbol];
    this.nextTurn = 0;
    this.spaceUnder = spaceUnder;
    this.tick = 0;
    this.id = id;
  }

  turn() {
    const turnOrder = ['left', 'straight', 'right'];
    const turnDir = turnOrder[this.nextTurn];
    if (this.nextTurn === 2) {
      this.nextTurn = 0;
    } else {
      this.nextTurn++;
    }

    if (turnDir === 'left') {
      if (this.direction === 'down') {
        this.direction = 'right';
      } else if (this.direction === 'up') {
        this.direction = 'left';
      } else if (this.direction === 'left') {
        this.direction = 'down';
      } else if (this.direction === 'right') {
        this.direction = 'up';
      }
    } else if (turnDir === 'right') {
      if (this.direction === 'down') {
        this.direction = 'left';
      } else if (this.direction === 'up') {
        this.direction = 'right';
      } else if (this.direction === 'left') {
        this.direction = 'up';
      } else if (this.direction === 'right') {
        this.direction = 'down';
      }
    }

    return this.direction;
  }

  directionSym() {
    const directions = { 'right': '>', 'left': '<', 'up': '^', 'down': 'v' };
    return directions[this.direction];
  }
}

class Board {
  constructor(input) {
    this.board = input.map(row => row.split(''));
    this.setupBoard();
  }

  setupBoard() {
    const pieces = ['^', '>', '<', 'v'];
    this.numPieces = 0;
    for (let rowIdx = 0; rowIdx < this.board.length; rowIdx++) {
      const row = this.board[rowIdx];
      for (let colIdx = 0; colIdx < row.length; colIdx++) {
        const space = row[colIdx];

        if (pieces.includes(space)) {
          this.numPieces++;
          const newPiece = new Piece(space, this.getSpaceUnder(rowIdx, colIdx), this.numPieces);
          this.board[rowIdx][colIdx] = newPiece;
        }
      }
    }
  }

  printBoard() {
    const printable = this.board.map(row => row.map(col => {
      return col.constructor.name === 'Piece' ? col.directionSym() : col;
    }).join('')).join('\n');
    console.log(printable);
    return printable;
  }

  getSpaceUnder(row, col) {
    const above = this.board[row - 1] && this.board[row - 1][col];
    const right = this.board[row][col + 1];
    const below = this.board[row + 1] && this.board[row + 1][col];
    const left = this.board[row][col - 1];

    if (['/', "\\", '|', '+'].includes(above) && ['/', "\\", '|', '+'].includes(below)) {
      // could be straight or a cross
      if (['/', "\\", '-', '+'].includes(right) && ['/', "\\", '-', '+'].includes(left)) {
        return '+';
      }
      return '|';
    }

    if (['/', "\\", '|', '+'].includes(above) && !['/', "\\", '|', '+'].includes(below)) {
      // has something above but nothing above.
      // could be a \ or /
      if (['/', "\\", '-', '+'].includes(right)) {
        return '\\';
      } else if (['/', "\\", '-', '+'].includes(left)) {
        return '/';
      }
    }

    if (['/', "\\", '|', '+'].includes(below) && !['/', "\\", '|', '+'].includes(above)) {
      // has something below but nothing above.
      if (['/', "\\", '-', '+'].includes(right)) {
        return '/';
      } else if (['/', "\\", '-', '+'].includes(left)) {
        return '\\';
      }
    }

    if (['/', "\\", '-', '+'].includes(right) && ['/', "\\", '-', '+'].includes(left)) {
      return '-';
    }
  }

  getNextSpaceCoords(row, col, direction) {
    if (direction === 'up') {
      return [row - 1, col];
    } else if (direction === 'down') {
      return [row + 1, col];
    } else if (direction === 'left') {
      return [row, col - 1];
    } else if (direction === 'right') {
      return [row, col + 1];
    }
  }

  movePiece(piece, row, col) {
    this.board[row][col] = piece.spaceUnder;

    const nextSpaceCoords = this.getNextSpaceCoords(row, col, piece.direction);
    const nextSpace = this.board[nextSpaceCoords[0]][nextSpaceCoords[1]];

    if (nextSpace.constructor.name === 'Piece') {
      this.numPieces -= 2;
      this.board[nextSpaceCoords[0]][nextSpaceCoords[1]] = nextSpace.spaceUnder;
      return true;
    }

    if (nextSpace === '+') {
      piece.turn();
    } else if (nextSpace === "\\") {
      if (piece.direction === 'up') {
        piece.direction = 'left';
      } else if (piece.direction === 'down') {
        piece.direction = 'right';
      } else if (piece.direction === 'left') {
        piece.direction = 'up';
      } else if (piece.direction === 'right') {
        piece.direction = 'down';
      }
    } else if (nextSpace === '/') {
      if (piece.direction === 'up') {
        piece.direction = 'right';
      } else if (piece.direction === 'down') {
        piece.direction = 'left';
      } else if (piece.direction === 'left') {
        piece.direction = 'down';
      } else if (piece.direction === 'right') {
        piece.direction = 'up';
      }
    }

    piece.tick++;
    piece.spaceUnder = nextSpace;
    this.board[nextSpaceCoords[0]][nextSpaceCoords[1]] = piece;

    return true;
  }

  movePieces() {
    let tick = 0;
    while (this.numPieces > 1) {
      for (let rowIdx = 0; rowIdx < this.board.length; rowIdx++) {
        const row = this.board[rowIdx];
        for (let colIdx = 0; colIdx < row.length; colIdx++) {
          const space = row[colIdx];

          if (space.constructor.name === 'Piece' && space.tick === tick) {
            const move = this.movePiece(space, rowIdx, colIdx);
          }
        }
      }

      tick++;
    }

    if (this.numPieces === 1) {
      for (let rowIdx = 0; rowIdx < this.board.length; rowIdx++) {
        const row = this.board[rowIdx];
        for (let colIdx = 0; colIdx < row.length; colIdx++) {
          const space = row[colIdx];

          if (space.constructor.name === 'Piece' && space.tick === tick) {
            return [colIdx, rowIdx];
          }
        }
      }
    }
  }
}

b = new Board(input);
b.movePieces();
