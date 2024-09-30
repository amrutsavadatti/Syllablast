'use client'
import React from "react";

import { configs } from "../puzzle";
import { Model, Syllable, Game } from "../model";
import { computeSquare, redrawCanvas } from "../boundary";
import Dropdown from "../Components/Dropdown";
import styles from '../styles/Grid.module.css';

const allConfigs = configs;

export default function Home() {
  // initial instantiation of the Model comes from the actualPuzzle
  let currentConfig: number = 1;
  const [model, setModel] =  React.useState(new Model(allConfigs, currentConfig));
  const [redraw, setRedraw] = React.useState(0)

  const canvasRef = React.useRef(null)   // Later need to be able to refer to App


  // Set up the refresh policies
  React.useEffect(() => {
     redrawCanvas(model, canvasRef.current)
  }, [model, redraw])


  function handleClick(e:any) {
    selectSyllable(model, canvasRef.current, e);
    setRedraw(redraw+1);
  }

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

  // function handleSwap(model: Model) {
  //   selectSyllable(model, canvasRef.current, e);
  //   setRedraw(redraw+1);
  // }

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



 return (
   <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <canvas data-testid="puzzle" ref={canvasRef} className="puzzle" width={450} height={450} onClick={handleClick}>
        <div className={styles.canvasContainer}>
        </div>
     </canvas>
     <label data-testid="nummoves" className="nummoves">{"Swaps: " + model.swaps}</label>
     <label data-testid="nummoves" className="nummoves">{"Score: " + model.score}</label>

    <div className="buttons">
       <button data-testid="reset" className="button resetBtn"  onClick={(e) => changeConfig(1)}> Game 1 </button>
       <button data-testid="reset" className="button resetBtn"  onClick={(e) => changeConfig(2)}> Game 2 </button>
       <button data-testid="reset" className="button resetBtn"  onClick={(e) => changeConfig(3)}> Game 3 </button>
    </div>

     <div className="buttons">
       <button data-testid="reset" className="button resetBtn"  onClick={(e) => changeConfig(currentConfig)}>Reset</button>
       <br />
       <button data-testid="swap" className="button undoBtn"    onClick={(e) => handleSwap(model)} >Swap</button>
       <br />
       <button data-testid="swap" className="button undoBtn"    onClick={(e) => handleUndo(model)} >Undo</button>
       <br />
       <button data-testid="swap" className="button undoBtn"    onClick={(e) => refresh(model)} >Refresh</button>
       {/* <button data-testid="undo" className="button undoBtn"    onClick={(e) => handleMove(Up)}    disabled={!model.available(Up)}    >&#8593;</button> */}
     </div>

     {/* <div>
        <Dropdown />
     </div> */}

     {/* <button data-testid="reset" className="button resetbutton">Reset</button>
     <button data-testid="reset" className="button resetbutton">Undo</button> */}
   </main>
 );
}
