import { useState } from 'react';

export default function Dropdown() {
    const [selectedValue, setSelectedValue] = useState('1'); // Default empty selection

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value); // Update state when selection changes
    };

    return (
        <div>
            <label htmlFor="options">Select a game:</label>
            <select id="options" value={selectedValue} onChange={handleChange}>
                <option value="" disabled>
                    --Choose an option--
                </option>
                <option value="1">Game 1</option>
                <option value="2">Game 2</option>
                <option value="3">Game 3</option>
            </select>
            <p>You selected: {selectedValue}</p>
        </div>
    );
};
