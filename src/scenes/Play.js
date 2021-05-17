class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('map1', './assets/testmap.png');
        this.load.image('stone', './assets/teststone.png');
        this.load.image('princess', './assets/testprincess.png');
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

        this.princess = new Princess(
            this,
            borderUISize + borderPadding + 315,
            game.config.height - borderUISize*10,
            'princess',
        );

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }


    update() {
        
    }

    checkCollision(princess, stone) {
        if (princess.x < stone.x + stone.width && 
            princess.x + princess.width > stone.x && 
            princess.y < stone.y + stone.height &&
            princess.height + princess.y > stone.y) {

            return true;
        } else {
            return false;
        }
    }
}