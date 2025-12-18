const fs = require('fs');

let testInput = [];

fs.readFile('./input.txt', 'utf8', (err, data: string) => {
    if (err) {
        console.error(err);
        return;
    }
    
    run(data);
});


const run = (data: string): void => {
    
}