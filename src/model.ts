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
        this.computeScore();
    }

    undo() {
        if (this.isComplete !== true) {
            if(this.gameHistory.length > 0) {
                const history = this.gameHistory.pop();
                let position1 = history.swap[0].getPosition();
                let position2 = history.swap[1].getPosition();
        
                let syllables =  this.game.syllable;
                syllables[position1.row][position1.col] = history.swap[1];
                syllables[position1.row][position1.col].position = new Position(position1.row, position1.col);
                syllables[position2.row][position2.col] = history.swap[0];
                syllables[position2.row][position2.col].position = new Position(position2.row, position2.col);
        
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
            syllables[position1.row][position1.col].position = new Position(position1.row, position1.col);
            syllables[position2.row][position2.col] = this.game.selectedSyllables[0];
            syllables[position2.row][position2.col].position = new Position(position2.row, position2.col);
    
            console.log("this is syllables")
            console.log(syllables)
            this.game.syllable = syllables;
            this.gameHistory.push(new Swap([this.game.selectedSyllables[0], this.game.selectedSyllables[1]]));
            this.game?.truncateSelection();
            this.swaps++;
            this.computeScore();
        }
    }

    computeScore()  {
        let score = 0;
        let master = this.game?.winCondition;
        let scrambledMatrix = this.game?.syllable;

        scrambledMatrix.forEach(row => {
            row.forEach(syllable => {
                syllable.setCorrectPosition(false);
            });
        });

        for (let i =0; i < scrambledMatrix.length; i++) {
            let scrambledWord = scrambledMatrix[i];
            
            for (let j =0; j < master?.length; j++) {
                let continuous = true;
                for (let k=0; k < master[j].length; k++) {
                    if (scrambledWord[k].name === master[j][k]) {
                        scrambledWord[k].setCorrectPosition(true);
                        score++;
                    } 
                    else {
                        break;
                    } 
                }
            }

        }
        this.game.syllable = scrambledMatrix;
        this.score = score;
        console.log("## This is SCORE " + this.score);
    }

    checkComplete() {
        if(this.score === 16) {
            this.isComplete = true;
        }
    }
}


export class Game {
    config: number;
    syllable: Syllable[][];
    selectedSyllables: Array<Syllable> = [];
    winCondition: string[][] | undefined;

    constructor(configDetails: any) {
        this.config = configDetails.id;
        this.syllable = [];

        for (let i = 0; i < configDetails?.initial.length; i++) {
            const word = configDetails?.initial[i];
            let subArr = [];
            for (let j = 0; j < word.length; j++) {
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
        let selected = [...this.selectedSyllables];
        if (selected.includes(s)) {
            selected.splice(this.selectedSyllables.indexOf(s), 1);
        }else {
            selected.push(s);
        }

        this.selectedSyllables = selected;
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

    constructor(n: string, p: Position, correctPosition:boolean = false) {
        this.name = n;
        this.position = p;
        this.correctPosition = correctPosition
    }

    getPosition() {
        return this.position;
    }

    setCorrectPosition(val:boolean) {
        this.correctPosition = val;
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