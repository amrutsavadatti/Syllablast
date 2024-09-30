import {Model, Game, Syllable} from "./model"

const BOXSIZE:number = 100;
const OFFSET:number = 10;


export function computeSquare (s: Syllable) {
    const p = s.getPosition();
    let sq = new Square(p.row * BOXSIZE + (p.row+1)*OFFSET, p.col * BOXSIZE + (p.col+1)*OFFSET);
    return sq;
}

function setBoxText(text:string, context:any, square:any) {
    context.font = '20px Arial';
    context.fillStyle = 'white'
    let textWidth = context.measureText(text).width;
    let textX = square.col + (BOXSIZE - textWidth) / 2;
    let textY = square.row + (BOXSIZE + 20) / 2;
    context.fillText(text, textX, textY);
}

export function drawPuzzle (context:any, game: Game) {
    let seledted = game.selectedSyllables;
    
    let syllableArr = game.syllable;
    console.log("syllableArr");
    console.log(syllableArr);
    for (let w of syllableArr) {
        for (let s of w) {
            let square = computeSquare(s);

            if (s.correctPosition) {
                context.fillStyle = "#2ecc71";
            }
            if (seledted.includes(s)) {
                context.fillStyle = "#34495e";
                
            } else {
                context.fillStyle = "orange";
            }
            context.fillRect(square.col, square.row, square.side, square.side);
            // console.log(s.name);
            setBoxText(s.name.toUpperCase(), context, square);
        }
    }
}

export class Square {
    readonly row: number;
    readonly col: number;
    readonly side: number = 100;

    constructor(r: number, c:number) {
        this.row = r;
        this.col = c;
    }

    contains(x:number, y:number): boolean {
        return y >= this.row && y <= (this.row + this.side) && x >= this.col && x <= (this.col + this.side);
    }
}


export function redrawCanvas(model:Model, canvasObj:any, a:boolean = true) {

    console.log('redrawing canvas');
    let context = canvasObj.getContext('2d');
    context.clearRect(0, 0, canvasObj.width, canvasObj.height);
 
    if (a) {
        if (model.game) {
            drawPuzzle(context, model.game);
        }
    }
}