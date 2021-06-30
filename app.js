let stateGame = [
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
];

let flattedBoard = stateGame.flat();
let currentPlayer = 1;

const CURRENT_PLAYER_TURN = () => `${currentPlayer === 1 ? 'Red ' : 'Grey '} ladies turn`;
const WRONG_LADY_COLOR_MESSAGE = 'What you doin? Those are not your ladies...';

const TURN_DISPLAY = document.getElementById("turnDisplay");
const BOARD = document.getElementById("board");
const BOARD_CELLS = document.getElementsByClassName("rowCell");

let RED_CHECKERS = document.getElementsByClassName("redCheckers");
let GREY_CHECKERS = document.getElementsByClassName("greyCheckers");

let selectedLady = {
  ladyID: -1,
  indexOfFlattedBoardLady: -1,
  seventhSpace: false,
  ninthSpace: false,
  fourteenthSpace: false,
  eighteenthSpace: false,
  minusSeventhSpace: false,
  minusNinthSpace: false,
  minusFourteenthSpace: false,
  minusEighteenthSpace: false,
}

let playerLadies;

/**
 * @param {EventTarget} clickedCell
 * @description Displays alert for wrong Lady color.
 */
const handleWrongCell = (clickedCell) => {
  clickedCell.classList.add('notAllowedCell');
  setTimeout(() => {
    window.alert(WRONG_LADY_COLOR_MESSAGE);
  }, 200);
  return;
}

/**
 * @description Switches player and updates turn board.
 */
const handlePlayerChange = () => {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  handleTurnsDisplay(CURRENT_PLAYER_TURN());
  giveLadiesEventListeners();
}

/**
 * 
 * @param {number} id 
 * @returns The index from the flattedBoard of a Lady by it's id.
 */
const findLadyOnBoard = (id) => flattedBoard.indexOf(id);

const handleTurnsDisplay = (message) => {
  TURN_DISPLAY.innerHTML = message
}

/**
 * 
 * @description Initialize event listeners on the currentPlayer ladies
 *  and handles wrong color lady movement
 */
const giveLadiesEventListeners = () => {
  if (currentPlayer === 1) {
    for (let i = 0; i < RED_CHECKERS.length; i++) {
      RED_CHECKERS[i].addEventListener("click", getPlayerLadies);
      GREY_CHECKERS[i].addEventListener("click", (e) => handleWrongCell);
    }
  } else {
    for (let i = 0; i < GREY_CHECKERS.length; i++) {
      GREY_CHECKERS[i].addEventListener("click", getPlayerLadies);
      RED_CHECKERS[i].addEventListener("click", (e) => handleWrongCell);
    }
  }
}

/**
 * 
 * @param {MouseEvent} e
 * @description Holds the lenght of the current player ladies count
 */
const getPlayerLadies = (e) => {
  if (currentPlayer === 1) {
    playerLadies = RED_CHECKERS;
  } else {
    playerLadies = GREY_CHECKERS;
  }
  removeCellonclick();
  resetBorders(e);
}

/**
 * 
 * @description Removes possible moves from old selected Lady, in case the player re selects a lady.
 */
const removeCellonclick = () => {
  for (let i = 0; i < BOARD_CELLS.length; i++) {
    BOARD_CELLS[i].removeAttribute("onclick");
  }
}

/**
 * 
 * @param {MouseEvent} e
 * @description Resets borders to default
 */
const resetBorders = (e) => {
  for (let i = 0; i < playerLadies.length; i++) {
    playerLadies[i].style.borderWidth = "2px";
    playerLadies[i].style.borderColor = "transparent";
    playerLadies[i].style.borderStyle = "solid";
  }
  resetSelectedLady();
  getSelectedLady(e);
}

/**
 * 
 * @description Resets selected lady properties to default values
 */
const resetSelectedLady = () => {
  selectedLady.ladyID = -1;
  selectedLady.ladyID = -1;
  selectedLady.seventhSpace = false;
  selectedLady.ninthSpace = false;
  selectedLady.fourteenthSpace = false;
  selectedLady.eighteenthSpace = false;
  selectedLady.minusSeventhSpace = false;
  selectedLady.minusNinthSpace = false;
  selectedLady.minusFourteenthSpace = false;
  selectedLady.minusEighteenthSpace = false;
}

