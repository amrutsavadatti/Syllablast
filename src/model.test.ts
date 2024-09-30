import {vitest, test, expect} from 'vitest'
import {Model, Game, Syllable, Position, Swap} from './model'
import { configs } from '../puzzle'

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

test("Model", () => {
    let m = new model(configs, 1);
    expect(p1.row).toBe(2);
    expect(p1.col).toBe(3);
})