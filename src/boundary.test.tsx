import { test, expect, describe} from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react'
import Home from './app/page';
import {Model, Game, Syllable, Position, Swap} from './model'
import { configs } from './puzzle'




test('Access GUI', async() => {
    const { getByTestId } = render(<Home />);

    const undoBtn = getByTestId('undo');
    const reset = getByTestId('reset')
    const game_1 = getByTestId('game_1')
    const game_2 = getByTestId('game_2')
    const game_3 = getByTestId('game_3')
    
    
    // initially, this button
    expect(undoBtn).toBeTruthy()
    expect(reset).toBeTruthy()
    expect(game_1).toBeTruthy()
    expect(game_2).toBeTruthy()
    expect(game_3).toBeTruthy()

    fireEvent.click(game_1);
    const label_game = getByTestId('label_game')
    expect(label_game.textContent).toBe('Selected Game: 1');


    const score = getByTestId('score')
    expect(score.textContent).toBe('Score: 0');
    
    let model = new Model(configs, 1);
    const btn1 = getByTestId('clk_btn')
    const btn2 = getByTestId('clk_btn2')
    fireEvent.click(btn1);
    fireEvent.click(btn2);
    const swaps_btn = getByTestId('swap_btn')
    fireEvent.click(swaps_btn);
    
    const undo_btn = getByTestId('undo');
    fireEvent.click(undo_btn);
    expect(score.textContent).toBe('Score: 0');

    model = new Model(configs, 1);
    model.game?.setSelectedSyllable(new Syllable('ter', new Position(0,0)));
    model.game?.setSelectedSyllable(new Syllable('ate', new Position(0,1)));
    const reset_btn = getByTestId('reset')
    fireEvent.click(reset_btn);
    expect(score.textContent).toBe('Score: 0');
})
