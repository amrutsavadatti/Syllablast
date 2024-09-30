import { useRef, useEffect } from 'react';

export default function Grid () {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const gridSize = 4; // 4x4 grid
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const cellWidth = canvasWidth / gridSize;
        const cellHeight = canvasHeight / gridSize;

        // Draw the grid
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear the canvas before drawing
        ctx.strokeStyle = 'black'; // Grid border color
        ctx.font = '20px Arial'; // Font for labels
        ctx.textAlign = 'center'; // Center the text horizontally
        ctx.textBaseline = 'middle'; // Center the text vertically

        const labels = [
            'A1', 'B1', 'C1', 'D1',
            'A2', 'B2', 'C2', 'D2',
            'A3', 'B3', 'C3', 'D3',
            'A4', 'B4', 'C4', 'D4'
        ]; // Example labels for each square

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const x = col * cellWidth;
                const y = row * cellHeight;
                const labelIndex = row * gridSize + col;

                // Draw square
                ctx.strokeRect(x, y, cellWidth, cellHeight);

                // Draw label in the center of the square
                const label = labels[labelIndex];
                const labelX = x + cellWidth / 2;
                const labelY = y + cellHeight / 2;
                ctx.fillText(label, labelX, labelY);
            }
        }
    }, []);

    return <canvas ref={canvasRef} width={400} height={400} style={{ border: '1px solid black' }} />;
};
