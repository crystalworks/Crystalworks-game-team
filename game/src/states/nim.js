export default class Nim extends Phaser.State {
    create() {
        this.ROW_COUNT = 3;
        this.MAX_COINS_IN_ROW_COUNT = 5;
        this.COIN_X = 100;
        this.COIN_Y = 100;
        this.COIN_OFFSET = 50;
        this.coins = [];
        this.currentLine = 0;
        this.counter = 0;

        for (let i = this.ROW_COUNT - 1; i > -1; i--){
            this.coins[i] = [];
            for (let j = 0; j < this.MAX_COINS_IN_ROW_COUNT - i; j++) {
                this.coins[i][j] = game.add.sprite(this.COIN_X + this.COIN_OFFSET * j, this.COIN_Y + this.COIN_OFFSET * (this.ROW_COUNT - i), 'coin');
                this.coins[i][j].inputEnabled = true;
                this.coins[i][j].events.onInputDown.add(this.coinsListener, this);
            }
        }
    }
    coinsListener(...args) {
        if (this.currentLine === 0 || this.currentLine === args[0].position.y) {
            this.currentLine = args[0].position.y;
            
            if (args[0].key === 'coin') {
                args[0].loadTexture('coin-selected', 0);
                this.counter++;
            } else {
                args[0].loadTexture('coin', 0);  
                this.counter--;
            }    
            
            if (this.counter === 0) {
                this.currentLine = 0;
            }     
        }
    }
}
