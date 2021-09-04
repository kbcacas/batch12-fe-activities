// ------ VARIABLES -------
let state = [
    ['' , '' , ''],
    ['', '' , '' ],
    ['', '' , '' ]
]

const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
const restart = document.querySelector('.restart')

let remainingCells = 0
let inGame = true
let currentPlayer = 'X'
let moveHistory = []
let ctr = 0
