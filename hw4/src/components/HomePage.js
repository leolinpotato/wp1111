/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useState, useEffect } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}
  const difficultyAdjustment = () => {
    if (showPanel)
      setShowPanel(false);
    else
      setShowPanel(true);
  }

  const updateMineNum = (e) => {
    mineNumOnChange(e.target.value);
  }

  const updateBoardSize = (e) => {
    boardSizeOnChange(e.target.value);
  }

  const clickStartGame = () => {
    if (!error)
      startGameOnClick();
  }

  useEffect(() => {
    if (mineNum > boardSize * boardSize)
      setError(true);
    else
      setError(false);
  }, [mineNum, boardSize])

  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implemen start button */}
      <button className="btn" onClick={clickStartGame}>Start Game</button>
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
      <div className="controlContainer">
        <button className="btn" onClick={difficultyAdjustment}>Difficulty Adjustment</button>
        <div className="controlWrapper" style={showPanel ? {}  : {display: "none"}}>
          <div className="error" style={error ? {} : {display: "none"}}>ERROR: Mines number and board size are invalid!</div>
          <div className="controlPanel">
            <div className="controlCol">
              <p className="controlTitle">Mines Number</p>
              <input type="range" step="1" min="1" max="50" defaultValue={mineNum} onChange={updateMineNum}/>
              <p className="controlNum" style={error ? {color: "#880000"} : {}}>{mineNum}</p>
            </div>
            <div className="controlCol">
              <p className="controlTitle">Board Size(nxn)</p>
              <input type="range" step="1" min="1" max="20" defaultValue={boardSize} onChange={updateBoardSize}/>
              <p className="controlNum" style={error ? {color: "#880000"} : {}}>{boardSize}</p>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );

}
export default HomePage;   