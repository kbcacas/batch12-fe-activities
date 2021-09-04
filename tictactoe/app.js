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

let remainingCells = 0
let inGame = true
let currentPlayer = 'x'
let moveHistory = []
let ctr = 0
const xDisplay = document.querySelector('.player-x')
const oDisplay = document.querySelector('.player-o')


// ------- FUNCTIONS ---------
currentPlayerTurn()




// displays current player's turn
function currentPlayerTurn(){
    if(!currentPlayer){
        currentPlayer = 'o'
        xDisplay.classList.remove('turn-display')
        oDisplay.classList.add('turn-display')
    }else{
        currentPlayer = 'x'
        oDisplay.classList.remove('turn-display')
        xDisplay.classList.add('turn-display')
    }
}

//
function onCellClick(event){
    ctr++
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

function previewTurn(){
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