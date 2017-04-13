import Phaser from 'phaser-ce';
import Player from '../prefabs/player';
import Goal from '../prefabs/goal';


export default class Platformer extends Phaser.State {
    init() {
        // start physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 1000;
    }

    create() {
        this.add.tileSprite(0, 0, 1050, 595, 'sky');
        // create map and set tileset
        this.map = this.add.tilemap('platformer-tilemap');
        this.map.addTilesetImage(
            'tiles-spritesheet',
            'tiles-spritesheet'
        );
        
        this.layer = this.map.createLayer('collision');
        this.layerBackground = this.map.createLayer('background');
        this.physics.arcade.enable(this.layer);
        this.layer.resizeWorld();

        this.player = new Player(this.game, 32, this.world.height - 150);
        this.add.group().add(this.player);

        this.goal = new Goal(this.game, 875, this.world.height - 150);
        this.add.group().add(this.goal);

        this.map.setCollisionBetween(0, 10000, true, this.layer);    
    }
    
    update() {
        this.physics.arcade.collide(this.player, this.layer);
        this.physics.arcade.collide(this.goal, this.layer);
        this.physics.arcade.overlap(
            this.goal,
            this.player,
            this.reachGoal,
            null,
            this
        );
    }

    reachGoal() {
        this.state.start('Nim');
    }
}
