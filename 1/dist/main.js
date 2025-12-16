var fs = require('fs');
var testInput = [];
fs.readFile('./input.txt', 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    var dataLines = data.replaceAll("\r", "").split("\n");
    run(dataLines);
});
var run = function (movesInput) {
    var dialPosition = 50;
    var password = 0;
    for (var _i = 0, movesInput_1 = movesInput; _i < movesInput_1.length; _i++) {
        var move = movesInput_1[_i];
        var direction = move.substring(0, 1);
        var distanceStr = move.substring(1);
        var distance = parseInt(distanceStr);
        if (direction == "L") {
            distance *= -1;
        }
        dialPosition += distance;
        dialPosition = dialPosition % 100;
        if (dialPosition < 0) {
            dialPosition += 100;
        }
        if (dialPosition == 0) {
            password++;
        }
    }
    console.log("password ".concat(password));
};
