const fs = require('fs');

let testInput = [];

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.replaceAll("\r", "").split("\n");
    run(lines);
});

let joltageSum = 0;

interface battery {
    index: number
    value: number
}

const run = (lines: string[]): void => {
    
    for (const line of lines) {
        const batteries: string[] = line.split("");
        
        let biggestBattery: battery = {index: -1, value: 0}
        let secondBiggestBattery: battery = {index: -1, value: 0}

        for (let i: number = 0; i < batteries.length; i++) {
            const batteryJoltage: number = parseInt(batteries[i])
            if (batteryJoltage > biggestBattery?.value) {
                biggestBattery.value = batteryJoltage
                biggestBattery.index = i
            }
        }

        let reverseOrder: boolean = false;
        if (biggestBattery.index == batteries.length-1) {
            // If the biggest battery is the last it cant be first
            reverseOrder = true;
            // In this case we just find the next biggest number and use the biggest as second number
            for (let i: number = 0; i < batteries.length; i++) {
                const batteryJoltage: number = parseInt(batteries[i])
                if (batteryJoltage > secondBiggestBattery?.value && i !== biggestBattery?.index) {
                    secondBiggestBattery.value = batteryJoltage
                    secondBiggestBattery.index = i
                }
            }
        } else {
            // In this case we just gotta find the next biggest number that is AFTER the biggest number in order
            for (let i: number = biggestBattery.index+1; i < batteries.length; i++) {
                const batteryJoltage: number = parseInt(batteries[i])
                if (batteryJoltage > secondBiggestBattery?.value) {
                    secondBiggestBattery.value = batteryJoltage
                    secondBiggestBattery.index = i
                }
            }
        }

        if (biggestBattery.index == -1 || secondBiggestBattery.index == -1) {
            // Something went wrong
            console.error("biggestBattery or secondBiggestBattery nor identified");
            return;
        }

        let resultStr: string = "";
        if (reverseOrder) {
            resultStr = `${secondBiggestBattery.value}${biggestBattery.value}`;
        } else {
            resultStr = `${biggestBattery.value}${secondBiggestBattery.value}`;
        }

        joltageSum += parseInt(resultStr);
    }

    console.log(`joltageSum ${joltageSum}`);
}