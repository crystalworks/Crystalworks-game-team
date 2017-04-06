export default class Nim extends Phaser.State {
    create() {
        this.ROW_COUNT = 3;
        this.MAX_COINS_IN_ROW_COUNT = 5;
        this.COIN_X = 100;
        this.COIN_Y = 100;
        this.COIN_OFFSET = 50;
        this.coins = [];

        for (let i = this.ROW_COUNT - 1; i > -1; i--){
            this.coins[i] = [];
            for (let j = 0; j < this.MAX_COINS_IN_ROW_COUNT - i; j++) {
                this.coins[i][j] = game.add.sprite(this.COIN_X + this.COIN_OFFSET * j, this.COIN_Y + this.COIN_OFFSET * (this.ROW_COUNT - i), 'coin');
            }
        }
    }

}
