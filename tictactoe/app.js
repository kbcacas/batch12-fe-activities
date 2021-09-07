// ------ VARIABLES -------
let state = [
    ['' , '' , ''],
    ['', '' , '' ],
    ['', '' , '' ]
]

const cells = document.querySelectorAll('.cell')
const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
const restart = document.querySelector('.restart')
const result = document.querySelector('.result')
const resultText = document.querySelector('.result-text')
const xWin = document.querySelector('.x-win')
const oWin = document.querySelector('.o-win')
const draws = document.querySelector('.draw')

let xWinCounter = 0
let oWinCounter = 0
let draw = 0
let occupiedCells = 0
let inGame = true
let currentPlayer = 'x'
let moveHistory = []
const turnDiv = document.querySelector('.turn')
const xDisplay = document.querySelector('.player-x')
xDisplay.classList.add('turn-display')
const oDisplay = document.querySelector('.player-o')


// ------- FUNCTIONS ---------

// places the X/O move in the array; displays the move
function processPlayedCell(clickedCell,getIndex){
    state[getIndex[0]][getIndex[1]] = currentPlayer
    clickedCell.innerHTML = currentPlayer
}

// validate the result of the turn
function validateResult(){
    let roundWon = false;
    for (let row=0; row<state.length; row++) {
      let a = state[row][0];
      let b = state[row][1];
      let c = state[row][2];
      if (a != "" && a===b && b===c) {
        
        roundWon = true;
          break
      }
  }

  for (let column=0; column<state.length; column++) {
    let a = state[0][column];
    let b = state[1][column];
    let c = state[2][column];
    if (a != "" && a===b && b===c) {
      roundWon = true;
        break
    }
  }

  for (let row=0; row<state.length; row++) {
  for (let column=0; column<state.length; column++) {
      if(state[row][column] !== "") {
          occupiedCells += 1
      }
    }
  }

  let a = state[0][0];
  let b = state[1][1];
  let c = state[2][2];
  if(a != "" && a===b && b===c) {
    roundWon = true;
  } else {
    let a = state[0][2];
    let b = state[1][1];
    let c = state[2][0];
    if(a != "" && a===b && b===c) {
              roundWon = true
            }
          }

    if (roundWon) {
      currentMove = moveHistory.length;
      let entry = JSON.parse(JSON.stringify(state));
      moveHistory.push(entry);
      inGame = false;
      resultText.innerHTML = `${currentPlayer} wins!`
      result.classList.add('show')
      turnDiv.classList.add('hide')
      previous.style.visibility = "visible"
      next.style.visibility = "visible"
      updateScoreboard()
      return;
    }

    if (occupiedCells === 9) {
      let entry = JSON.parse(JSON.stringify(state));
      moveHistory.push(entry);
      currentMove = moveHistory.length - 1;
      inGame = false;
      resultText.innerHTML = `It is a draw.`
      result.classList.add('show')
      previous.style.visibility = "visible"
      next.style.visibility = "visible"
      turnDiv.classList.add('hide')
      return;
    } else {
      occupiedCells = 0;
    }
  changeTurn();
}

// change turn
function changeTurn(){
  if(currentPlayer=== 'x'){
      xDisplay.classList.remove('turn-display')
      oDisplay.classList.add('turn-display')
      currentPlayer = 'o'
  }else{
      oDisplay.classList.remove('turn-display')
      xDisplay.classList.add('turn-display')
      currentPlayer = 'x'
  }
}

// on cell click
function onCellClick(event){
    let entry = JSON.parse(JSON.stringify(state))
    moveHistory.push(entry)
    const clickedCell = event.target
    clickedCellIndex = clickedCell.getAttribute('data-cell')
    const getIndex = clickedCellIndex.split('-')
    if(state[getIndex[0]][getIndex[1]] !== '' || !inGame){
        return
    }
    processPlayedCell(clickedCell,getIndex)
    validateResult()
}

// function for restart button
function onRestart(event){
  inGame = true
  state = state = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]
  moveHistory = []
  previous.style.visibility = "hidden"
  next.style.visibility = "hidden"
  turnDiv.classList.remove('hide')
  changeTurn()
  cells.forEach(cell => {
    cell.innerHTML = ""
    cell.style.cursor = 'pointer'
  })
}

//function for previous button
function previousButton(e){
  e.preventDefault()
  currentMove--;
  if (currentMove <= 0) {
    currentMove = 0;
  }
  checkHistory(moveHistory[currentMove]);
}

//function for next button
function nextButton(e) {
  e.preventDefault()
  currentMove++;
  if (currentMove >= moveHistory.length - 1) {
    currentMove = moveHistory.length - 1;
  }
  checkHistory(moveHistory[currentMove]);
}

// function for checking history
function checkHistory(arr) {
  for (let i=0; i<3; i++) {
      for (let j=0; j<3; j++) {
          if (i === 0) {
              if (arr[i][j] === "x") {
                  cells[i+j].innerHTML = "x"; 
              }
              else if (arr[i][j] === "o") {
                  cells[i+j].innerHTML = "o";
              }
              else {
                  cells[i+j].innerHTML = "";   
              }
          }

          else if (i === 1) {
              if (arr[i][j] === "x") {
                  cells[i+j+2].innerHTML = "x"; 
              }
              else if (arr[i][j] === "o") {
                  cells[i+j+2].innerHTML = "o";
              }
              else {
                  cells[i+j+2].innerHTML = "";   
              }
          }

          else {
              if (arr[i][j] === "x") {
                  cells[i+j+4].innerHTML = "x"; 
              }
              else if (arr[i][j] === "o") {
                  cells[i+j+4].innerHTML = "o";
              }
              else {
                  cells[i+j+4].innerHTML = "";   
              }
          }
      }
  }
}

function updateScoreboard(){
  if(currentPlayer === 'x'){
    xWinCounter++
    xWin.textContent = `X-WINS: ${xWinCounter}`
  }else{
    oWinCounter++
    oWin.textContent = `O-WINS: ${oWinCounter}`
  }
}



// ------ ADDING EVENT LISTENERS ------

// on each cell
cells.forEach(cell => {
    cell.addEventListener('click', onCellClick)
    cell.addEventListener('mouseover',function(){
      if(cell.innerHTML!== ''){
        cell.style.cursor='not-allowed'
      }
    })
})
// on restart button
restart.addEventListener('click', onRestart)
// to stop displaying result
result.addEventListener('transitionend',function(){
  setTimeout(function(){
    result.classList.remove('show')
    resultText.innerHTML = ""
  },2500)
})
