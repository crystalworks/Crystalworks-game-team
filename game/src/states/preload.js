import Phaser from 'phaser-ce';

export default class Preload extends Phaser.State {
    init() {}

    preload() {
        this.loaderBg = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'loaderBg'
        );
        this.loaderBar = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'loaderBar'
        );
        this.loaderBg.anchor.setTo(0.5);
        this.loaderBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.loaderBar);

        this.load.image('menu-background', 'assets/images/sunset.png');
        this.load.image('start-btn', 'assets/images/start-btn.png');

        this.load.tilemap(
            'platformer-tilemap', 
            'assets/maps/platformer-map.json', 
            null, 
            Phaser.Tilemap.TILED_JSON
        );
        this.load.image(
            'tiles-spritesheet', 
            'assets/images/tiles-spritesheet.png'
        );

        this.load.image('sky', 'assets/images/fragile-soft-machine.png');
        this.load.image('goal', 'assets/images/goal.png');
        this.load.spritesheet('player', 'assets/images/player-spritesheet.png', 28, 30, 5, 1, 1);

        this.load.image('coin', 'assets/images/coin.png');
        this.load.image('coin-selected', 'assets/images/coin-selected.png');
        this.load.image('hand', 'assets/images/hand-no-active.png');
        this.load.image('hand-active', 'assets/images/hand-active.png');
        this.load.image('nim-background', 'assets/images/nim-background.png');

        this.load.audio('nim-get-coins', 'assets/audio/sounds/nim-get-coins.wav');
    }

    create() {
        this.state.start('Menu');
    }
}
