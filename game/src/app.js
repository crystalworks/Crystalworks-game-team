import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import Boot from './states/boot';
import Preload from './states/preload';
import Platformer from './states/platformer';
import Nim from './states/nim';

import config from './config';

class Game extends Phaser.Game {
    constructor () {
        const docElement = document.documentElement;
        const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
        const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

        super(width, height, Phaser.CANVAS, 'content', null);

        this.state.add('Boot', Boot, false)
        this.state.add('Preload', Preload, false)
        this.state.add('Platformer', Platformer, false)
        this.state.add('Nim', Nim, false)

        this.state.start('Boot')
    }
}

window.game = new Game()
