import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/boot';
import PreloadState from './states/preload';
import GameState from './states/game';

import config from './config';

class Game extends Phaser.Game {
    constructor () {
        const docElement = document.documentElement;
        const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
        const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

        super(width, height, Phaser.CANVAS, 'content', null);

        this.state.add('boot', BootState, false)
        this.state.add('game', PreloadState, false)
        this.state.add('game', GameState, false)

        this.state.start('boot')
    }
}

window.game = new Game()
