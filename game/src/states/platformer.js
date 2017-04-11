import Phaser from 'phaser-ce';
import Player from './prefabs/player';

export default class Platformer extends Phaser.State {    
    init() {

    }

    preload() {
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('ground', 'assets/images/platform.png');
    }

    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.add.sprite(0, 0, 'sky');
        this.player = new Player(this.game, 32, this.world.height - 150);
        this.add.group().add(this.player);        
    }
}
