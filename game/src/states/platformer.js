import Phaser from 'phaser-ce';
import Player from '../prefabs/player';

export default class Platformer extends Phaser.State {
    init() {
        // start physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 1000;
    }

    create() {
        this.add.tileSprite(0, 0, 700, 560, 'sky');
        // create map and set tileset
        this.map = this.add.tilemap('platformer-tilemap');
        this.map.addTilesetImage(
            'tiles-spritesheet',
            'tiles-spritesheet'
        );
        
        this.layer = this.map.createLayer('collision');
        this.physics.arcade.enable(this.layer);
        this.layer.resizeWorld();

        this.player = new Player(this.game, 32, this.world.height - 150);
        this.add.group().add(this.player);    
        this.map.setCollisionBetween(0, 10000, true, this.layer);    
    }
    
    update() {
        this.physics.arcade.collide(this.player, this.layer);
    }
}
