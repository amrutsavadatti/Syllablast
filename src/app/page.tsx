'use client'
import React from "react";

import { configs } from "../puzzle";
import { Model, Syllable } from "../model";

const allConfigs = configs;

export default function Home() {

  
  // initial instantiation of the Model comes from the actualPuzzle
  let currentConfig: number = 1;
  const [model, setModel] =  React.useState(new Model(allConfigs, currentConfig));
  const [redraw, setRedraw] = React.useState(0);

  function changeConfig(n:number) {
    currentConfig = n;
    setModel(new Model(allConfigs, n));
  }

  function handleSwap(model: Model) {
    console.log("SWAPPIDDY");
    model.swapThem();
    model.checkComplete();
    console.log("model hai yw")
    console.log(model);
    setRedraw(redraw+1);
  }
  
  function handleUndo(model: any) {
    console.log("UNDO INVOKED");
    model.undo();
    setRedraw(redraw+1);
  }

  const handleClick = (rowIndex, colIndex, model) => {
    if (!model.isComplete) {
      model.game.setSelectedSyllable(model.game?.syllable[rowIndex][colIndex]);
      console.log(model);
      if (model.game.selectedSyllables.length === 2) {
        handleSwap(model);
      }
      setRedraw(redraw+1);
    }
  };

  const getClassName = (cell: Syllable) => {
    let newClassName = 'grid-button default'
    if (cell.correctPosition === true) {
      newClassName = 'grid-button correct';
    }
    if (model.game.selectedSyllables.includes(cell)) {
      newClassName = 'grid-button selected';
    }
    return newClassName;
  };

  function setCongratulatoryMSg(model: Model) {
    if(model.isComplete) {
      return "Congrats";
    }
    else {
      return '';
    }
  }

 return (
  <div className = "background">
    <div>
      <h1>SYLLABLAST</h1>
    </div>

    <div className="grid-container">
    {model.game?.syllable.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <button
          key={`${rowIndex}-${colIndex}`}
          className={`grid-button ${ 
            getClassName(cell)
          }`}
          onClick={() => handleClick(rowIndex, colIndex, model)}
        >
          {cell.name.toUpperCase()}
        </button>
      ))
    )}
  </div>
  <div className="buttons">
    <button data-testid="reset" className="button resetBtn"  onClick={(e) => changeConfig(1)}> Game 1 </button>
    <button data-testid="reset" className="button resetBtn"  onClick={(e) => changeConfig(2)}> Game 2 </button>
    <button data-testid="reset" className="button resetBtn"  onClick={(e) => changeConfig(3)}> Game 3 </button>
  </div>

  <div className="labels">
    <label data-testid="nummoves" className="nummoves">{"Swaps: " + model.swaps}</label>
    <label data-testid="nummoves" className="nummoves">{"Score: " + model.score}</label>
    <label data-testid="nummoves" className="nummoves">{setCongratulatoryMSg(model)}</label>
  </div>

  <div className="buttons">
    <button data-testid="reset" className="button resetBtn"  onClick={(e) => changeConfig(currentConfig)}>Reset</button>
    <br />
    <button data-testid="swap" className="button undoBtn"    onClick={(e) => handleUndo(model)} >Undo</button>
    
  </div>
</div>
);

}

    