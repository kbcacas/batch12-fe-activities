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

let occupiedCells = 0
let inGame = true
let currentPlayer = 'x'
let moveHistory = []
const xDisplay = document.querySelector('.player-x')
const oDisplay = document.querySelector('.player-o')


// ------- FUNCTIONS ---------




// change turn
function changeTurn(){
    xDisplay.classList.add('turn-display')
    if(currentPlayer=== 'x'){
        currentPlayer = 'o'
        xDisplay.classList.remove('turn-display')
        oDisplay.classList.add('turn-display')
        console.log(currentPlayer)
    }else{
        currentPlayer = 'x'
        oDisplay.classList.remove('turn-display')
        xDisplay.classList.add('turn-display')
        console.log(currentPlayer)
    }
}


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




    console.log(occupiedCells)
    if (roundWon) {
      currentMove = moveHistory.length;
      let entry = JSON.parse(JSON.stringify(state));
      moveHistory.push(entry);
        inGame = false;
        alert(`${currentPlayer} wins`)
        previous.style.visibility = "visible"
        next.style.visibility = "visible"
        console.log(moveHistory)
        return;
    }

    console.log(occupiedCells)
    if (occupiedCells === 9) {
      let entry = JSON.parse(JSON.stringify(state));
      moveHistory.push(entry);
      currentMove = moveHistory.length - 1;
      previous.style.visibility = "visible"
      next.style.visibility = "visible"
      inGame = false;
      console.log('draw!')
      console.log(moveHistory)
      return;
    } else {
      occupiedCells = 0;
    }

    
  changeTurn();
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

// add event listeners on each cell
cells.forEach(cell => {
    cell.addEventListener('click', onCellClick)
    cell.addEventListener('mouseover', function(event){
        event.target.classList.add('turn-display')
    })
    cell.addEventListener('mouseout',function(event){
        let hovered = event.target
        event.target.classList.remove('turn-display')
    })
})