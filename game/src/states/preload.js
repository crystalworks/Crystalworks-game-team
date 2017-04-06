export default class Preload extends Phaser.State {
    preload() {
        this.load.image('coin', 'assets/images/coin.png');
    }

    create() {
        this.state.start('Nim');
    }
}
