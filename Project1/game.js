// We certify that this submission is the original work of members of the group and meets the Faculty's Expectations of Originality
// Osaid Hamza 1200875
// Mohammed Owda 1200089
// 20/6/2023

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { useState } from 'react';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// function to create a new square
function Square({ value, onSquareClick}) {
  let t="tile "+value+"tile";
  return (
    <button className="square" onClick={onSquareClick}  >
      <div className={t} ></div>
    </button>
  );
}

// initial valid moves
let ValidMoves=new Set([0,8,16,24,32,40,48,56,7,15,23,31,39,47,55,63]);
let PlayedSquares=Array(64).fill(null);
let players=["player1","player2"];//default value for 2 players game (player1 vs player2)
let PlayerTurn=players[0];
let ColorPlayer1="Black";
let ColorPlayer2="White";

// function to create a new board
function openNewMove(j,nextSquares){
  let nextSquare;
  console.log("j "+j);
  if(j==0){
    nextSquare=1;
}
else if(j==63){
    nextSquare=62;
}
else{
  if (j%8==0){
    nextSquare=j+1;
  }
  else if (j%8==7){
    nextSquare=j-1;
  }
  else if(PlayedSquares[j-1]!==null){
    nextSquare=j+1;
    }
    else{
        nextSquare=j-1;
    }
  }
  if (nextSquares[nextSquare]==null)
  {
    ValidMoves.add(nextSquare);
    console.log("openNewMove "+nextSquare);
  }
  ValidMoves.delete(j);
  console.log("ValidMoves ",ValidMoves);
}

// function to generate a new board
function Board({ player1Turn, squares, onPlay }) {


  async function handleClick(i) {
    console.log("clicked on square "+i);
    console.log("PlayerTurn "+PlayerTurn);  
    if(ValidMoves.has(i)){

        const nextSquares = squares.slice();

        if (PlayerTurn=="Player"){
          nextSquares[i] = ColorPlayer1;
          PlayedSquares[i] = ColorPlayer1;
          PlayerTurn= "Computer";
        }
       else if (player1Turn==true) {
            nextSquares[i] = ColorPlayer1;
            PlayedSquares[i] = ColorPlayer1;
            PlayerTurn= players[1];
          } 
          else {
          nextSquares[i] = ColorPlayer2;
          PlayedSquares[i] = ColorPlayer2;
          PlayerTurn= players[0];
          } 
          player1Turn=!player1Turn;
          openNewMove(i,nextSquares);
          onPlay(nextSquares,1);
          const move = new Audio('./Sounds/ValidMoveSound.mp3');
          // Play the audio
            move.play();    

    
    }

    else if (squares[i]==null){
        console.log("Invalid Square!!,Please try again");
        const invalidMove = new Audio('./Sounds/InvalidMoveSound.mp3');
        // Play the audio
        invalidMove.play();
        const nextSquares = squares.slice();
        nextSquares[i]="Invalid";
        onPlay(nextSquares,0);
        await sleep(300);
        nextSquares[i]=null;
        onPlay(nextSquares,0); 
    }
  }

  let st="status";
  const winner = calculateWinner(PlayedSquares,player1Turn);
  let status;
  if (winner) {
    console.log("winner "+winner);
      if (winner=="Draw" ) {
        status = 'Draw';
        const Draw = new Audio('./Sounds/GameOverSound.wav');
        // Play the audio
        Draw.play();
        console.log("Finish Game");
        st="status Draw";
      }
      /*else if (winner=="Computer"){
        status = 'Game Over';
        const lose = new Audio('./Sounds/GameOverSound.wav');
        // Play the audio
        lose.play();
        console.log("Finish Game");
        st="status Lose";
      }*/
      else{
       // startConfetti();
        status = 'Winner: ' + winner;
        const win = new Audio('./Sounds/WinningStatusSound.mp3');
        // Play the audio
        win.play();
        console.log("Finish Game");
        st="status Finish";
      }
      let DisplayBoard=[];
      for (let i = 0; i < 64; i++) {
        DisplayBoard.push(<Square key ={i} value={squares[i]} onSquareClick={() => handleClick(i)}/>);
      }

      return  (
        <>
        <div className={st}>{status}</div>;
            <div className="board">
              {DisplayBoard}
              </div>
              <div class="popup">
                <h2>The winning team is {winner}!</h2>
                <button class="generate-btn" id="PlayAgain" onClick={generateBoard} >play again</button>

              </div> 
              </>
        );
  }
   else {
    status = 'Next player: ' + (player1Turn ? players[0] : players[1]);
  }

  if (PlayerTurn=="Computer"){
    const nextSquares = squares.slice();
    console.log("Computer Turn");
    let j= bestMove(nextSquares,PlayerTurn);
    console.log("j after minmax "+j);
    nextSquares[j]=ColorPlayer2;
    PlayedSquares[j]=ColorPlayer2;
    openNewMove(j,nextSquares);
    player1Turn=!player1Turn; 
    onPlay(nextSquares,1);
    PlayerTurn="Player";
  }
let DisplayBoard=[];
for (let i = 0; i < 64; i++) {
  DisplayBoard.push(<Square key ={i} value={squares[i]} onSquareClick={() => handleClick(i)}/>);
}

return  (
  <>
  <div className={st}>{status}</div>;
      <div className="board">
        {DisplayBoard}
        </div>
        
        </>
  );

}

