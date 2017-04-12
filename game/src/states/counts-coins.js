function calculteMaxValues(count) {
    let row = 0;
    let max = 0;

    if ((count > 63) && (count < 76)) {
        row = 10;
        max = 12;
    } else if ((count > 52) && (count < 64)) {
        row = 9;
        max = 11;
    } else if ((count > 42) && (count < 53)) {
        row = 8;
        max = 10;
    } else if ((count > 33) && (count < 43)) {
        row = 7;
        max = 9;
    } else if ((count > 25) && (count < 34)) {
        row = 6;
        max = 8;
    } else if ((count > 18) && (count < 36)) {
        row = 5;
        max = 7;
    } else if ((count > 12) && (count < 19)) {
        row = 4;
        max = 6;
    } else if ((count > 5) && (count < 13)) {
        row = 3;
        max = 5;
    }

    return {
        row,
        max
    };
}

export default function getCoins(count) {
    const data = calculteMaxValues(count);
    let currentCount = count;
    let result = [];

    for (let i = 0; i < data.row; i += 1) {
        if (i === (data.row - 1)) {
            result[i] = currentCount;
        } else {
            let coinCount = Math.floor(Math.random() * (data.max - 2)) + 3;
            
            if (coinCount > currentCount) {
                coinCount = Math.floor(Math.random() * currentCount) + 1;
            }
            
            currentCount -= coinCount;
            result[i] = coinCount;
        }
    }
    result = result.sort((a, b) => {
        return b - a;
    });
    return result;
}
