export default class Nim extends Phaser.State {
    create() {
        this.row_count = 3;
        this.max_coins_in_row_count = 5;
        this.hand_x = 400;
        this.hand_y = 250;
        this.coin_x = 100;
        this.coin_y = 100;
        this.coin_offset = 50;
        this.coins = [];
        this.currentLine = 0;
        this.counter = 0;
        this.hand = this.add.sprite(this.hand_x, this.hand_y, 'hand');
        this.hand.inputEnabled = true;
        this.hand.events.onInputDown.add(this.handListener, this);
        for (let i = this.row_count - 1; i > -1; i -= 1) {
            this.coins[i] = [];
            for (let j = 0; j < this.max_coins_in_row_count - i; j += 1) {
                this.coins[i][j] = this.add.sprite(
                    this.coin_x + (this.coin_offset * j), 
                    this.coin_y + (this.coin_offset * (this.row_count - i)), 
                    'coin');
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
            const line = this.row_count - ((this.currentLine - this.coin_y) / this.coin_offset);
            this.coins[line].forEach((x) => {
                if (x.key === 'coin-selected') {
                    x.destroy();
                }
            });
            this.counter = 0;
            this.currentLine = 0;
            this.hand.loadTexture('hand', 0);
        }
    }
}
