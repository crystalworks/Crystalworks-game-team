export default class Boot extends Phaser.State {
    init() { }

    preload() {
        this.game.stage.backgroundColor = '#000';
        this.load.image('loaderBg', 'assets/images/loader-bg.png');
        this.load.image('loaderBar', 'assets/images/loader-bar.png');
    }

    create() {
        this.state.start('Menu');
    }
}
