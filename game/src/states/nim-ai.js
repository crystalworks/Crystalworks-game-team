/**
 * chooseMove() returns next step (row and count)
 * @param {array} coins
 * @return {object} 
 */
export default function chooseMove(coins) {
    let countCoinsInRow = getCountCoinsInRow(coins);
    let countCoinsBit = countCoinsInRow.map(x => toBin(x));
    let sumBits = getSumBit(countCoinsBit);
    let count = toDec(sumBits);
    let max = countCoinsInRow.reduce((acc, item) => {
        if (acc < item){
            return item;
        }
        else {
            return acc;
        }
    }, 0);
    let row = 0;
}

/**
 * getCountCoinsInRow() returns count of coins in each row
 * @param {array} coins
 * @return {array} 
 */
function getCountCoinsInRow(coins) {
    let countCoinsInRow = [];
    coins.forEach( (x, index) => {
        let count = 0;
        x.forEach( y => {
            if (y === 1)
                count += 1; 
        } )
        countCoinsInRow[index] = count;
    } )
    return countCoinsInRow;
}

/**
 * getSumBit() execute xor of counts coins in each row
 * @param {array} binaryCountsCoins
 * @return {array} 
 */
function getSumBit(binaryCountsCoins) {
    let sumBits = [];
    for (let i = 0; i < MAX_COUNT_BIT; i += 1) {
        sumBits[i] = 0;
        for (let j = 0; j < binaryCountsCoins.length; j += 1) {
            sumBits[i] = sumBits[i] ^ binaryCountsCoins[j][i];
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
        return acc + x * Math.pow(2, index);     
    })
}
