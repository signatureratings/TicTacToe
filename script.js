const X_CLASS = 'x'
const O_CLASS = 'o'
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessage = document.querySelector('[data-winning-message]')
const message = document.querySelector('.winning-message')
const restart = document.querySelector('.restart')
var circleTurn

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
startGame()

restart.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(O_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  message.style.visibility = 'hidden'
}

//cellElements.forEach((cell) => {
//  cell.addEventListener('click', handleClick, { once: true })
//})

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? O_CLASS : X_CLASS
  //placeMark
  placeMark(cell, currentClass)
  //check for win or draw
  if (checkWin(currentClass)) {
    cellElements.forEach((cell) => {
      cell.removeEventListener('click', handleClick)
    })
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    switchTurn()
  }
  //switch turns
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function switchTurn() {
  circleTurn = !circleTurn
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combinations) => {
    return combinations.every((index) => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function endGame(draw) {
  if (draw) {
    winningMessage.innerText = 'Draw'
  } else {
    winningMessage.innerText = `${circleTurn ? "O 's" : "X 's"} WIN`
    message.style.visibility = 'visible'
  }
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  })
}
