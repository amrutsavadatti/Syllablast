import {vitest, test, expect} from 'vitest'
import {Model, Game, Syllable, Position, Swap} from './model'
import { configs } from './puzzle'

// npm run test -- --run --reporter verbose --coverage

test("Position", () => {
    let p1 = new Position(2, 3);
    expect(p1.row).toBe(2);
    expect(p1.col).toBe(3);
})

test("Syllable", () => {
    let s1 = new Syllable("AAA", new Position(2, 3));
    expect(s1.name).toBe("AAA");
    expect(s1.position.row).toBe(2);
    expect(s1.position.col).toBe(3);
    expect(s1.correctPosition).toBe(false);
    
    s1.setCorrectPosition(true);
    expect(s1.correctPosition).toBe(true);
    let p1 = s1.position;
    let pos = s1.getPosition();
    expect(pos).toBe(p1);
});

test("Swap", () => {
    let s1 = new Syllable("AAA", new Position(2, 3));
    let s2 = new Syllable("BBB", new Position(3, 3));
    let arr = [s1, s2];
    let swap = new Swap(arr);
    expect(swap.swap).toBe(arr);
})

test("Game", () => {

    let game = new Game(
        {
            "id": 1,
            "rows": 4,
            "cols": 4,
            "name": "Config #1",
            "words" : [ "in,vis,i,ble" , "im,mac,u,late" , "af,fil,i,ate" , "un,der,wa,ter" ],
            "initial": [ ['ter','ate','ble','der'],
                            ['fil','in','im','i'],
                            ['i','late','mac','un'],
                            ['u','vis','af','wa']
                ]
        }
    );

    const initial = [ ['ter','ate','ble','der'],
                    ['fil','in','im','i'],
                    ['i','late','mac','un'],
                    ['u','vis','af','wa']
                ]
    const win = [ ['in','vis','i','ble'],
                ['im','mac','u','late'],
                ['af','fil','i','ate'],
                ['un','der','wa','ter']
            ]

    expect(game.config).toBe(1);

    for (let i = 0; i < game.syllable.length; i++) {
        for (let j = 0; j < game.syllable[i].length; j++) {
            expect(game.syllable[i][j].name).toBe(initial[i][j]);
        }
    }


    for (let i = 0; i < game.winCondition.length; i++) {
        for (let j = 0; j < game.winCondition[i].length; j++) {
            expect(game.winCondition[i][j]).toBe(win[i][j]);
        }
    }

    let slb = new Syllable("AAA", new Position(2, 3));
    game.setSelectedSyllable(slb);
    expect(game.getSelectedSyllables()).toStrictEqual([new Syllable("AAA", new Position(2, 3))]);

    game.setSelectedSyllable(slb);
    expect(game.getSelectedSyllables()).toStrictEqual([]);

    game.setSelectedSyllable(slb);
    game.truncateSelection()
    expect(game.getSelectedSyllables()).toStrictEqual([]);
})

test("Model", () => {
    let game = new Game(
        {
            "id": 1,
            "rows": 4,
            "cols": 4,
            "name": "Config #1",
            "words" : [ "in,vis,i,ble" , "im,mac,u,late" , "af,fil,i,ate" , "un,der,wa,ter" ],
            "initial": [    ['ter','ate','ble','der'],
                            ['fil','in','im','i'],
                            ['i','late','mac','un'],
                            ['u','vis','af','wa']
                ]
        }
    );

    let model = new Model(configs, 1);
    expect(model.game).toStrictEqual(game);
    
    const s1 = new Syllable('in', new Position(1,1));
    const s2 = new Syllable('fil', new Position(1,0));

    model.game?.setSelectedSyllable(s1);
    model.game?.setSelectedSyllable(s2);
    model.swapThem()
    expect(model.game?.syllable[1][1].name).toBe('fil');
    // console.log(model.score);
    expect(model.score).toBe(1);
    model.undo();
    expect(model.game?.syllable[1][0].name).toBe('fil');

    model.score = 16;
    expect(model.checkComplete()).toBe(undefined);
})


