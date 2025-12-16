const fs = require('fs');

let testInput = [];

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const dataLines = data.replaceAll("\r","").split("\n");
    run(dataLines);
});

const run = (movesInput) => { 
    let dialPosition = 50;
    let password = 0;

    for (const move of movesInput) {
        const direction = move.substring(0, 1);
        const distanceStr = move.substring(1);
        let distance = parseInt(distanceStr);

        if (direction == "L") { distance *= -1}

        dialPosition += distance

        dialPosition = dialPosition % 100

        if (dialPosition < 0) { dialPosition += 100 }

        if (dialPosition == 0) { password++; }
    }

    console.log(`password ${password}`);
}