import Phaser from 'phaser-ce';
import AI from './nim-ai';
import coinsCountPrepare from './counts-coins';

export default class Nim extends Phaser.State {
    preload() {
        this.background = this.add.tileSprite(0, 0, 1000, 600, 'nim-background');
        this.texts = {
            playerTurn: 'Player turn',
            computerTurn: 'Computer Turn',
            win: 'You win!',
            lose: 'You lose',
        };

        this.coinY = 50;
        this.coinOffset = 50;
        this.isUserStepFinished = false;
        this.test = true;
        this.coins = [];
        this.digitCoins = [];
        this.currentLine = 0;
        this.counter = 0;
    }

    create() {
        const countCoinsInRow = coinsCountPrepare(6);
        const center = (this.game.width / 2);
        const textConfig = {
            fontConfig: {
                fontSize: '32px',
                fill: '#fee',
                backgroundColor: '#0004',
                align: 'center',
            },
        };
        
        this.hand = this.add.sprite(
            center,
            this.coinY + (this.coinOffset * (countCoinsInRow.length)) + 50,
            'hand'
        );
        const width = Math.floor(this.hand.width / 2);
        this.hand.x = center - width;
        this.hand.inputEnabled = true;
        this.hand.events.onInputDown.add(this.handListener, this);

        this.turnText = this.add.text(
            0,
            50,
            this.texts.playerTurn,
            textConfig.fontConfig
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

    update() {
        if (this.isUserStepFinished) {
            if (this.test) {
                this.test = false;
            } else {
                const now = Date.now();
                while (Date.now() - now < 500) {}

                if (this.checkEndOfGame()) {
                    this.newgame();
                }

                this.isUserStepFinished = false;
                this.test = true;
            }
        }
    }
    handListener() {
        if (this.hand.key === 'hand-active') {
            const line = this.coins.length - ((this.currentLine - this.coinY) / this.coinOffset);
            this.coins[line].forEach((coin, index) => {
                if (coin.key === 'coin-selected') {
                    coin.loadTexture('coin', 0);
                    coin.visible = false;
                    this.digitCoins[line][index] = 0;
                }
            });
            
            this.hand.loadTexture('hand', 0);
            this.turnText.text = this.texts.computerTurn;
            this.centerText();
            this.isUserStepFinished = true;
            this.counter = 0;
            this.currentLine = 0;
        }
    }

    newgame() {
        for (let i = this.coins.length - 1; i > -1; i -= 1) {
            for (let j = 0; j < this.coins[i].length; j += 1) {
                this.digitCoins[i][j] = 1;
                this.coins[i][j].visible = true;
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
    }

    getCountLeftCoins(countCoinsInRow) {
        let count = 0;
        const countEmptyRows = countCoinsInRow.reduce((total, countCoins) => {
            if (countCoins === 0) {
                total += 1;
            }
            count += countCoins;

            return total;
        }, 0);

        if (this.coins.length - countEmptyRows === 1) {
            count = 1;
        }

        return count;
    }

    centerText() {
        const width = this.turnText.width;
        this.turnText.x = this.game.world.centerX - Math.floor(width / 2);
    }
}
