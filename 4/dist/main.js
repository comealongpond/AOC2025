var fs = require('fs');
var testInput = [];
fs.readFile('./input.txt', 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    run(data);
});
var buildLines = function (data) {
    var lines = data.replaceAll("\r", "").split("\n");
    var res = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        res.push(line.split(""));
    }
    return res;
};
var run = function (data) {
    var lines = buildLines(data);
    var freeRolls = 0;
    for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        for (var columnIndex = 0; columnIndex < lines[lineIndex].length; columnIndex++) {
            if (lines[lineIndex][columnIndex] != "@") {
                // Not a roll
                continue;
            }
            var adjacentRolls = 0;
            var columnExistsAbove = lineIndex != 0;
            var columnExistsBelow = lineIndex != lines.length - 1;
            if (columnExistsAbove) {
                // Column above
                adjacentRolls += lines[lineIndex - 1][columnIndex] == "@" ? 1 : 0;
            }
            if (columnExistsBelow) {
                // Column below
                adjacentRolls += lines[lineIndex + 1][columnIndex] == "@" ? 1 : 0;
            }
            if (columnIndex != 0) {
                // Column to the left
                adjacentRolls += lines[lineIndex][columnIndex - 1] == "@" ? 1 : 0;
                if (columnExistsAbove) {
                    // Column above to the left
                    adjacentRolls += lines[lineIndex - 1][columnIndex - 1] == "@" ? 1 : 0;
                }
                if (columnExistsBelow) {
                    // Column below to the left
                    adjacentRolls += lines[lineIndex + 1][columnIndex - 1] == "@" ? 1 : 0;
                }
            }
            if (columnIndex != lines[lineIndex].length - 1) {
                // Column to the right
                adjacentRolls += lines[lineIndex][columnIndex + 1] == "@" ? 1 : 0;
                if (columnExistsAbove) {
                    // Column above to the right
                    adjacentRolls += lines[lineIndex - 1][columnIndex + 1] == "@" ? 1 : 0;
                }
                if (columnExistsBelow) {
                    // Column below to the right
                    adjacentRolls += lines[lineIndex + 1][columnIndex + 1] == "@" ? 1 : 0;
                }
            }
            freeRolls += adjacentRolls < 4 ? 1 : 0;
        }
    }
    console.log("freeRolls ".concat(freeRolls));
};
