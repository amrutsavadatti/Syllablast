'use client'
import React from "react";

import { configs } from "../puzzle";
import { Model, Syllable, Game } from "../model";
import { computeSquare, redrawCanvas } from "../boundary";
import Dropdown from "../Components/Dropdown";
import styles from '../styles/Grid.module.css';

const allConfigs = configs;

export function selectSyllable(m:Model, canvas:any, e:any) {
  const canvasSquare = canvas.getBoundingClientRect();

  let syllable: Syllable | undefined = m.game?.syllable.find(s => {
    let square = computeSquare(s);
    return square.contains(e.clientX - canvasSquare.left, e.clientY - canvasSquare.top);
  })
  console.log(syllable);
  
  m.game?.setSelectedSyllable(syllable);
}

export default function Home() {
  // initial instantiation of the Model comes from the actualPuzzle
  const [model, setModel] =  React.useState(new Model(allConfigs));
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

  // low-level controller
  // const handleClick = (e:any) => {
  //    selectPiece(model, canvasRef.current, e)
  //    setRedraw(redraw + 1)
  // }

  // function handleMove(dir:MoveType) {
  //   movePiece(model, dir)
  //   setRedraw(redraw+1)
  // }

  // function handleOption(config:int) {
  //   movePiece(model, dir)
  //   setRedraw(redraw+1)
  // }

 return (
   <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <canvas data-testid="puzzle" ref={canvasRef} className="puzzle" width={450} height={450} onClick={handleClick}>
        <div className={styles.canvasContainer}>
            {/* <Grid /> */}
        </div>
     </canvas>
     <label data-testid="nummoves" className="nummoves">{"Swaps: " + model.swaps}</label>
     <label data-testid="nummoves" className="nummoves">{"Score: " + model.score}</label>

     {/* <div className="buttons">
       <button data-testid="reset" className="button resetBtn"  onClick={(e) => handleMove(Left)}  disabled={!model.available(Left)}  >&#8592;</button>
       <button data-testid="undo" className="button undoBtn"    onClick={(e) => handleMove(Up)}    disabled={!model.available(Up)}    >&#8593;</button>
     </div> */}

     <div>
        <Dropdown />
     </div>

     <button data-testid="reset" className="button resetbutton">Reset</button>
   </main>
 );
}
