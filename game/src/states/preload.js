export default class Preload extends Phaser.State {
    init(levelData) {
        this.levelData = levelData;
    }

    preload() {
        this.loaderBg = this.add.sprite(
            this.game.world.centerX, 
            this.game.world.centerY, 
            'loaderBg'
        );
        this.loaderBar = this.add.sprite(
            this.game.world.centerX, 
            this.game.world.centerY, 
            'loaderBar'
        );
        this.loaderBg.anchor.setTo(0.5);
        this.loaderBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.loaderBar);

        this.load.image('coin', 'assets/images/coin.png');
        this.load.image('coin-selected', 'assets/images/coin-selected.png');
        this.load.image('hand', 'assets/images/hand-no-active.png');
        this.load.image('hand-active', 'assets/images/hand-active.png');
        this.load.image('nim-background', 'assets/images/nim-background.svg');

        const assets = this.levelData.assets;

        for (let assetKey in assets) {
            if (assets.hasOwnProperty(assetKey)) {
                let asset = assets[assetKey];

                switch (asset.type) {
                    case 'image': {
                        this.load.image(assetKey, asset.source);
                        break;
                    }
                    case 'tilemap': {
                        this.load.tilemap(
                            assetKey, 
                            asset.source, 
                            null, 
                            Phaser.Tilemap.TILED_JSON
                        );
                        break;
                    }
                } 
            }
        }
    }

    create() {
        this.state.start('Nim');
    }
}