/**
 * @param {MouseEvent} e
 * @description Gets index and id of the board cell the selected lady is on
 */
const getSelectedLady = (e) => {
  selectedLady.ladyID = parseInt(e.target.id);
  selectedLady.indexOfBoardPiece = findLadyOnBoard(selectedLady.ladyID);
  getAvailableCells();
}

/**
 * 
 * @description Gets the moves that the selected lady can make
 * validates that the cell is empty, that it is not a white one and by +7, +9, -7 and -9 
 * gets the available movements from that cell.
 */
const getAvailableCells = () => {
  if (
    flattedBoard[selectedLady.indexOfFlattedBoardLady + 7] === 0 &&
    !BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + 7].classList.contains('whiteCell')
  ) {
    selectedLady.seventhSpace = true
  }
  if (
    flattedBoard[selectedLady.indexOfFlattedBoardLady + 9] === 0 &&
    !BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + 9].classList.contains('whiteCell')
  ) {
    selectedLady.ninthSpace = true
  }
  if (
    flattedBoard[selectedLady.indexOfFlattedBoardLady - 7] === 0 &&
    !BOARD_CELLS[selectedLady.indexOfFlattedBoardLady - 7].classList.contains('whiteCell')
  ) {
    selectedLady.minusSeventhSpace = true
  }
  if (
    flattedBoard[selectedLady.indexOfFlattedBoardLady - 9] === 0 &&
    !BOARD_CELLS[selectedLady.indexOfFlattedBoardLady - 9].classList.contains('whiteCell')
  ) {
    selectedLady.minusNinthSpace = true
  }
  checkAvailableJumpSpaces();
}

/**
 * 
 * @description Gets the moves that the selected lady can jump
 *  validates that the cell is empty, that it is not a white one and by +14, +18, -14 and -18 
 * gets the available cell the lady can jump from the selected cell
 */
const checkAvailableJumpSpaces = () => {
  if (currentPlayer === 1) {
    if (
      flattedBoard[selectedLady.indexOfFlattedBoardLady + 14] === 0 &&
      !BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + 14].classList.contains('whiteCell') &&
      flattedBoard[selectedLady.indexOfFlattedBoardLady + 7] >= 12
    ) {
      selectedLady.fourteenthSpace = true;
    }
    if (
      flattedBoard[selectedLady.indexOfFlattedBoardLady + 18] === 0 &&
      !BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + 18].classList.contains('whiteCell') &&
      flattedBoard[selectedLady.indexOfFlattedBoardLady + 9] >= 12
    ) {
      selectedLady.eighteenthSpace = true;
    }
    if (
      flattedBoard[selectedLady.indexOfFlattedBoardLady - 14] === 0 &&
      !BOARD_CELLS[selectedLady.indexOfFlattedBoardLady - 14].classList.contains('whiteCell') &&
      flattedBoard[selectedLady.indexOfFlattedBoardLady - 7] >= 12
    ) {
      selectedLady.minusFourteenthSpace = true;
    }
    if (
      flattedBoard[selectedLady.indexOfFlattedBoardLady - 18] === 0 &&
      !BOARD_CELLS[selectedLady.indexOfFlattedBoardLady - 18].classList.contains('whiteCell') &&
      flattedBoard[selectedLady.indexOfFlattedBoardLady - 9] >= 12
    ) {
      selectedLady.minusEighteenthSpace = true;
    }
  } else {
    if (
      flattedBoard[selectedLady.indexOfFlattedBoardLady + 14] === 0 &&
      !BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + 14].classList.contains('whiteCell') &&
      flattedBoard[selectedLady.indexOfFlattedBoardLady + 7] < 12 && flattedBoard[selectedLady.indexOfFlattedBoardLady + 7] !== 0
    ) {
      selectedLady.fourteenthSpace = true;
    }
    if (
      flattedBoard[selectedLady.indexOfFlattedBoardLady + 18] === 0 &&
      !BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + 18].classList.contains('whiteCell') &&
      flattedBoard[selectedLady.indexOfFlattedBoardLady + 9] < 12 && flattedBoard[selectedLady.indexOfFlattedBoardLady + 9] !== 0
    ) {
      selectedLady.eighteenthSpace = true;
    }
    if (
      flattedBoard[selectedLady.indexOfFlattedBoardLady - 14] === 0 &&
      !BOARD_CELLS[selectedLady.indexOfFlattedBoardLady - 14].classList.contains('whiteCell') &&
      flattedBoard[selectedLady.indexOfFlattedBoardLady - 7] < 12 && flattedBoard[selectedLady.indexOfFlattedBoardLady - 7] !== 0
    ) {
      selectedLady.minusFourteenthSpace = true;
    }
    if (
      flattedBoard[selectedLady.indexOfFlattedBoardLady - 18] === 0 &&
      !BOARD_CELLS[selectedLady.indexOfFlattedBoardLady - 18].classList.contains('whiteCell') &&
      flattedBoard[selectedLady.indexOfFlattedBoardLady - 9] < 12 && flattedBoard[selectedLady.indexOfFlattedBoardLady - 9] !== 0
    ) {
      selectedLady.minusEighteenthSpace = true;
    }
  }
  checkLadyConditions();
}

