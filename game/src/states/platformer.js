import Phaser from 'phaser-ce';
import Player from '../prefabs/player';

export default class Platformer extends Phaser.State {
    init() {
        // start physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 1000;
    }

    preload() {
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('ground', 'assets/images/platform.png');
    }

    create() {
        // create map and set tileset
        this.map = this.add.tilemap('platformer-tilemap');
        this.map.addTilesetImage(
            'tiles-spritesheet',
            'tiles-spritesheet'
        );
        
        this.layer = this.map.createLayer('collision');
        this.layer.resizeWorld();

        this.add.sprite(0, 0, 'sky');
        this.player = new Player(this.game, 32, this.world.height - 150);
        this.add.group().add(this.player);        
    }
}
