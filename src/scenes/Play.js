class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('map1', './assets/testmap.png');
    }

    create() {
        this.map1 = new Map(
            this,
            borderUISize + borderPadding,
            game.config.height - borderUISize*2,
            'map1',
        );
    }

}