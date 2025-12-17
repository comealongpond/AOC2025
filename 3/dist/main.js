var fs = require('fs');
var testInput = [];
fs.readFile('./input.txt', 'utf8', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    var lines = data.replaceAll("\r", "").split("\n");
    run(lines);
});
var joltageSum = 0;
var run = function (lines) {
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var batteries = line.split("");
        var biggestBattery = { index: -1, value: 0 };
        var secondBiggestBattery = { index: -1, value: 0 };
        for (var i = 0; i < batteries.length; i++) {
            var batteryJoltage = parseInt(batteries[i]);
            if (batteryJoltage > (biggestBattery === null || biggestBattery === void 0 ? void 0 : biggestBattery.value)) {
                biggestBattery.value = batteryJoltage;
                biggestBattery.index = i;
            }
        }
        var reverseOrder = false;
        if (biggestBattery.index == batteries.length - 1) {
            // If the biggest battery is the last it cant be first
            reverseOrder = true;
            // In this case we just find the next biggest number and use the biggest as second number
            for (var i = 0; i < batteries.length; i++) {
                var batteryJoltage = parseInt(batteries[i]);
                if (batteryJoltage > (secondBiggestBattery === null || secondBiggestBattery === void 0 ? void 0 : secondBiggestBattery.value) && i !== (biggestBattery === null || biggestBattery === void 0 ? void 0 : biggestBattery.index)) {
                    secondBiggestBattery.value = batteryJoltage;
                    secondBiggestBattery.index = i;
                }
            }
        }
        else {
            // In this case we just gotta find the next biggest number that is AFTER the biggest number in order
            for (var i = biggestBattery.index + 1; i < batteries.length; i++) {
                var batteryJoltage = parseInt(batteries[i]);
                if (batteryJoltage > (secondBiggestBattery === null || secondBiggestBattery === void 0 ? void 0 : secondBiggestBattery.value)) {
                    secondBiggestBattery.value = batteryJoltage;
                    secondBiggestBattery.index = i;
                }
            }
        }
        if (biggestBattery.index == -1 || secondBiggestBattery.index == -1) {
            // Something went wrong
            console.error("biggestBattery or secondBiggestBattery nor identified");
            return;
        }
        var resultStr = "";
        if (reverseOrder) {
            resultStr = "".concat(secondBiggestBattery.value).concat(biggestBattery.value);
        }
        else {
            resultStr = "".concat(biggestBattery.value).concat(secondBiggestBattery.value);
        }
        joltageSum += parseInt(resultStr);
    }
    console.log("joltageSum ".concat(joltageSum));
};
