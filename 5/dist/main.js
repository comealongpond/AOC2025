var fs = require('fs');
var testInput = [];
fs.readFile('./input.txt', 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    run(data);
});
;
var run = function (data) {
    var lines = data.replaceAll("\r", "").split("\n");
    var validIntervals = [];
    var valuesStartAtIndex = 0;
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line == '') {
            valuesStartAtIndex = i + 1;
            break;
        }
        var intervalSplit = line.split("-");
        var ival = {
            start: parseInt(intervalSplit[0]),
            end: parseInt(intervalSplit[1])
        };
        validIntervals.push(ival);
    }
    var res = 0;
    for (var i = valuesStartAtIndex; i < lines.length; i++) {
        var value = lines[i];
        if (isInAnyInterval(value, validIntervals)) {
            res++;
        }
    }
    console.log(res);
};
var isInAnyInterval = function (value, intervals) {
    var valueInt = parseInt(value);
    for (var _i = 0, intervals_1 = intervals; _i < intervals_1.length; _i++) {
        var i = intervals_1[_i];
        if (valueInt >= i.start && valueInt <= i.end) {
            return true;
        }
    }
    return false;
};
