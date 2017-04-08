export default class Preload extends Phaser.State {
    preload() {
        this.load.image('coin', 'assets/images/coin.png');
        this.load.image('coin-selected', 'assets/images/coin-selected.png');
        this.load.image('hand', 'assets/images/hand-no-active.png');
        this.load.image('hand-active', 'assets/images/hand-active.png');
        this.load.image('nim-background', 'assets/images/nim-background.svg');
    }

    create() {
        this.state.start('Nim');
    }
}
