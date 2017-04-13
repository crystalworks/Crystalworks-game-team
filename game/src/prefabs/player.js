import Phaser from 'phaser-ce';

export default class Player extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'player');

        this.animations.add('walking', [0, 1, 2, 1], 6, true);

        this.game.physics.arcade.enable(this);

        this.walkingSpeed = 200;
        this.jumpingSpeed = 550;
        this.frame = 3;
        
        this.body.gravity.y = 300;
        this.body.collideWorldBounds = true;

        this.anchor.setTo(0.5);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursors.right.isDown && this.body.velocity.x >= 0) {
            // move right
            this.body.velocity.x = this.walkingSpeed;
            this.animations.play('walking');
            this.scale.setTo(-1, 1);
        } else if (this.cursors.left.isDown && this.body.velocity.x <= 0) {
            // move left
            this.body.velocity.x = -this.walkingSpeed;
            this.animations.play('walking');
            this.scale.setTo(1, 1);
        } else {
            // stop
            this.body.velocity.x = 0;
            this.animations.stop();
            this.frame = 3;
        }

        // jump only if touching a tile
        if (this.cursors.up.isDown && this.body.blocked.down) {
            this.body.velocity.y = -this.jumpingSpeed;
        }
    }
}
