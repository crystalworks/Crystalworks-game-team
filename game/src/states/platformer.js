export default class Platformer extends Phaser.State {
    init() {
        // start physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 1000;
    }
    
    create() {
        // create map and set tileset
        this.map = this.add.tilemap('platformer-tilemap');
        this.map.addTilesetImage(
            'tiles-spritesheet',
            'tiles-spritesheet'
        );
        
        this.layer = this.map.createLayer('collision');
        this.layer.resizeWorld();
    }
}
