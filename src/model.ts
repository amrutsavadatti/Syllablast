// import { configs } from "./puzzle";

export class Model {
    game: Game | undefined;
    gameHistory: Array<Swap> = [];
    score: number;
    swaps: number;
    isComplete: boolean = false ;

    constructor(info: any, config) {
        this.initialize(info, config);
    }

    initialize(info: any, config) {
        const configDetails = info.find((c: { id: number; }) => c.id === config);
        this.game = new Game(configDetails);
        this.isComplete = false;
        this.score = 0;
        this.swaps = 0;
    }

    undo() {
        if (this.isComplete !== true) {
            if(this.gameHistory.length > 0) {
                const history = this.gameHistory.pop();
                console.log(history);
                let position1 = history?.swap[0].getPosition();
                let position2 = history?.swap[1].getPosition();
        
                let syllables =  this.game.syllable;
                syllables[position1.row][position1.col] = history?.swap[0];
                syllables[position2.row][position2.col] = history?.swap[1];
        
                console.log("this is syllables")
                console.log(syllables)
                this.game.syllable = syllables;
                this.swaps--;
                this.computeScore();
            }
        }

    }

    swapThem() {

        if (this.isComplete !== true) {
            let position1 = this.game.selectedSyllables[0].getPosition();
            let position2 = this.game.selectedSyllables[1].getPosition();
    
            let syllables =  this.game.syllable;
            syllables[position1.row][position1.col] = this.game.selectedSyllables[1];
            syllables[position2.row][position2.col] = this.game.selectedSyllables[0];
    
            console.log("this is syllables")
            console.log(syllables)
            this.game.syllable = syllables;
            this.gameHistory.push(new Swap(this.game?.getSelectedSyllables()));
            this.game?.truncateSelection();
            this.swaps++;
            this.computeScore();
        }
    }

    computeScore()  {
        let score = 0;
        let master = this.game?.winCondition;
        let scrambledMatrix = this.game?.syllable;
        console.log("scrambledMatrix");
        console.log(scrambledMatrix);
        for (let i =0; i < scrambledMatrix.length; i++) {
            let scrambledWord = scrambledMatrix[i];
            
            for (let j =0; j < master?.length; j++) {
                let continuous = true;
                for (let k=0; k < master[j].length; k++) {
                    if (scrambledWord[k].name === master[j][k]) {
                        score++;
                    } 
                    else {
                        break;
                    } 
                }
            }

        }

        this.score = score;
        console.log(score);
    }

    checkComplete() {
        if(this.score === 16) {
            this.isComplete = true;
        }
    }
}


export class Game {
    config: number;
    readonly numRows: number;
    readonly numColumns: number;
    syllable: Syllable[][];
    selectedSyllables: Array<Syllable> = [];
    winCondition: string[][] | undefined;

    constructor(configDetails: any) {
        this.numRows = configDetails.rows;
        this.numColumns = configDetails.cols;
        this.config = configDetails.id;
        this.syllable = [];

        for (let i = 0; i < configDetails?.initial.length; i++) {
            const word = configDetails?.initial[i];
            let subArr = [];
            for (let j = 0; j < word.length; j++) {
                // this.syllable.push(new Syllable(word[j], new Position(i, j)));
                subArr.push(new Syllable(word[j], new Position(i, j)));
            }
            this.syllable.push(subArr);
        }
        
        this.winCondition = configDetails?.words.map(word => word.split(','));
    }

    getSelectedSyllables() {
        return this.selectedSyllables;
    }

    setSelectedSyllable(s: Syllable) {
        if (this.selectedSyllables.includes(s)) {
            this.selectedSyllables.splice(this.selectedSyllables.indexOf(s), 1);
        }
        else if (this.selectedSyllables.length >= 2) {
            this.selectedSyllables.shift();
            this.selectedSyllables.push(s);
        } else {
            this.selectedSyllables.push(s);
        }
    }

    truncateSelection() {
        this.selectedSyllables = [];
    }
}

export class Swap {
    swap: Array<Syllable> | undefined;

    constructor(s: Array<Syllable>) {
        this.swap = s;
    }

}

export class Syllable {
    name: string;
    position: Position;
    correctPosition: boolean = false;

    constructor(n: string, p: Position) {
        this.name = n;
        this.position = p;
    }

    getPosition() {
        return this.position;
    }

    setCorrectPosition(val:boolean) {
        this.correctPosition = true;
    }

}

export class Position {
    row: number;
    col: number;

    constructor(r: number, c: number) {
        this.row = r;
        this.col = c;
     }
}