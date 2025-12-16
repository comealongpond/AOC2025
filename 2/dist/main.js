var fs = require('fs');
var testInput = [];
fs.readFile('./input.txt', 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    var intervals = data.split(",");
    run(intervals);
});
var run = function (intervals) {
    var sumOfRepeatedPatterns = 0;
    for (var _i = 0, intervals_1 = intervals; _i < intervals_1.length; _i++) {
        var interval = intervals_1[_i];
        var intervalSplit = interval.split("-");
        var intervalStart = parseInt(intervalSplit[0]);
        var intervalStop = parseInt(intervalSplit[1]);
        for (var i = intervalStart; i <= intervalStop; i++) {
            var iStr = i.toString();
            if (isRepeatedPattern(iStr)) {
                var iNumber = parseInt(iStr);
                sumOfRepeatedPatterns += iNumber;
            }
        }
    }
    console.log("sumOfRepeatedPatterns ".concat(sumOfRepeatedPatterns));
};
var isRepeatedPattern = function (input) {
    var inputLength = input.length;
    if (inputLength % 2 != 0) {
        // Cannot be a repeated pattern
        return false;
    }
    var p1 = input.substring(0, input.length / 2);
    var p2 = input.substring(input.length / 2);
    return p1 == p2;
};
