// import { configs } from "./puzzle";

export class Model {
    game: Game | undefined;
    gameHistory: Array<Swap> = [];
    score: number = 0;
    swaps: number = 0;
    isComplete: boolean = false ;

    constructor(info: any, config = 1) {
        this.initialize(info, config);
    }

    initialize(info: any, config) {
        const configDetails = info.find((c: { id: number; }) => c.id === config);
        this.game = new Game(configDetails);
        this.isComplete = false;
    }
}


export class Game {
    config: number;
    readonly numRows: number;
    readonly numColumns: number;
    syllable: Array<Syllable>;
    selectedSyllables: Array<Syllable> = [];
    winCondition: string[][] | undefined;

    constructor(configDetails: any) {
        this.numRows = configDetails.rows;
        this.numColumns = configDetails.cols;
        this.config = configDetails.id;
        this.syllable = [];

        for (let i = 0; i < configDetails?.initial.length; i++) {
            const word = configDetails?.initial[i];
            for (let j = 0; j < word.length; j++) {
                this.syllable.push(new Syllable(word[j], new Position(i, j)));
            }
        }
        
        this.winCondition = configDetails?.words.map(word => word.split(','));
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
}

export class Swap {
    swap: Array<Syllable>;

    constructor(s: Array<Syllable>) {
        this.swap = s;
    }

}

export class Syllable {
    name: string;
    position: Position;
    isSelected: boolean = false;

    constructor(n: string, p: Position) {
        this.name = n;
        this.position = p;
    }

    getPosition() {
        return this.position;
    }

    selectSyllable() {
        this.isSelected = true;
    }

    unselectSyllable() {
        this.isSelected = false;
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