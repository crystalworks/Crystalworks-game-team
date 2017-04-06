export default class Nim extends Phaser.State {
    create() {
        this.ROW_COUNT = 3;
        this.MAX_COINS_IN_ROW_COUNT = 5;
        this.HAND_X = 400;
        this.HAND_Y = 250;
        this.COIN_X = 100;
        this.COIN_Y = 100;
        this.COIN_OFFSET = 50;
        this.coins = [];
        this.currentLine = 0;
        this.counter = 0;
        this.hand = this.add.sprite(this.HAND_X, this.HAND_Y, 'hand');
        this.hand.inputEnabled = true;
        this.hand.events.onInputDown.add(this.handListener, this);
        
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
            this.hand.loadTexture('hand-active', 0);
            
            if (args[0].key === 'coin') {
                args[0].loadTexture('coin-selected', 0);
                this.counter++;
            } else {
                args[0].loadTexture('coin', 0);  
                this.counter--;
            }    
            
            if (this.counter === 0) {
                this.currentLine = 0;
                this.hand.loadTexture('hand', 0);
            }     
        }
    }

    handListener() {
        if (this.hand.key === 'hand-active') {
            let line = this.ROW_COUNT - (this.currentLine - this.COIN_Y) / this.COIN_OFFSET;
            
            this.coins[line].map((x, index) => {
                if (x.key === 'coin-selected'){
                    x.destroy();
                }
            })

            this.currentLine = 0;
            this.hand.loadTexture('hand', 0);
        }   
    }
}