/*-------------------------------- Constants --------------------------------*/
const Player_X = 'X';
const Player_O = 'O';
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6 ,7, 8],
    [0 ,3 ,6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr")

const messageEl = document.querySelector("#message")

const resetBtnEl = document.querySelector('#reset');

console.log(squareEls)
console.log(messageEl)

/*-------------------------------- Functions --------------------------------*/

function init(){
    console.log('Initializing the game: ')
    
    board = ['', '', '', '', '', '', '', '', '']
    turn = Player_O;
    winner = false;
    tie = false; 

    render();

}
function render(){
    updateboard()
    updateMessage()
}
function updateboard(){
    board.forEach((sqr, index) => {
        squareEls[index].textContent = sqr
    })
    
}

function updateMessage(){
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn!`
    } else if (!winner && tie){
        messageEl.textContent = "It's a tie!"
    } else {
        messageEl.textContent = `Congratulations, ${turn} wins!`
        
    }

}

function handleClick(){
    const sqrIndex = this.getAttribute("id")

    if (board[sqrIndex] !== '' || winner) return;


    placePiece(sqrIndex);
    CheckForWinner()
    CheckForTie()
    switchPlayerTurn()
    render()
}
function placePiece(index){
    board[index] = turn;
}
function CheckForWinner() {
  winningCombos.forEach((combo) => {
    if (
      board[combo[0]] !== '' &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = true;
    }
  });
}

function CheckForTie() {
    if(winner) return; 

    tie  = board.every((sqr) => sqr !== '')
}

function switchPlayerTurn(){
    if (winner) return;

    turn = turn === Player_X ? Player_O : Player_X
}


/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
    square.addEventListener("click", handleClick)
})

resetBtnEl.addEventListener("click", init);

init();