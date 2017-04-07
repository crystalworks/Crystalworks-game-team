export default class Boot extends Phaser.State {
    init() {}

    preload() {}

    create() {
        this.state.start('Preload');
    }
}
