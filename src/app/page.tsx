'use client'
import React from "react";

import { configs } from "../puzzle";
import { Model, Syllable, Game, Position } from "../model";
import { computeSquare, redrawCanvas } from "../boundary";
import Dropdown from "../Components/Dropdown";
import styles from '../styles/Grid.module.css';

const allConfigs = configs;

export default function Home() {

  
  // initial instantiation of the Model comes from the actualPuzzle
  let currentConfig: number = 1;
  const [model, setModel] =  React.useState(new Model(allConfigs, currentConfig));
  const [redraw, setRedraw] = React.useState(0);

  const canvasRef = React.useRef(null)   // Later need to be able to refer to App


  // Set up the refresh policies
  React.useEffect(() => {
    //  redrawCanvas(model, canvasRef.current)
  }, [model, redraw])


  // function handleClick(e:any) {
  //   selectSyllable(model, canvasRef.current, e);
  //   setRedraw(redraw+1);
  // }

  function changeConfig(n:number) {
    currentConfig = n;
    setModel(new Model(allConfigs, n));
  }

  function updateModel(model:Model) {
    setModel(model);
  }

  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function selectSyllable(m:Model, canvas:any, e:any) {
    const canvasSquare = canvas.getBoundingClientRect();
  
    let syllable: Syllable | undefined;
  
    for(let word of m.game?.syllable) {
      for(let syl of word) {
        let square = computeSquare(syl);
        if (square.contains(e.clientX - canvasSquare.left, e.clientY - canvasSquare.top)) {
          syllable = syl;
        }
      }
    }
  
    console.log(" syllable " + syllable);
    
    m.game?.setSelectedSyllable(syllable);
    await sleep(1000);
    if (m.game.getSelectedSyllables().length === 2) {
      handleSwap(m);
      // setModel(m);
    }
    
  }

  function handleSwap(model: Model) {
    console.log("SWAPPIDDY");
    model.swapThem();
    model.checkComplete();
    console.log("model hai yw")
    console.log(model);
    setRedraw(redraw+1);
    // redrawCanvas(model, canvasRef.current,true);
  }
  
  function handleUndo(model: any) {
    model.undo();
    // setRedraw(redraw+1);
    redrawCanvas(model, canvasRef.current);
    console.log("model hai yw")
    console.log(model);
  }

  function refresh(m:Model) {
    console.log("refreshing");
    console.log(m);
    redrawCanvas(m, canvasRef.current);
  }

  const deepCopyModel = (originalModel) => {
    return {
      ...originalModel,
      game: {
        ...originalModel.game,
        selectedSyllables: [...originalModel.game.selectedSyllables],
        syllable: originalModel.game.syllable.map((row) => 
          row.map((cell) => ({ ...cell })) // Copy each Syllable object
        ),
      },
    };
  };


  // Function to handle button click
  const handleClick = (rowIndex, colIndex, model) => {

    // // Call the method on the original game instance
    // model.game.setSelectedSyllable(model.game?.syllable[rowIndex][colIndex]);

    // // Create a deep copy of the model
    // const updatedModel = deepCopyModel(model);

    // // Now update the state with the updated model
    // setModel(updatedModel);



    // model.game.setSelectedSyllable(model.game?.syllable[rowIndex][colIndex]);

    // const updatedModel = {
    //   ...model,
    //   game: {
    //     ...model.game,
    //     selectedSyllables: [...model.game.selectedSyllables], // Copy the existing selectedSyllables array
    //   },
    // };

    // updatedModel.game.selectedSyllable = [...model.game.selectedSyllables];
    // setModel(updatedModel);



    
    model.game.setSelectedSyllable(model.game?.syllable[rowIndex][colIndex]);
    console.log(model);
    if (model.game.selectedSyllables.length === 2) {
      handleSwap(model);
    }
    setRedraw(redraw+1);
  };

  const getClassName = (cell: Syllable) => {
    // console.log(model.game.selectedSyllables);
    let newClassName = 'grid-button default'
    if (cell.correctPosition === true) {
      newClassName = 'grid-button correct';
    }
    if (model.game.selectedSyllables.includes(cell)) {
      newClassName = 'grid-button selected';
    }
    return newClassName;
  };

 return (
  <div className = "background">
    {/* <div>
      <h1>SYLLABLAST</h1>
    </div> */}

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
</div>
);

}
