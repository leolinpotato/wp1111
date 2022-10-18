/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    let row;
    if (guess === undefined) {
        row = 
            <div className='Row-wrapper'>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
            </div>
    } else {
        row = 
            <div className='Row-wrapper'>
              {guess.map((element, index) => <div className={`Row-wordbox ${element.color}`} id={`${rowIdx}-${index}`} key={`${rowIdx}-${index}`}>{element.char}</div>)}
            </div>
    }

    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- Row */}
            {row}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default Row;