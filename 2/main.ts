const fs = require('fs');

let testInput = [];

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const intervals = data.split(",");
    run(intervals);
});

const run = (intervals) => {
    let sumOfRepeatedPatterns: number = 0;

    for (const interval of intervals) {
        const intervalSplit = interval.split("-");
        const intervalStart:number = parseInt(intervalSplit[0]);
        const intervalStop:number = parseInt(intervalSplit[1]);

        for (let i:number = intervalStart; i <= intervalStop; i++) {
            const iStr: string = i.toString();
            if (isRepeatedPattern(iStr)) {
                const iNumber = parseInt(iStr);
                sumOfRepeatedPatterns += iNumber;
            }
        }

    }
    
    console.log(`sumOfRepeatedPatterns ${sumOfRepeatedPatterns}`);
}

const isRepeatedPattern = (input: string) => {
    const inputLength = input.length;
    if (inputLength % 2 != 0) {
        // Cannot be a repeated pattern
        return false;
    }

    const p1 = input.substring(0, input.length/2)
    const p2 = input.substring(input.length/2)
    return p1 == p2;
}