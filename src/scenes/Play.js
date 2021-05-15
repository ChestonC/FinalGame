class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('map1', './assets/testmap.png');
    }

    create() {
        //this.map1 = new Map(
        //    this,
        //    borderUISize + borderPadding,
        //    game.config.height - borderUISize,
        //    'map1',
        //);
        this.map1 = this.add.tileSprite(
            320,
            game.config.height,
            640,
            960,
            'map1'
        );
    }

}