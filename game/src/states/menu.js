export default class Menu extends Phaser.State {
    init() { }

    preload() {
        this.load.image('start-btn', 'assets/images/start-btn.png');
        this.load.image('bonus-btn', 'assets/images/bonus-btn.png');      
    }

    create() {
        this.startBtn = this.add.button(
            this.world.centerX - 300,
            this.world.centerY - 50,
            'start-btn',
            this.gameLoad,
            this
        );

        this.bonusBtn = this.add.button(
            this.world.centerX + 50,
            this.world.centerY - 50,
            'bonus-btn',
            this.bonusLoad,
            this
        );
    }

    gameLoad() {
        this.state.start('Preload');
    }

    bonusLoad() {
        this.state.start('Preload');
    }
}
