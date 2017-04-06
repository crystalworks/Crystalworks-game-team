export default class Preload extends Phaser.State {
    preload() {
        this.load.image('coin', 'assets/images/coin.png');
        this.load.image('coin-selected', 'assets/images/coin-selected.png');
    }

    create() {
        this.state.start('Nim');
    }
}
