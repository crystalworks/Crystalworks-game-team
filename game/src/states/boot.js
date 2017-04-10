import Phaser from 'phaser-ce';

export default class Boot extends Phaser.State {
    init(levelFile) {
        this.stage.backgroundColor = '#000';
        this.levelFile = levelFile;
    }

    preload() {
        this.load.image('loaderBg', 'assets/images/loader-bg.png');
        this.load.image('loaderBar', 'assets/images/loader-bar.png');
        this.load.text('platformer', this.levelFile);
    }

    create() {
        const levelText = this.cache.getText('platformer');
        const levelData = JSON.parse(levelText);

        this.state.start('Preload', true, false, levelData);
    }   
}
