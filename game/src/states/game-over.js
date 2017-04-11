import Phaser from 'phaser-ce';

export default class GameOver extends Phaser.State {
    create() {
        this.add.button(
            this.game.world.centerX - 25,
            this.game.world.centerY,
            'coin',
            this.restartGame,
            this
        );
        this.add.text(
            this.game.world.centerX - 65,
            this.game.world.centerY + 50,
            'GAME OVER', {
                font: 'bold 20px sans-serif',
                fill: '#fff',
                align: 'center',
            }
        );
    }

    restartGame() {
        this.state.start('Menu');
    }
}
