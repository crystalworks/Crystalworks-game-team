export default class Menu extends Phaser.State {
    init() { }

    preload() {
        this.load.image('start-btn', 'assets/images/start-btn.png'); 
    }

    create() {
        this.startBtn = this.add.button(
            this.world.centerX - 100,
            this.world.centerY + 50,
            'start-btn',
            this.gameLoad,
            this
        );

        this.title = game.add.text(
            this.world.centerX - 125,
            125,
            'Nimomania'
        );
        this.title.fontSize = 60;       
        this.title.fill = '#fff';

        this.info = game.add.text(
            this.world.centerX - 125,
            210,
            'Collect coins to play with master'
        );
        this.info.fontSize = 20;       
        this.info.fill = '#fff';
 }

    gameLoad() {
        this.state.start('Preload');
    }

}