let App = function Game() {
  const [history, setHistory] = useState([Array(64).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const player1Turn = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares,num) {
    if(num==1){//valid move
      const nextHistory = [...history.slice(0, currentMove +1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }
    else{//invalid move so don't change the history
      const nextHistory = [...history.slice(0, currentMove), nextSquares];
      setHistory(nextHistory);
    }
  }
  return (
    
    <div className="game">
        <Board player1Turn={player1Turn} squares={currentSquares} onPlay={handlePlay}/>
    </div>



  );
}

function calculateWinner(PlayedSquares,player1Turn) {
  if (PlayedSquares.includes(null)===false){
    return "Draw";
    }

    let WinnerPlayer;
    if (player1Turn==false){
      WinnerPlayer=players[0];
    }
    else{
      WinnerPlayer=players[1];
    }

  let j=0;
  let d1=0;
  let d2=4;

  for (let v = 0; v < 32; v++) {
    
    //These are the horizontal cases
    if (PlayedSquares[j] && PlayedSquares[j] === PlayedSquares[j+1] && PlayedSquares[j] === PlayedSquares[j+2] && PlayedSquares[j] === PlayedSquares[j+3] && PlayedSquares[j] === PlayedSquares[j+4]) {
      return WinnerPlayer;
    }
    //These are the vertical cases
     if (PlayedSquares[v] && PlayedSquares[v] === PlayedSquares[v+8] && PlayedSquares[v] === PlayedSquares[v+16] && PlayedSquares[v] === PlayedSquares[v+24] && PlayedSquares[v] === PlayedSquares[v+32]) {
      return WinnerPlayer;
    }
    
    //These are the diagonal cases
       if (d1<28){
          if (PlayedSquares[d1] && PlayedSquares[d1] === PlayedSquares[d1+9] && PlayedSquares[d1] === PlayedSquares[d1+18] && PlayedSquares[d1] === PlayedSquares[d1+27] && PlayedSquares[d1] === PlayedSquares[d1+36]) {
            return WinnerPlayer;
        }
      }
      
       if (d2<32){
        if (PlayedSquares[d2] && PlayedSquares[d2] === PlayedSquares[d2+7] && PlayedSquares[d2] === PlayedSquares[d2+14] && PlayedSquares[d2] === PlayedSquares[d2+21] && PlayedSquares[d2] === PlayedSquares[d2+28]) {
          return WinnerPlayer;

      }
    }
    

    if ((++j)%4==0){
      j+=4;
    }
    if ((++d1)%4==0){
      d1+=4;
    }
    if ((++d2)%8==0){
      d2+=4;
    }
  }


  //no winner yet
  return null;
}

function generateBoard(){
ValidMoves=new Set([0,8,16,24,32,40,48,56,7,15,23,31,39,47,55,63]);
PlayedSquares=Array(64).fill(null);
PlayerTurn=players[0];
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
    <button class="generate-btn" id="Back" onClick={choosePlayVsFriendsOrComputer} >Go Back</button>
  </StrictMode>
);
}

//screen to choose black or white
function chooseBlackOrWhite(){
  console.log("chooseBlackOrWhite");
  let pairsContainer = document.getElementById("root");
  let pairElement1 = document.createElement("button");
  pairElement1.classList.add("generate-btn");
  pairElement1.id="chosenBlack";
  pairElement1.innerHTML = "I'm Black";

  let pairElement2 = document.createElement("button");
  pairElement2.classList.add("generate-btn");
  pairElement2.id="chosenWhite";
  pairElement2.innerHTML = "I'm White";

  while (pairsContainer.firstChild) {
    pairsContainer.removeChild(pairsContainer.firstChild);
  }
  pairsContainer.appendChild(pairElement1);
  pairsContainer.appendChild(pairElement2);
  function generateBoard1() {
    players=["Player","Computer"];
    ColorPlayer1="Black";
    ColorPlayer2="White";
    generateBoard();
  }
  function generateBoard2() {
    players=["Computer","Player"];
    ColorPlayer1="White";
    ColorPlayer2="Black";
    generateBoard();
  }
  let generateBtn1 = document.getElementById("chosenBlack");
  generateBtn1.addEventListener("click", generateBoard1);  
  let generateBtn2 = document.getElementById("chosenWhite");
  generateBtn2.addEventListener("click", generateBoard2);
}


function choosePlayVsFriendsOrComputer(){
  let pairsContainer = document.getElementById("root");
  let pairElement1 = document.createElement("button");
  pairElement1.classList.add("generate-btn");
  pairElement1.id="vs Friends";
  pairElement1.innerHTML = "Play With Friends";

  let pairElement2 = document.createElement("button");
  pairElement2.classList.add("generate-btn");
  pairElement2.id="vs Computer";
  pairElement2.innerHTML = "Play Vs Computer";

  while (pairsContainer.firstChild) {
    pairsContainer.removeChild(pairsContainer.firstChild);
  }
  pairsContainer.appendChild(pairElement1);
  pairsContainer.appendChild(pairElement2);
   

  function generateBoard3() {
    players=["Player1","Player2"];
    ColorPlayer1="Black";
    ColorPlayer2="White";
    generateBoard();
  }
  let generateBtn1 = document.getElementById("vs Friends");
  generateBtn1.addEventListener("click", generateBoard3);  
  let generateBtn2 = document.getElementById("vs Computer");
  generateBtn2.addEventListener("click", chooseBlackOrWhite);
}



function evaluatePotentialWins(squares, player, opponent) {
  let score = 0;
  let winningCombinations=[
  [0, 1, 2, 3, 4], [1, 2, 3, 4, 5], [2, 3, 4, 5, 6], [3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12], [9, 10, 11, 12, 13], [10, 11, 12, 13, 14], [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20], [17, 18, 19, 20, 21], [18, 19, 20, 21, 22], [19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28], [25, 26, 27, 28, 29], [26, 27, 28, 29, 30], [27, 28, 29, 30, 31],
  [32, 33, 34, 35, 36], [33, 34, 35, 36, 37], [34, 35, 36, 37, 38], [35, 36, 37, 38, 39],
  [40, 41, 42, 43, 44], [41, 42, 43, 44, 45], [42, 43, 44, 45, 46], [43, 44, 45, 46, 47],
  [48, 49, 50, 51, 52], [49, 50, 51, 52, 53], [50, 51, 52, 53, 54], [51, 52, 53, 54, 55],
  [56, 57, 58, 59, 60], [57, 58, 59, 60, 61], [58, 59, 60, 61, 62], [59, 60, 61, 62, 63],

  // Vertical cases
  [0, 8, 16, 24, 32], [8, 16, 24, 32, 40], [16, 24, 32, 40, 48], [24, 32, 40, 48, 56],
  [1, 9, 17, 25, 33], [9, 17, 25, 33, 41], [17, 25, 33, 41, 49], [25, 33, 41, 49, 57],
  [2, 10, 18, 26, 34], [10, 18, 26, 34, 42], [18, 26, 34, 42, 50], [26, 34, 42, 50, 58],
  [3, 11, 19, 27, 35], [11, 19, 27, 35, 43], [19, 27, 35, 43, 51], [27, 35, 43, 51, 59],
  [4, 12, 20, 28, 36], [12, 20, 28, 36, 44], [20, 28, 36, 44, 52], [28, 36, 44, 52, 60],
  [5, 13, 21, 29, 37], [13, 21, 29, 37, 45], [21, 29, 37, 45, 53], [29, 37, 45, 53, 61],
  [6, 14, 22, 30, 38], [14, 22, 30, 38, 46], [22, 30, 38, 46, 54], [30, 38, 46, 54, 62],
  [7, 15, 23, 31, 39], [15, 23, 31, 39, 47], [23, 31, 39, 47, 55], [31, 39, 47, 55, 63],

  // Diagonal cases
  [0, 9, 18, 27, 36], [1, 10, 19, 28, 37], [2, 11, 20, 29, 38], [3, 12, 21, 30, 39],
  [8, 17, 26, 35, 44], [9, 18, 27, 36, 45], [10, 19, 28, 37, 46], [11, 20, 29, 38, 47],
  [16, 25, 34, 43, 52], [17, 26, 35, 44, 53], [18, 27, 36, 45, 54], [19, 28, 37, 46, 55],
  [24, 33, 42, 51, 60], [25, 34, 43, 52, 61], [26, 35, 44, 53, 62], [27, 36, 45, 54, 63],
  [4, 11, 18, 25, 32], [5, 12, 19, 26, 33], [6, 13, 20, 27, 34], [7, 14, 21, 28, 35],
  [12, 19, 26, 33, 40], [13, 20, 27, 34, 41], [14, 21, 28, 35, 42], [15, 22, 29, 36, 43],
  [20, 27, 34, 41, 48], [21, 28, 35, 42, 49], [22, 29, 36, 43, 50], [23, 30, 37, 44, 51],
  [28, 35, 42, 49, 56], [29, 36, 43, 50, 57], [30, 37, 44, 51, 58], [31, 38, 45, 52, 59]
];

  // loop through all the winning combinations
  for (const combination of winningCombinations) {
    const squaresSubset = combination.map((index) => squares[index]);

    // find the player count, opponent count and empty count
    const playerCount = squaresSubset.filter((square) => square === player).length;
    const opponentCount = squaresSubset.filter((square) => square === opponent).length;
    const emptyCount = squaresSubset.filter((square) => square === null).length;

    if (playerCount === 5) {
      // AI player wins
      score += 1000;
    } else if (opponentCount === 5) {
      // Opponent wins
      score -= 900;
    } else

    if (playerCount === 4 && emptyCount === 1) {
      // Potential win for AI player
      score += 50;
    } else if (opponentCount === 4 && emptyCount === 1) {
      // Potential win for opponent
      score -= 60;
    } else if (playerCount === 3 && emptyCount === 2) {
      // Potential two-in-a-row for AI player
      score += 10;
    } else if (opponentCount === 3 && emptyCount === 2) {
      // Potential two-in-a-row for opponent
      score -= 20;
    } else if (playerCount === 2 && emptyCount === 3) {
      // Potential one-in-a-row for AI player
      score += 8;
    } else if (opponentCount === 2 && emptyCount === 3) {
      // Potential one-in-a-row for opponent
      score -= 5;
    } else if (playerCount === 1 && emptyCount === 4) {
      // Potential one-in-a-row for AI player
      score += 1;
    } 


  }

  console.log("evaluate score "+score);
  return score;
}

// Function to find the best move for AI player
function bestMove(squares, currentPlayer) {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  const validMovesArray = Array.from(ValidMoves);
  
  // Loop through all empty valid moves and find the best move
  for (let i = 0; i < ValidMoves.size; i++) {
    const m = validMovesArray[i];
    squares[m] = ColorPlayer2;
    let score = minimax(squares, 0, false, ColorPlayer2, ColorPlayer1);
    
    squares[m] = null;
    if (score > bestScore) {
      bestScore = score;
      move = m;
    }
  }
  return move;
}

// function to calculate the minimax score for each valid move recursively and return the best score
function minimax(squares, depth, isMaximizing, player, opponent) {
  const winner = calculateWinner(squares, PlayerTurn);
  if (winner) {
    if (winner == "Draw") {
      return 0;
    } else if (winner == "Computer") {
      return 1000;
    } else {
      return -1000;
    }
  }

  // if depth is 0, return the score
 if (depth == 0) {
    return evaluatePotentialWins(squares, player, opponent);
  }

  const validMovesArray = Array.from(ValidMoves);

  // if it is AI player's turn
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < ValidMoves.size; i++) {
      const move = validMovesArray[i];
      squares[move] = ColorPlayer2;
      let score = minimax(squares, depth - 1, false);
      console.log("score "+score);
      console.log("bestScore "+bestScore); 
      squares[move] = null;
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
    // if it is opponent's turn
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < validMovesArray.length; i++) {
      const move = validMovesArray[i];
      squares[move] = ColorPlayer1;
      let score = minimax(squares, depth -1, true);
      squares[move] = null;
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}



//start the program
let Btn1 = document.getElementById("vs Friends");
Btn1.addEventListener("click", generateBoard);  
let Btn2 = document.getElementById("vs Computer");
Btn2.addEventListener("click", chooseBlackOrWhite);
let generateBtn3 = document.getElementById("Back");
generateBtn3.addEventListener("click", choosePlayVsFriendsOrComputer);