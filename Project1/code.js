
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { useState } from 'react';
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Square({ value, onSquareClick,c}) {
  let t="tile "+value+"tile";
  return (
    <button className="square" onClick={onSquareClick}>
      <div className={t}></div>
    </button>
  );
}

const List=new Set([0,8,16,24,32,40,48,56,7,15,23,31,39,47,55,63]);
const PlayedSquares=Array(64).fill(null);

function Board({ blackIsNext, squares, onPlay,invalidSquares }) {

  async function handleClick(i) {
    
    if(List.has(i)){
        if (calculateWinner(PlayedSquares) || PlayedSquares[i]) {
        return;
        }
        const nextSquares = squares.slice();
        let n=0;
        if (blackIsNext) {
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
    status = 'Winner: ' + winner;
    const win = new Audio('win.mp3');
    // Play the audio
    win.play();
    console.log("Finish Game");
    st="status Finish";

  } else {

    status = 'Next player: ' + (blackIsNext ? 'Black' : 'White');
  }

  return (
    <>
    <div className={st}>{status}</div>;

        <div className="board">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} c={invalidSquares[0]}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} c={invalidSquares[1]}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} c={invalidSquares[2]}/>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} c={invalidSquares[3]}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} c={invalidSquares[4]}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} c={invalidSquares[5]}/>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} c={invalidSquares[6]}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} c={invalidSquares[7]}/>

        <Square value={squares[8]} onSquareClick={() => handleClick(8)} c={invalidSquares[8]}/>
        <Square value={squares[9]} onSquareClick={() => handleClick(9)} c={invalidSquares[9]}/>
        <Square value={squares[10]} onSquareClick={() => handleClick(10)} c={invalidSquares[10]}/>
        <Square value={squares[11]} onSquareClick={() => handleClick(11)} c={invalidSquares[11]}/>
        <Square value={squares[12]} onSquareClick={() => handleClick(12)} c={invalidSquares[12]}/>
        <Square value={squares[13]} onSquareClick={() => handleClick(13)} c={invalidSquares[13]}/>
        <Square value={squares[14]} onSquareClick={() => handleClick(14)} c={invalidSquares[14]}/>
        <Square value={squares[15]} onSquareClick={() => handleClick(15)} c={invalidSquares[15]}/>

        <Square value={squares[16]} onSquareClick={() => handleClick(16)} c={invalidSquares[16]}/>
        <Square value={squares[17]} onSquareClick={() => handleClick(17)} c={invalidSquares[17]}/>
        <Square value={squares[18]} onSquareClick={() => handleClick(18)} c={invalidSquares[18]}/>
        <Square value={squares[19]} onSquareClick={() => handleClick(19)} c={invalidSquares[19]}/>
        <Square value={squares[20]} onSquareClick={() => handleClick(20)} c={invalidSquares[20]}/>
        <Square value={squares[21]} onSquareClick={() => handleClick(21)} c={invalidSquares[21]}/>
        <Square value={squares[22]} onSquareClick={() => handleClick(22)} c={invalidSquares[22]}/>
        <Square value={squares[23]} onSquareClick={() => handleClick(23)} c={invalidSquares[23]}/>

        <Square value={squares[24]} onSquareClick={() => handleClick(24)} c={invalidSquares[24]}/>
        <Square value={squares[25]} onSquareClick={() => handleClick(25)} c={invalidSquares[25]}/>
        <Square value={squares[26]} onSquareClick={() => handleClick(26)} c={invalidSquares[26]}/>
        <Square value={squares[27]} onSquareClick={() => handleClick(27)} c={invalidSquares[27]}/>
        <Square value={squares[28]} onSquareClick={() => handleClick(28)} c={invalidSquares[28]}/>
        <Square value={squares[29]} onSquareClick={() => handleClick(29)} c={invalidSquares[29]}/>
        <Square value={squares[30]} onSquareClick={() => handleClick(30)} c={invalidSquares[30]}/>
        <Square value={squares[31]} onSquareClick={() => handleClick(31)} c={invalidSquares[31]}/>

        <Square value={squares[32]} onSquareClick={() => handleClick(32)} c={invalidSquares[32]}/>
        <Square value={squares[33]} onSquareClick={() => handleClick(33)} c={invalidSquares[33]}/>
        <Square value={squares[34]} onSquareClick={() => handleClick(34)} c={invalidSquares[34]}/>
        <Square value={squares[35]} onSquareClick={() => handleClick(35)} c={invalidSquares[35]}/>
        <Square value={squares[36]} onSquareClick={() => handleClick(36)} c={invalidSquares[36]}/>
        <Square value={squares[37]} onSquareClick={() => handleClick(37)} c={invalidSquares[37]}/>
        <Square value={squares[38]} onSquareClick={() => handleClick(38)} c={invalidSquares[38]}/>
        <Square value={squares[39]} onSquareClick={() => handleClick(39)} c={invalidSquares[39]}/>
        <Square value={squares[40]} onSquareClick={() => handleClick(40)} c={invalidSquares[40]}/>
        <Square value={squares[41]} onSquareClick={() => handleClick(41)} c={invalidSquares[41]}/>
        <Square value={squares[42]} onSquareClick={() => handleClick(42)} c={invalidSquares[42]}/>
        <Square value={squares[43]} onSquareClick={() => handleClick(43)} c={invalidSquares[43]}/>
        <Square value={squares[44]} onSquareClick={() => handleClick(44)} c={invalidSquares[44]}/>
        <Square value={squares[45]} onSquareClick={() => handleClick(45)} c={invalidSquares[45]}/>
        <Square value={squares[46]} onSquareClick={() => handleClick(46)} c={invalidSquares[46]}/>
        <Square value={squares[47]} onSquareClick={() => handleClick(47)} c={invalidSquares[47]}/>
        <Square value={squares[48]} onSquareClick={() => handleClick(48)} c={invalidSquares[48]}/>
        <Square value={squares[49]} onSquareClick={() => handleClick(49)} c={invalidSquares[49]}/>
        <Square value={squares[50]} onSquareClick={() => handleClick(50)} c={invalidSquares[50]}/>
        <Square value={squares[51]} onSquareClick={() => handleClick(51)} c={invalidSquares[51]}/>
        <Square value={squares[52]} onSquareClick={() => handleClick(52)} c={invalidSquares[52]}/>
        <Square value={squares[53]} onSquareClick={() => handleClick(53)} c={invalidSquares[53]}/>
        <Square value={squares[54]} onSquareClick={() => handleClick(54)} c={invalidSquares[54]}/>
        <Square value={squares[55]} onSquareClick={() => handleClick(55)} c={invalidSquares[55]}/>
  
        <Square value={squares[56]} onSquareClick={() => handleClick(56)} c={invalidSquares[56]}/>
        <Square value={squares[57]} onSquareClick={() => handleClick(57)} c={invalidSquares[57]}/>
        <Square value={squares[58]} onSquareClick={() => handleClick(58)} c={invalidSquares[58]}/>
        <Square value={squares[59]} onSquareClick={() => handleClick(59)} c={invalidSquares[59]}/>
        <Square value={squares[60]} onSquareClick={() => handleClick(60)} c={invalidSquares[60]}/>
        <Square value={squares[61]} onSquareClick={() => handleClick(61)} c={invalidSquares[61]}/>
        <Square value={squares[62]} onSquareClick={() => handleClick(62)} c={invalidSquares[62]}/>
        <Square value={squares[63]} onSquareClick={() => handleClick(63)} c={invalidSquares[63]}/>
        </div>

    </>
    
  );
}

