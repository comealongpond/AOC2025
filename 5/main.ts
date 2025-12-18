const fs = require('fs');

let testInput = [];

fs.readFile('./input.txt', 'utf8', (err, data: string) => {
    if (err) {
        console.error(err);
        return;
    }
    
    run(data);
});

interface interval {
    start: number
    end: number
};

const run = (data: string): void => {
    const lines: string[] = data.replaceAll("\r", "").split("\n")
    let validIntervals: interval[] = [];
    let valuesStartAtIndex: number = 0;
    
    for (let i: number = 0; i < lines.length; i++) {
        const line: string = lines[i];
        
        if (line == '') {
            valuesStartAtIndex = i + 1;
            break;
        }

        const intervalSplit: string[] = line.split("-");
        const ival: interval = {
            start: parseInt(intervalSplit[0]),
            end: parseInt(intervalSplit[1])
        }

        validIntervals.push(ival)
    }

    let res: number = 0;

    for (let i: number = valuesStartAtIndex; i < lines.length; i++) {
        const value: string = lines[i];
        if (isInAnyInterval(value, validIntervals)) {res++}
    }

    console.log(res);
}

const isInAnyInterval = (value: string, intervals: interval[]) : boolean => {
    const valueInt: number = parseInt(value);

    for (const i of intervals) {
        if (valueInt >= i.start && valueInt <= i.end) {
            return true;
        }
    }

    return false;
}