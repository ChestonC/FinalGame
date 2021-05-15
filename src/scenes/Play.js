class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('map1', './assets/testmap.png');
        this.load.image('stone', './assets/teststone.png');
    }

    create() {
        this.map1 = this.add.tileSprite(
            320,
            game.config.height,
            640,
            960,
            'map1'
        );

        this.stone = new Stone(
            this,
            borderUISize + borderPadding + 450,
            game.config.height - borderUISize*4.6,
            'stone',
        );
    }

}