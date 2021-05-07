const X_CLASS = 'x'
const O_CLASS = 'o'
window.localStorage.setItem('muted', false)
window.localStorage.setItem('scorex', 0)
window.localStorage.setItem('scoreo', 0)
window.localStorage.setItem('scoretie', 0)
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessage = document.querySelector('[data-winning-message]')
const message = document.querySelector('.winning-message')
const restart = document.querySelector('.restart')
const volume = document.querySelector('.volume')
const scorex = document.querySelector('.score-x')
const scoreo = document.querySelector('.score-o')
const scoretie = document.querySelector('.score-tie')

var circleTurn
var audio = new Audio('clicksoundeffect.mp3')

function setVolume(e) {
  if (e.target.innerText == 'volume_off') {
    e.target.innerText = 'volume_up'
    window.localStorage.setItem('muted', false)
  } else if (e.target.innerText == 'volume_up') {
    e.target.innerText = 'volume_off'
    window.localStorage.setItem('muted', true)
  }
}
volume.addEventListener('click', setVolume)

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
  message.classList.add('hide')
}

//cellElements.forEach((cell) => {
//  cell.addEventListener('click', handleClick, { once: true })
//})

function handleClick(e) {
  let Volume = localStorage.getItem('muted')
  if (Volume === 'false') {
    audio.play()
  }
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
    let scoreTie = localStorage.getItem('scoretie')
    scoreTie = parseInt(scoreTie)
    scoreTie += 1
    scoretie.innerText = scoreTie
    console.log(scoreTie)
    localStorage.setItem('scoretie', scoreTie)
    winningMessage.innerText = 'Draw'
    message.classList.remove('hide')
  } else {
    winningMessage.innerText = `${circleTurn ? "O 's" : "X 's"} WIN`
    message.classList.remove('hide')
    if (circleTurn) {
      let scoreO = localStorage.getItem('scoreo')
      scoreO = parseInt(scoreO)
      scoreO += 1
      scoreo.innerText = scoreO
      console.log(scoreO)
      localStorage.setItem('scoreo', scoreO)
    } else {
      let scoreX = localStorage.getItem('scorex')
      scoreX = parseInt(scoreX)
      scoreX += 1
      scorex.innerText = scoreX
      console.log(scoreX)
      localStorage.setItem('scorex', scoreX)
    }
  }
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  })
}
