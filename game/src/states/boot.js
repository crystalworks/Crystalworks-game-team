import Phaser from 'phaser-ce';

export default class Boot extends Phaser.State {
    init() {
        this.stage.backgroundColor = '#000';
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }
  
    preload() {
        this.load.image('loaderBg', 'assets/images/loader-bg.png');
        this.load.image('loaderBar', 'assets/images/loader-bar.png');
    }

    create() {
        this.state.start('Preload');
    }
}
