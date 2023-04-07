import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  // setup state variables
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']); // blank board
  const [turn, setTurn] = useState(true); // true = player, false = computer
  const [winner, setWinner] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(false); // computer is thinking
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  function selectSquare(square) { // clicking on a square
    if (!board[square] && !gameOver && !loading) { // disable when needed
      let old = board;
      old[square] = turn ? '☺' : '☻'; // depending on whose turn, update the board
      setBoard(old);
      setTurn(!turn); // flip turn
    }
  }


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  function checkWin() {
    // player win conditions
    if (board[0] == '☺' && board[1] == '☺' && board[2] == '☺'
      || board[3] == '☺' && board[4] == '☺' && board[5] == '☺'
      || board[6] == '☺' && board[7] == '☺' && board[8] == '☺'
      || board[0] == '☺' && board[3] == '☺' && board[6] == '☺'
      || board[1] == '☺' && board[4] == '☺' && board[7] == '☺'
      || board[2] == '☺' && board[5] == '☺' && board[8] == '☺'
      || board[0] == '☺' && board[4] == '☺' && board[8] == '☺'
      || board[2] == '☺' && board[4] == '☺' && board[6] == '☺') {
      setGameOver(true); // end the game
      setWinner('player'); // set the message
      setWins(wins + 1); // update wins
      return 1;
    }
    // computer win conditions
    else if (board[0] == '☻' && board[1] == '☻' && board[2] == '☻'
      || board[3] == '☻' && board[4] == '☻' && board[5] == '☻'
      || board[6] == '☻' && board[7] == '☻' && board[8] == '☻'
      || board[0] == '☻' && board[4] == '☻' && board[8] == '☻'
      || board[0] == '☻' && board[3] == '☺' && board[6] == '☻'
      || board[1] == '☻' && board[4] == '☺' && board[7] == '☻'
      || board[2] == '☻' && board[5] == '☺' && board[8] == '☻'
      || board[2] == '☻' && board[4] == '☻' && board[6] == '☻') {
      setGameOver(true);
      setWinner('computer');
      setLosses(losses + 1);
      return 2;
    }
    //tie
    else if (board[0] && board[1] && board[2] && board[3] && board[4] && board[5] && board[6] && board[7] && board[8]) {
      setGameOver(true);
      setWinner('tie');
      return 3;
    }
  }

  useEffect(() => { // runs every time turn is flipped
    let winner = checkWin(); // check win conditions
    if (!turn && winner != 1 && winner != 2 && winner != 3) {
      // if it's the computer and the game is running take their turn
      setLoading(true);
      setTimeout(() => {
        let original = true;
        while (original) {
          let rand = getRandomInt(0, 8); // get a random square
          if (!board[rand]) { // check to make sure it's empty or run again
            selectSquare(rand);
            original = false;
          }
        }
        setLoading(false);
      }, 1000); // add a second of delay
    }
  }, [turn]); // watches for changes in turn

  function playAgain() {
    setBoard(['', '', '', '', '', '', '', '', '']); // clear board
    setTurn(getRandomInt(0, 2) == 1 ? true : false); // get new turn
    setGameOver(false); // restart game
    setWinner(''); // clear message
  }

  useEffect(() => {
    // get a random turn at the start
    setTurn(getRandomInt(0, 2) == 1 ? true : false);
  }, []) // run once

  return (
    <div className="container">
      <h1>Tic Tac Hello!</h1>
      <p style={{textAlign: 'center'}}>Wins: {wins}<br />Losses: {losses}</p>
      <div className="board">
        <div className="square" onClick={() => selectSquare(0)}>
          {
            board[0] // print out what's in board[0]
          }
        </div>
        <div className="square" onClick={() => selectSquare(1)}>
          {
            board[1]
          }
        </div>
        <div className="square" onClick={() => selectSquare(2)}>
          {
            board[2]
          }
        </div>
      </div>
      <div className="board">
        <div className="square" onClick={() => selectSquare(3)}>
          {
            board[3]
          }
        </div>
        <div className="square" onClick={() => selectSquare(4)}>
          {
            board[4]
          }
        </div>
        <div className="square" onClick={() => selectSquare(5)}>
          {
            board[5]
          }
        </div>
      </div>
      <div className="board">
        <div className="square" onClick={() => selectSquare(6)}>
          {
            board[6]
          }
        </div>
        <div className="square" onClick={() => selectSquare(7)}>
          {
            board[7]
          }
        </div>
        <div className="square" onClick={() => selectSquare(8)}>
          {
            board[8]
          }
        </div>
      </div>
      <p>{ loading && !gameOver ? "Computer is thinking..." : !loading && !gameOver ? "Your turn" : ""}</p>
      { // toggles for the end game messages
        winner == 'player' ?
          <p>You win! <span onClick={() => playAgain()}>Play again</span>.</p> :
          winner == 'computer' ?
            <p>You lose. <span onClick={() => playAgain()}>Play again</span>.</p> : 
            winner == 'tie' ?
            <p>You tied. <span onClick={() => playAgain()}>Play again</span>.</p> :
            
            ''
      }
    </div>
  );
}

export default App;
