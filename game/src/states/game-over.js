import Phaser from 'phaser-ce';

export default class GameOver extends Phaser.State {
    preload() {
    }

    create() {
        this.add.button(
            game.world.centerX - 25,
            game.world.centerY,
            'coin',
            this.restartGame,
            this
        ); 
        this.add.text(
            game.world.centerX - 65,
            game.world.centerY + 50,
            'GAME OVER',
            {
                font: "bold 20px sans-serif",
                fill: "#fff",
                align: "center" 
            });
    }

    restartGame() {
        this.state.start('Nim');
    }
}