/**
 * 
 * @description Restricts movements on the selected lady
 */
const checkLadyConditions = () => {
  if (currentPlayer === 1) {
    selectedLady.minusSeventhSpace = false;
    selectedLady.minusNinthSpace = false;
    selectedLady.minusFourteenthSpace = false;
    selectedLady.minusEighteenthSpace = false;
  } else {
    selectedLady.seventhSpace = false;
    selectedLady.ninthSpace = false;
    selectedLady.fourteenthSpace = false;
    selectedLady.eighteenthSpace = false;
  }
  giveLadyBorder();
}

/**
 * 
 * @description Sets a green highlight for the user Lady's showing that the it is movable
 */
const giveLadyBorder = () => {
  if (selectedLady.seventhSpace || selectedLady.ninthSpace || selectedLady.fourteenthSpace || selectedLady.eighteenthSpace
    || selectedLady.minusSeventhSpace || selectedLady.minusNinthSpace || selectedLady.minusFourteenthSpace || selectedLady.minusEighteenthSpace) {
    const LADY = document.getElementById(selectedLady.ladyID);
    LADY.style.borderWidth = "2px";
    LADY.style.borderColor = "green";
    LADY.style.borderStyle = "solid";
    giveCellsClick();
  } else {
    return;
  }
};

/** 
 * @description Sets function for performing the lady movement to the available cells, 
 * on the onClick event based on the selected lady properties 
*/
const giveCellsClick = () => {
  if (selectedLady.seventhSpace) {
    BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + 7].setAttribute("onclick", "makeMove(7)");
  }
  if (selectedLady.ninthSpace) {
    BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + 9].setAttribute("onclick", "makeMove(9)");
  }
  if (selectedLady.fourteenthSpace) {
    BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + 14].setAttribute("onclick", "makeMove(14)");
  }
  if (selectedLady.eighteenthSpace) {
    BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + 18].setAttribute("onclick", "makeMove(18)");
  }
  if (selectedLady.minusSeventhSpace) {
    BOARD_CELLS[selectedLady.indexOfFlattedBoardLady - 7].setAttribute("onclick", "makeMove(-7)");
  }
  if (selectedLady.minusNinthSpace) {
    BOARD_CELLS[selectedLady.indexOfFlattedBoardLady - 9].setAttribute("onclick", "makeMove(-9)");
  }
  if (selectedLady.minusFourteenthSpace) {
    BOARD_CELLS[selectedLady.indexOfFlattedBoardLady - 14].setAttribute("onclick", "makeMove(-14)");
  }
  if (selectedLady.minusEighteenthSpace) {
    BOARD_CELLS[selectedLady.indexOfFlattedBoardLady - 18].setAttribute("onclick", "makeMove(-18)");
  }
}

