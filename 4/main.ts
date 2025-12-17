const fs = require('fs');

let testInput = [];

fs.readFile('./input.txt', 'utf8', (err, data: string) => {
    if (err) {
        console.error(err);
        return;
    }
    
    run(data);
});

const buildLines = (data: string): string[][] => {
    const lines = data.replaceAll("\r", "").split("\n");
    let res: string[][] = [];
    for (const line of lines) {
        res.push(line.split(""));
    }
    
    return res;
}
const run = (data: string): void => {
    const lines: string[][] = buildLines(data);

    let freeRolls: number = 0;

    for (let lineIndex: number = 0; lineIndex < lines.length; lineIndex++) {
        for (let columnIndex: number = 0; columnIndex < lines[lineIndex].length; columnIndex++) {
            if (lines[lineIndex][columnIndex] != "@") {
                // Not a roll
                continue;
            }

            let adjacentRolls: number = 0;
            const columnExistsAbove: boolean = lineIndex != 0;
            const columnExistsBelow: boolean = lineIndex != lines.length-1;
            if (columnExistsAbove) {
                // Column above
                adjacentRolls += lines[lineIndex-1][columnIndex] == "@" ? 1 : 0;
            }
            if (columnExistsBelow) {
                // Column below
                adjacentRolls += lines[lineIndex+1][columnIndex] == "@" ? 1 : 0;
            }
            if (columnIndex != 0) {
                // Column to the left
                adjacentRolls += lines[lineIndex][columnIndex-1] == "@" ? 1 : 0;
                
                if (columnExistsAbove) {
                    // Column above to the left
                    adjacentRolls += lines[lineIndex-1][columnIndex-1] == "@" ? 1 : 0;
                }
                if (columnExistsBelow) {
                    // Column below to the left
                    adjacentRolls += lines[lineIndex+1][columnIndex-1] == "@" ? 1 : 0;
                }
            }
            if (columnIndex != lines[lineIndex].length-1) {
                // Column to the right
                adjacentRolls += lines[lineIndex][columnIndex+1] == "@" ? 1 : 0;

                if (columnExistsAbove) {
                    // Column above to the right
                    adjacentRolls += lines[lineIndex-1][columnIndex+1] == "@" ? 1 : 0;
                }
                if (columnExistsBelow) {
                    // Column below to the right
                    adjacentRolls += lines[lineIndex+1][columnIndex+1] == "@" ? 1 : 0;
                }
            }

            freeRolls += adjacentRolls < 4 ? 1 : 0;
        }
    }

    console.log(`freeRolls ${freeRolls}`);
}