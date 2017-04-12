import Phaser from 'phaser-ce';

export default class Menu extends Phaser.State {
    create() {
        const fillColor = '#fff';
        this.add.sprite(0, 0, 'menu-background');
        this.startBtn = this.add.button(
            this.world.centerX,
            this.world.centerY + 50,
            'start-btn',
            this.gameLoad,
            this
        );
        this.startBtn.anchor.setTo(0.5);
        this.title = this.add.text(
            this.world.centerX,
            125,
            'Nimomania'
        );
        this.title.fontSize = 60;
        this.title.fill = fillColor;
        this.title.anchor.setTo(0.5);
        this.info = this.add.text(
            this.world.centerX,
            210,
            'Collect coins to play with master'
        );
        this.info.fontSize = 20;
        this.info.fill = fillColor;
        this.info.anchor.setTo(0.5);
    }

    gameLoad() {
        this.state.start('Platformer'); 
    }
}
