export default class Platformer extends Phaser.State {
    init(levelData) {
        this.levelData = levelData;

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // start physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 1000;

        // create map and set tileset
        this.map = this.add.tilemap(levelData.map.key);
        this.map.addTilesetImage(
            this.map.tilesets[0].name,
            levelData.map.tileset
        );
    }

    create() {}
}