let App = function Game() {
  const [history, setHistory] = useState([Array(64).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const blackIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const invSquares = new Array(64).fill("square"); 
  function handlePlay(nextSquares,num) {
    if(num==1){
      const nextHistory = [...history.slice(0, currentMove +1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }
    else{
      const nextHistory = [...history.slice(0, currentMove), nextSquares];
      setHistory(nextHistory);
      //setCurrentMove(currentMove);
    }
    
  }

  return (
    <div className="game">
        <Board blackIsNext={blackIsNext} squares={currentSquares} onPlay={handlePlay} invalidSquares={invSquares}/>
    </div>
  );
}

function calculateWinner(PlayedSquares) {
  const lines = [
    //vertical
    [0, 1, 2, 3, 4],[1,2,3,4,5],[2,3,4,5,6],[3,4,5,6,7],
    [8,9,10,11,12],[9,10,11,12,13],[10,11,12,13,14],[11,12,13,14,15],
    [16,17,18,19,20],[17,18,19,20,21],[18,19,20,21,22],[19,20,21,22,23],
    [24,25,26,27,28],[25,26,27,28,29],[26,27,28,29,30],[27,28,29,30,31],
    [32,33,34,35,36],[33,34,35,36,37],[34,35,36,37,38],[35,36,37,38,39],
    [40,41,42,43,44],[41,42,43,44,45],[42,43,44,45,46],[43,44,45,46,47],
    [48,49,50,51,52],[49,50,51,52,53],[50,51,52,53,54],[51,52,53,54,55],
    [56,57,58,59,60],[57,58,59,60,61],[58,59,60,61,62],[59,60,61,62,63],

    //
    [0,8,16,24,32],[8,16,24,32,40],[16,24,32,40,48],[24,32,40,48,56],
    [1,9,17,25,33],[9,17,25,33,41],[17,25,33,41,49],[25,33,41,49,57],
    [2,10,18,26,34],[10,18,26,34,42],[18,26,34,42,50],[26,34,42,50,58],
    [3,11,19,27,35],[11,19,27,35,43],[19,27,35,43,51],[27,35,43,51,59],
    [4,12,20,28,36],[12,20,28,36,44],[20,28,36,44,52],[28,36,44,52,60],
    [5,13,21,29,37],[13,21,29,37,45],[21,29,37,45,53],[29,37,45,53,61],
    [6,14,22,30,38],[14,22,30,38,46],[22,30,38,46,54],[30,38,46,54,62],
    [7,15,23,31,39],[15,23,31,39,47],[23,31,39,47,55],[31,39,47,55,63],
    
    [24,33,42,51,60],[16,25,34,43,52],[25,34,43,52,61],[8,17,26,35,44],
    [17,26,35,44,53],[26,35,44,53,62],[0,9,18,27,36],[9,18,27,36,45],
    [18,27,36,45,54],[27,36,45,54,63],[1,10,19,28,37],[10,19,28,37,46],
    [19,28,37,46,55],[2,11,20,29,38],[11,20,29,38,47],[3,12,21,30,39],

    [4,11,18,25,32],[5,12,19,26,33],[12,19,26,33,40],[6,13,20,27,34],
    [13,20,27,34,41],[20,27,34,41,48],[7,14,21,28,35],[14,21,28,35,42],
    [21,28,35,42,49],[28,35,42,49,56],[15,22,29,36,43],[22,29,36,43,50],
    [29,36,43,50,57],[23,30,37,44,51],[30,37,44,51,58],[31,38,45,52,59],
  
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c,d,e] = lines[i];
    if (PlayedSquares[a] && PlayedSquares[a] === PlayedSquares[b] && PlayedSquares[a] === PlayedSquares[c] && PlayedSquares[a] === PlayedSquares[d] && PlayedSquares[a] === PlayedSquares[e]) {
      return PlayedSquares[a];
    }
  }
  return null;
}

function generateBoard(){
  //const List=new Set([0,8,16,24,32,40,48,56,7,15,23,31,39,47,55,63]);
  //const PlayedSquares=Array(64).fill(null);

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
}



function chooseBlackOrWhite(){
  let pairsContainer = document.getElementById("root");
  let pairElement1 = document.createElement("button");
  pairElement1.classList.add("generate-btn");
  pairElement1.id="chosenBlack";
  pairElement1.innerHTML = "Black";

  let pairElement2 = document.createElement("button");
  pairElement2.classList.add("generate-btn");
  pairElement2.id="chosenWhite";
  pairElement2.innerHTML = "White";
  while (pairsContainer.firstChild) {
    pairsContainer.removeChild(pairsContainer.firstChild);
  }
    pairsContainer.appendChild(pairElement1);
  pairsContainer.appendChild(pairElement2);


  let generateBtn1 = document.getElementById("chosenBlack");
  generateBtn1.addEventListener("click", generateBoard);
  let generateBtn2 = document.getElementById("chosenWhite");
  generateBtn2.addEventListener("click", generateBoard);
}



function OneOrTwoPlayers(){
  let pairsContainer = document.getElementById("root");
  let pairElement1 = document.createElement("button");
  pairElement1.classList.add("generate-btn");
  pairElement1.id="2Players";
  pairElement1.innerHTML = "2 Players";

  let pairElement2 = document.createElement("button");
  pairElement2.classList.add("generate-btn");
  pairElement2.id="1Player";
  pairElement2.innerHTML = "1 Player";
  while (pairsContainer.firstChild) {
    pairsContainer.removeChild(pairsContainer.firstChild);
  }
    pairsContainer.appendChild(pairElement1);
  pairsContainer.appendChild(pairElement2);


  let generateBtn1 = document.getElementById("2Players");
  generateBtn1.addEventListener("click", generateBoard);
  let generateBtn2 = document.getElementById("1Player");
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









let generateBtn = document.getElementById("PlayGame");
generateBtn.addEventListener("click", OneOrTwoPlayers);z