import Phaser from 'phaser-ce';
import AI from './nim-ai';
import coinsCountPrepare from './counts-coins';

export default class Nim extends Phaser.State {
    preload() {
        this.background = this.add.tileSprite(0, 0, 1050, 595, 'nim-background');
        this.texts = {
            playerTurn: 'Your turn',
            computerTurn: 'Computer Turn',
            win: 'You win!',
            lose: 'You lose',
        };
        this.coinY = 60;
        this.coinOffset = 60;
        this.isUserStepFinished = false;
        this.test = true;
        this.coins = [];
        this.digitCoins = [];
        this.currentLine = 0;
        this.counter = 0;
        this.coinsCount = 6;
    }

    create() {
        const coinsCountText = `Coins: ${this.coinsCount}`;
        const countCoinsInRow = coinsCountPrepare(this.coinsCount);
        const fontStyle = {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            align: 'center',
        };
        this.coinsText = this.add.text(
            50,
            50,
            coinsCountText,
            fontStyle,
        );
        this.getCoinsSound = this.game.add.audio('nim-get-coins');
        this.getCoinsSound.onStop.add(this.soundStopped, this);
        this.hand = this.add.sprite(
            this.game.world.centerX,
            this.coinY + (this.coinOffset * (countCoinsInRow.length)) + 120,
            'hand'
        );
        this.hand.anchor.set(0.5);
        this.hand.inputEnabled = true;
        this.hand.events.onInputDown.add(this.handListener, this);
        this.hand.events.onInputDown.add(this.soundPlay, this);

        this.turnText = this.add.text(
            this.game.world.centerX,
            50,
            this.texts.playerTurn,
            fontStyle
        );
        this.centerText();

        for (let i = countCoinsInRow.length - 1; i > -1; i -= 1) {
            this.coins[i] = [];
            this.digitCoins[i] = [];
            const coinX = this.game.world.centerX - (this.coinOffset * (countCoinsInRow[i] / 2));
            
            for (let j = 0; j < countCoinsInRow[i]; j += 1) {
                this.digitCoins[i][j] = 1;
                this.coins[i][j] = this.add.sprite(
                    coinX + (this.coinOffset * j),
                    this.coinY + (this.coinOffset * (countCoinsInRow.length - i)),
                    'coin'
                );
                this.coins[i][j].inputEnabled = true;
                this.coins[i][j].events.onInputDown.add(this.coinsListener, this);
            }
        }
    }

    coinsListener(...args) {
        if (this.currentLine === 0 || this.currentLine === args[0].position.y) {
            this.currentLine = args[0].position.y;
            this.hand.loadTexture('hand-active', 0);

            if (args[0].key === 'coin') {
                args[0].loadTexture('coin-selected', 0);
                this.counter += 1;
            } else {
                args[0].loadTexture('coin', 0);
                this.counter -= 1;
            }

            if (this.counter === 0) {
                this.currentLine = 0;
                this.hand.loadTexture('hand', 0);
            }
        }
    }

    handListener() {
        if (this.hand.key === 'hand-active') {
            this.isUserStepFinished = true;
            const line = this.coins.length - ((this.currentLine - this.coinY) / this.coinOffset);

            this.coins[line].forEach((coin, index) => {
                if (coin.key === 'coin-selected') {
                    coin.loadTexture('coin', 0);
                    coin.visible = false;
                    this.digitCoins[line][index] = 0;
                }
            });

            const count = this.calculateCount();
            this.coinsText.text = `Coins: ${count}`;
            this.hand.loadTexture('hand', 0);
            this.turnText.text = this.texts.computerTurn;
            this.centerText();
            this.counter = 0;
            this.currentLine = 0;
        }
    }

    newgame() {
        this.coins = [];
        this.digitCoins = [];
        this.coinsCount *= 2;
        this.coinsText.text = `Coins: ${this.coinsCount}`;
        const countCoinsInRow = coinsCountPrepare(this.coinsCount);
        this.hand.y = this.coinY + (this.coinOffset * (countCoinsInRow.length)) + 100;
        
        for (let i = countCoinsInRow.length - 1; i > -1; i -= 1) {
            this.coins[i] = [];
            this.digitCoins[i] = [];
            const coinX = this.game.world.centerX - (this.coinOffset * (countCoinsInRow[i] / 2));
            
            for (let j = 0; j < countCoinsInRow[i]; j += 1) {
                this.digitCoins[i][j] = 1;
                this.coins[i][j] = this.add.sprite(
                    coinX + (this.coinOffset * j),
                    this.coinY + (this.coinOffset * (countCoinsInRow.length - i)),
                    'coin'
                );
                this.coins[i][j].inputEnabled = true;
                this.coins[i][j].events.onInputDown.add(this.coinsListener, this);
            }
        }
    }

    checkEndOfGame() {
        const countCoinsInRow = this.getCountCoinsInRow();
        let isFinished = false;

        switch (this.getCountLeftCoins(countCoinsInRow)) {
            case 0: {
                this.turnText.text = this.texts.win;
                isFinished = true;
                break;
            }
            case 1: {
                isFinished = true;
                this.state.start('GameOver');
                break;
            }
            default: {
                this.stepAI(countCoinsInRow);
                this.turnText.text = this.texts.playerTurn;
            }
        }
        this.centerText();

        return isFinished;
    }

    getCountCoinsInRow() {
        const countCoinsInRow = [];

        this.digitCoins.forEach((row, index) => {
            let count = 0;

            row.forEach((coin) => {
                if (coin === 1) {
                    count += 1;
                }
            });

            countCoinsInRow[index] = count;
        });

        return countCoinsInRow;
    }

    stepAI(countCoinsInRow) {
        const step = AI(countCoinsInRow);
        let count = step.count;

        this.digitCoins[step.row] = this.digitCoins[step.row].map((coin, index) => {
            if ((count > 0) && (coin !== 0)) {
                this.coins[step.row][index].visible = false;
                count -= 1;

                return 0;
            }

            return coin;
        });
        count = this.calculateCount();
        this.coinsText.text = `Coins: ${count}`;
    }

    getCountLeftCoins(countCoinsInRow) {
        let count = this.calculateCount();

        const countEmptyRows = countCoinsInRow.reduce((total, countCoins) => {
            if (countCoins === 0) {
                total += 1;
            }

            return total;
        }, 0);

        if (this.coins.length - countEmptyRows === 1) {
            count = 1;
        }

        return count;
    }

    calculateCount() {
        return this.digitCoins.reduce((total, row) => {
            if (row.length > 0) {
                total += row.reduce((count, coin) => {
                    count += Number(coin);
                    return count;
                }, 0);
            }

            total += 0;

            return total;
        }, 0);
    }

    centerText() {
        const width = this.turnText.width;
        this.turnText.x = this.game.world.centerX - Math.floor(width / 2);
    }

    soundPlay() {
        if (this.isUserStepFinished) {
            this.getCoinsSound.play();
            this.isUserStepFinished = true;
        }
    }

    soundStopped() {
        if (this.isUserStepFinished) {
            this.isUserStepFinished = false;

            if (this.checkEndOfGame()) {
                this.newgame();
            } else {
                this.getCoinsSound.play();
            }
        }
    }
}