/** 
 * @param {number} number - amount of cells to move from 
 * @description Makes the move that was clicked.
 *  Resets old cell styles and removes id.
 *  Updates new cell styles and applies id. 
 * 
*/
const makeMove = (number) => {
  BOARD_CELLS[selectedLady.ladyID].className = 'rowCell blackCell';
  BOARD_CELLS[selectedLady.ladyID].id = '';
  if (currentPlayer === 1) {
    BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + number].className = 'rowCell blackCell redChecker';
    BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + number].id = selectedLady.ladyID;
    RED_CHECKERS = document.getElementsByClassName('redChecker');
  } else {
    BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + number].className = 'rowCell blackCell greyChecker';
    BOARD_CELLS[selectedLady.indexOfFlattedBoardLady + number].id = selectedLady.ladyID;
    GREY_CHECKERS = document.getElementsByClassName('greyChecker');
  }

  let indexOfLady = selectedLady.indexOfFlattedBoardLady
  if (number === 14 || number === -14 || number === 18 || number === -18) {
    updateBoardData(indexOfLady, indexOfLady + number, indexOfLady + number / 2);
  } else {
    updateBoardData(indexOfLady, indexOfLady + number);
  }
}

/** 
 * @param {number} indexOfFlattedBoardLady - index of the selected lady from the board.
 * @param {number} modifiedIndex - index of the cell to move from the board.
 * @param {number} removeLady - optional - index of the cell to remove 
 * @description Updates the data from the board based on the new movement.
 *  It also handles removing the other player lady case.
 * 
*/
const updateBoardData = (indexOfFlattedBoardLady, modifiedIndex, removeLady) => {
  flattedBoard[indexOfFlattedBoardLady] = 0;
  flattedBoard[modifiedIndex] = parseInt(selectedLady.ladyID);
  if (removeLady) {
    flattedBoard[removeLady] = 0;
    if (currentPlayer === 1 && selectedLady.ladyID < 12) {
      BOARD_CELLS[removeLady].className = 'rowCell blackCell';
      BOARD_CELLS[removeLady].id = '';
    }
    if (currentPlayer === 2 && selectedLady.ladyID >= 12) {
      BOARD_CELLS[removeLady].className = 'rowCell blackCell';
      BOARD_CELLS[removeLady].id = '';
    }
  }
  resetSelectedLadyProperties();
  removeCellonclick();
  removeEventListeners();
}

/** 
 * @description Removes onClick event from current player ladies, before switching players.
 *  and removes wrong color lady movement handler
 */
const removeEventListeners = () => {
  if (currentPlayer === 1) {
    for (let i = 0; i < RED_CHECKERS.length; i++) {
      RED_CHECKERS[i].removeEventListener("click", getPlayerLadies);
    }
  } else {
    for (let i = 0; i < GREY_CHECKERS.length; i++) {
      GREY_CHECKERS[i].removeEventListener("click", getPlayerLadies);
    }
  }
  handlePlayerChange();
}

const printBoard = () => {
  let redLadiesId = 0;
  let greyLadiesId = 12;

  stateGame.forEach((row, j) => {
    const ROW_ELEMENT = document.createElement('div');
    ROW_ELEMENT.classList.add('boardRow');
    ROW_ELEMENT.classList.add('row' + (j + 1));

    row.forEach((cell, i) => {
      const CELL_ELEMENT = document.createElement('div');

      CELL_ELEMENT.classList.add('rowCell');
      if (!(j % 2 == i % 2)) {
        CELL_ELEMENT.classList.add('blackCell');
      } else {
        CELL_ELEMENT.classList.add('whiteCell');
      }

      if (cell === 1) {
        CELL_ELEMENT.classList.add('redChecker');
        CELL_ELEMENT.id = redLadiesId;
        redLadiesId++;
      } else if (cell === 2) {
        CELL_ELEMENT.classList.add('greyChecker');
        CELL_ELEMENT.id = greyLadiesId;
        greyLadiesId++;
      }

      ROW_ELEMENT.appendChild(CELL_ELEMENT);
    });

    BOARD.appendChild(ROW_ELEMENT);
  });
}

window.onload = function () {
  printBoard();
  giveLadiesEventListeners();
  handleTurnsDisplay(CURRENT_PLAYER_TURN());
}
