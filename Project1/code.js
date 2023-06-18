
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { useState } from 'react';
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Square({ value, onSquareClick}) {
  let t="tile "+value+"tile";
  return (
    <button className="square" onClick={onSquareClick}>
      <div className={t}></div>
    </button>
  );
}


function minmax2(squares,depth,Turn){
  let winner = calculateWinner(squares);
  if (winner) {
    if (winner=="Draw") {
      return 0;
    }
    else if (winner) {
      if (winner=="Black") {
        return 10-depth;
      }
      else{
        return depth-10;
      }
    }
  }
  else{
    if (Turn) {
      let best=-100;
      for (let i = 0; i < 64; i++) {
        if (squares[i]==null) {
          squares[i]="Black";
          best=Math.max(best,minmax(squares,depth+1,!Turn));
          squares[i]=null;
        }
      }
      return best;
    }
    else{
      let best=100;
      for (let i = 0; i < 64; i++) {
        if (squares[i]==null) {
          squares[i]="White";
          best=Math.min(best,minmax(squares,depth+1,!Turn));
          squares[i]=null;
        }
      }
      return best;
    }
  }
}

const List=new Set([0,8,16,24,32,40,48,56,7,15,23,31,39,47,55,63]);
const PlayedSquares=Array(64).fill(null);
let AiTurn=0;
let players=[];
players=["Black","White"];//default value for 2 players game (black vs white)
function Board({ player1Turn, squares, onPlay }) {

  
  async function handleClick(i) {
    
    if(List.has(i)){
        if (calculateWinner(PlayedSquares)=="Draw") {
        return;
        }
        else if (calculateWinner(PlayedSquares) || PlayedSquares[i]) {
        return;
        }
        const nextSquares = squares.slice();
        let n=0;
        if (player1Turn) {
          nextSquares[i] = 'Black';
          PlayedSquares[i] = 'Black';
          } else {
          nextSquares[i] = 'White';
          PlayedSquares[i] = 'White';
          } 
          onPlay(nextSquares,1);
          if(i==0){
              List.add(1);
              n=1;
          }
          else if(i==63){
              List.add(62);
              n=63;
          }
          else{
              if(List.has(i-1)){
                  List.add(i+1);
                  n=i+1;
              }
              else{
                  List.add(i-1);
                  n=i-1;
              }
          
    
            }
            const move = new Audio('move.mp3');
            // Play the audio
            move.play();    
        if (nextSquares[n]==null){
        nextSquares[n]="Valid";
        await sleep(300);
        nextSquares[n]=null;
        onPlay(nextSquares,1); 
        }

    }
    else{
        console.log("Invalid Square!!,Please try again");
        const wrongSound = new Audio('wrong.mp3');
        // Play the audio
        wrongSound.play();
        const nextSquares = squares.slice();
        nextSquares[i]="Invalid";
        onPlay(nextSquares,0);
        await sleep(300);
        nextSquares[i]=null;
        onPlay(nextSquares,0); 

    }

  }

  let st="status";
  const winner = calculateWinner(PlayedSquares);
  let status;
  if (winner) {
      if (winner=="Draw") {
      
        status = 'Draw';
        const Draw = new Audio('gameoverSound.wav');
        // Play the audio
        Draw.play();
        console.log("Finish Game");
        st="status Draw";
      }

      else{
        status = 'Winner: ' + winner;
        const win = new Audio('win.mp3');
        // Play the audio
        win.play();
        console.log("Finish Game");
        st="status Finish";

      }
  }
   else {
    status = 'Next player: ' + (player1Turn ? players[0]: players[1]);

  }


 
let DisplayBoard=[];
for (let i = 0; i < 64; i++) {
  DisplayBoard.push(<Square value={squares[i]} onSquareClick={() => handleClick(i)} />);
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
    else{//invalid move
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

function calculateWinner(PlayedSquares) {
  if (PlayedSquares.includes(null)===false){
    return "Draw";
    }

  let j=0;
  let d1=0;
  let d2=4;

  console.log(AiTurn);
  for (let v = 0; v < 32; v++) {
    
    //These are the horizontal cases
    if (PlayedSquares[j] && PlayedSquares[j] === PlayedSquares[j+1] && PlayedSquares[j] === PlayedSquares[j+2] && PlayedSquares[j] === PlayedSquares[j+3] && PlayedSquares[j] === PlayedSquares[j+4]) {
      if  (AiTurn){
        return "computer";
      }
      else{ 
            return PlayedSquares[j]+" player";
      }
    }
    //These are the vertical cases
     if (PlayedSquares[v] && PlayedSquares[v] === PlayedSquares[v+8] && PlayedSquares[v] === PlayedSquares[v+16] && PlayedSquares[v] === PlayedSquares[v+24] && PlayedSquares[v] === PlayedSquares[v+32]) {
      if  (AiTurn){
        return "computer";
      }
      else{ 
              return PlayedSquares[v]+" player";
      }
    }
    
    //These are the diagonal cases
       if (d1<28){
          if (PlayedSquares[d1] && PlayedSquares[d1] === PlayedSquares[d1+9] && PlayedSquares[d1] === PlayedSquares[d1+18] && PlayedSquares[d1] === PlayedSquares[d1+27] && PlayedSquares[d1] === PlayedSquares[d1+36]) {
            if  (AiTurn){
              return "computer";
            }
            else{ 
            return PlayedSquares[d1]+" player";
            }
          }
        }
      
       if (d2<32){
        if (PlayedSquares[d2] && PlayedSquares[d2] === PlayedSquares[d2+7] && PlayedSquares[d2] === PlayedSquares[d2+14] && PlayedSquares[d2] === PlayedSquares[d2+21] && PlayedSquares[d2] === PlayedSquares[d2+28]) {
          if  (AiTurn){
            return "computer";
          }
          else{ 
                return PlayedSquares[d2]+" player";
          }
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
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
}

//screen to choose black or white
function chooseBlackOrWhite(){
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
    players=["Black","Computer"];
    generateBoard();
  }
  function generateBoard2() {
    players=["Computer","White"];
    generateBoard();
  }
  let generateBtn1 = document.getElementById("chosenBlack");
  generateBtn1.addEventListener("click", generateBoard1);  
  let generateBtn2 = document.getElementById("chosenWhite");
  generateBtn2.addEventListener("click", generateBoard2);
}


//screen of one or two players
function OneOrTwoPlayers(){
  let pairsContainer = document.getElementById("root");
  let pairElement1 = document.createElement("button");
  pairElement1.classList.add("generate-btn");
  pairElement1.id="vs Friends";
  pairElement1.innerHTML = "play vs Friends";

  let pairElement2 = document.createElement("button");
  pairElement2.classList.add("generate-btn");
  pairElement2.id="vs Computer";
  pairElement2.innerHTML = "play vs Computer";
  while (pairsContainer.firstChild) {
    pairsContainer.removeChild(pairsContainer.firstChild);
  }
    pairsContainer.appendChild(pairElement1);
  pairsContainer.appendChild(pairElement2);


  let generateBtn1 = document.getElementById("vs Friends");
  generateBtn1.addEventListener("click", generateBoard);
  let generateBtn2 = document.getElementById("vs Computer");
  generateBtn2.addEventListener("click", chooseBlackOrWhite);
}

// function to minimax algorithm to find the best move
function minimax(newBoard, player){
  //available spots
  var availSpots = emptySquares(newBoard);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (checkWin(newBoard, player)){
      return {score:-10};
  }
  else if (checkWin(newBoard, aiPlayer)){
      return {score:10};
  }
  else if (availSpots.length === 0){
      return {score:0};
  }

  // an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      var move = {};
      move.index = newBoard[availSpots[i]];

      // set the empty spot to the current player
      newBoard[availSpots[i]] = player;

      //if collect the score resulted from calling minimax on the opponent of the current player
      if (player == aiPlayer){
          var result = minimax(newBoard, huPlayer);
          move.score = result.score;
      }
      else{
          var result = minimax(newBoard, aiPlayer);
          move.score = result.score;
      }

      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;

      // push the object to the array
      moves.push(move);
  }

  // if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aiPlayer){
      var bestScore = -10000;
      for(var i = 0; i < moves.length; i++){
          if(moves[i].score > bestScore){
              bestScore = moves[i].score;
              bestMove = i;
          }
      }
  }else{

  // else loop over the moves and choose the move with the lowest score
      var bestScore = 10000;
      for(var i = 0; i < moves.length; i++){
          if(moves[i].score < bestScore){
              bestScore = moves[i].score;
              bestMove = i;
          }
      }
  }

  // return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}

// function for alpha beta pruning algorithm to find the best move
function alphabeta(newBoard, player, alpha, beta){
  //available spots
  var availSpots = emptySquares(newBoard);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (checkWin(newBoard, player)){
      return {score:-10};
  }
  else if (checkWin(newBoard, aiPlayer)){
      return {score:10};
  }
  else if (availSpots.length === 0){
      return {score:0};
  }

  // an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
      //create an object for each and store the index of that spot that was stored as a number in the object's index key
      var move = {};
      move.index = newBoard[availSpots[i]];
      
      // set the empty spot to the current player
      newBoard[availSpots[i]] = player;

      //if collect the score resulted from calling alphabeta on the opponent of the current player
      if (player == aiPlayer){

          var result = alphabeta(newBoard, huPlayer, alpha, beta);
          move.score = result.score;
          if(move.score > alpha){
            alpha = move.score;
          }
      }
      else{
          var result = alphabeta(newBoard, aiPlayer, alpha, beta);
          move.score = result.score;
          if(move.score < beta){
            beta = move.score;
          }
      }
      
      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;

      // push the object to the array
      moves.push(move);

      if(alpha >= beta){
        break;
      }
  }

  // if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aiPlayer){
      var bestScore = -10000;
      for(var i = 0; i < moves.length; i++){
          if(moves[i].score > bestScore){
              bestScore = moves[i].score;
              bestMove = i;
          }
      }
  }else{
    
  // else loop over the moves and choose the move with the lowest score
      var bestScore = 10000;
      for(var i = 0; i < moves.length; i++){
          if(moves[i].score < bestScore){
              bestScore = moves[i].score;
              bestMove = i;
          }
      }
  }

  // return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}








//start the program
let generateBtn = document.getElementById("PlayGame");
generateBtn.addEventListener("click", OneOrTwoPlayers);z