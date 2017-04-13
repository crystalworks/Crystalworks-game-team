import Phaser from 'phaser-ce';

export default class Goal extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'goal');

        this.game.physics.arcade.enable(this);
    
        this.anchor.setTo(0.5);
    }
}
