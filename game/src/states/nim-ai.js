const MAX_COUNT_BIT = 3;
const ROW_COUNT = 3;
/**
 * getCountCoinsInRow() returns count of coins in each row
 * @param {array} coins
 * @return {array}
 */
function getCountCoinsInRow(coins) {
    const countCoinsInRow = [];
    coins.forEach((x, index) => {
        let count = 0;
        x.forEach((y) => {
            if (y === 1) {
                count += 1;
            }
        });
        countCoinsInRow[index] = count;
    });
    return countCoinsInRow;
}

/**
 * getSumBit() execute xor of counts coins in each row
 * @param {array} binaryCountsCoins
 * @return {array}
 */
function getSumBit(binaryCountsCoins) {
    const sumBits = [];
    for (let i = 0; i < MAX_COUNT_BIT; i += 1) {
        sumBits[i] = 0;
        for (let j = 0; j < binaryCountsCoins.length; j += 1) {
            sumBits[i] ^= binaryCountsCoins[j][i];
        }
    }
    return sumBits.reverse();
}

/**
 * toDec() convert binary number to decimal
 * @param {array} binary
 * @return {number}
 */
function toDec(binary) {
    return binary.reduce((acc, x, index) => {
        const digit = x * (2 ** index);
        return acc + digit;
    });
}

/**
 * toBin() convert num to array of bits
 * @param {number} num
 * @return {array}
 */
function toBin(num) {
    let result = num;
    result = result.toString(2);
    if (result.length < MAX_COUNT_BIT) {
        result = '0'.repeat(MAX_COUNT_BIT - result.length).concat(result);
    }
    return result.split('').map(x => Number(x));
}

/**
 * getSumBit() inverse bits of number
 * @param {array} binaryNumber
 * @return {array}
 */
function inverse(binaryNumber) {
    return binaryNumber.map(x => Number(!x));
}

/**
 * getCountCoinsToDelete() execute count of coins to delete from table.
 * 1. inverse max number
 * 2. inverse count number
 * 3. inverse max number XOR inverse count number
 * 4. result of the third step convert to decimal
 * 5. return result as: max - result of the fourth step
 * example:
 * max = 5, count = 7
 * 1. inverseMax = 010
 * 2. count = 000
 * 3. count = 000 xor 010 = 010
 * 4. count = 2
 * 5. return 5 - 2 = 3
 * @param {number} max
 * @param {number} count
 * @return {number}
 */
function getCountCoinsToDelete(max, count) {
    const inverseMax = inverse(toBin(max));
    let resultCount = inverse(toBin(count)).map((x, index) => x ^ inverseMax[index]);
    resultCount = toDec(resultCount.reverse());
    return max - resultCount;
}

/**
 * chooseMove() returns next step (row and count)
 * @param {array} coins
 * @return {object}
 */
export default function chooseMove(coins) {
    const countCoinsInRow = getCountCoinsInRow(coins);
    const countCoinsBit = countCoinsInRow.map(x => toBin(x));
    const sumBits = getSumBit(countCoinsBit);
    let count = toDec(sumBits);
    const max = countCoinsInRow.reduce((acc, item) => {
        if (acc < item) {
            return item;
        }
        return acc;
    }, 0);
    let row = 0;
    if (count > max) {
        row = countCoinsInRow.indexOf(max);
        count = getCountCoinsToDelete(max, count);
    } else if (count === 0) {
        count = 1;
        row = Math.floor(Math.random(0, ROW_COUNT));
    } else {
        let tmp = toBin(count).reduce((acc, x) => {
            if ((acc.length === 0) && (x === 0)) {
                return acc;
            }
            return acc.concat(1);
        }, []);
        tmp = toDec(tmp);
        if (tmp === 1) {
            row = countCoinsInRow.indexOf(tmp);
            if (row === -1) {
                row = countCoinsInRow.indexOf(max);
            }
            count = tmp;
        } else {
            tmp = countCoinsInRow.filter(x => x <= tmp);
            row = countCoinsInRow.indexOf(tmp[0]);
            count = toBin(count);
            count = countCoinsBit[row].map((x, index) => x ^ count[index]);
            count = toDec(count.reverse());
        }
    }
    return {
        row,
        count, };
}
