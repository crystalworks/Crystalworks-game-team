let maxCountBit;
/**
 * getSumBit() execute xor of counts coins in each row
 * @param {array} binaryCountsCoins
 * @return {array}
 */
function getSumBit(binaryCountsCoins) {
    const sumBits = [];

    for (let i = 0; i < maxCountBit; i += 1) {
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
    return binary.reduce((result, bit, index) => {
        const digit = bit * (2 ** index);
        return result + digit;
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

    if (result.length < maxCountBit) {
        result = '0'.repeat(maxCountBit - result.length).concat(result);
    }

    return result.split('').map(bit => Number(bit));
}

/**
 * getMaxCountCoinsInRow() looking for the largest row and get count of coins
 * @param {array} countCoinsInRow
 * @return {number}
 */
function getMaxCountCoinsInRow(countCoinsInRow) {
    return countCoinsInRow.reduce((resultCount, currentCount) => {
        if (resultCount < currentCount) {
            return currentCount;
        }

        return resultCount;
    }, 0);
}

function filterCoins(coins, tmp) {
    return coins.filter(count => (count > 0) && (count <= tmp));
}

/**
 * selectRow() is a very important function.
 * This function looking for row, from ai will delete coins.
 * 1. Find digit, that will the biggest than sumBits. For example:
 *     a) sumBits = 010 -> biggest number is 011
 *     b) sumBits = 0101 -> biggest number is 0111
 * 2. Get all row, which count less or equal coins, than biggest number.
 *    If rows didn't find, biggest number increment: tmp * 2 + 1. If tmp is 011, result tmp = 111.
 *    For example:
 *     a) biggest number is 011 or 3, countCoinsInRow is [1, 4, 5]. Result is [1];
 *     b) biggest number is 011 or 3, countCoinsInRow is [2, 3, 5]. Result is [2, 3].
 *     c) biggest number is 011 or 3, countCoinsInRow is [0, 4, 5]. Result is [4, 5].
 * 3. Get row, which has maximum coins. For example:
 *     a) result is [1], countCoinsInRow is [1, 4, 5]. So return row 0;
 *     b) result is [2, 3], countCoinsInRow is [2, 3, 5]. So return row 1.
 * @param {array} countCoinsInRow
 * @param {array} sumBits
 * @return {number}
 */
function selectRow(countsInRow, sumBits) {
    // 1 step
    let tmp = sumBits.reverse().reduce((resultBinaryDigit, bit) => {
        if ((resultBinaryDigit.length === 0) && (bit === 0)) {
            return resultBinaryDigit;
        }

        return resultBinaryDigit.concat(1);
    }, []);

    tmp = toDec(tmp);
    // 2 step
    let result = filterCoins(countsInRow, tmp);

    while (result.length < 1) {
        tmp = (tmp * 2) + 1;
        result = filterCoins(countsInRow, tmp);
    }
    // 3 step
    result = getMaxCountCoinsInRow(result);

    return countsInRow.indexOf(result);
}
/**
 * calculateCountCoinsToDelete() is function, which calculate how many coins to delete
 * @param {array} countInRow
 * @param {number} count
 * @return {number}
 */
function calculateCountCoinsToDelete(countInRow, count) {
    return countInRow - (countInRow ^ count);
}

function findMaxCountBit(countCoinsInRow) {
    maxCountBit = toBin(getMaxCountCoinsInRow(countCoinsInRow)).length;
}

/**
 * chooseMove() returns next step (row and count)
 * @param {array} countCoinsInRow
 * @return {object}
 */
export default function chooseMove(countCoinsInRow) {
    findMaxCountBit(countCoinsInRow);
    const countCoinsBit = countCoinsInRow.map(count => toBin(count));
    const sumBits = getSumBit(countCoinsBit);
    let count = toDec(sumBits);
    let row = 0;

    if (count === 0) {
        count = 1;
        do {
            row = Math.floor(Math.random() * countCoinsInRow.length);
        } while (countCoinsInRow[row] === 0);
    } else {
        row = selectRow(countCoinsInRow, sumBits);
        count = calculateCountCoinsToDelete(countCoinsInRow[row], count);
    }
    
    return {
        row,
        count,
    };
}
