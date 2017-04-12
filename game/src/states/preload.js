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

        this.load.image('coin', 'assets/images/coin.png');
        this.load.image('coin-selected', 'assets/images/coin-selected.png');
        this.load.image('hand', 'assets/images/hand-no-active.png');
        this.load.image('hand-active', 'assets/images/hand-active.png');
        this.load.image('nim-background', 'assets/images/nim-background.svg');
        this.load.image('sky', 'assets/images/sky.png');

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
    }

    create() {
        this.state.start('Menu');
    }
}
