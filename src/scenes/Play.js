class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('map1', './assets/testmap.png');
        this.load.image('stone', './assets/teststone.png');
        this.load.image('princessFront', './assets/PrincessFront.png');
    }

    create() {
        this.velocity= 200;

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

        this.princess= this.physics.add.sprite(borderUISize + borderPadding + 315, game.config.height - borderUISize*10, 'princessFront',);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors= this.input.keyboard.createCursorKeys();
    }

    update() {
        // Movement for princess

        if(this.cursors.right.isDown) {
            this.princess.setVelocityX(this.velocity);
        } else if(this.cursors.left.isDown) {
            this.princess.setVelocityX(-this.velocity);
        } else {
            this.princess.body.velocity.x= 0;
        }

        if(this.cursors.down.isDown) {
            this.princess.setVelocityY(this.velocity);
        } else if(this.cursors.up.isDown) {
            this.princess.setVelocityY(-this.velocity);
        } else {
            this.princess.body.velocity.y= 0;
        }

        //sets camera to follow player
        this.cameras.main.setBounds(0, 0, 640, 480);
        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.princess);

        // temporary: makes stone invisible on contact
        if(this.checkCollision(this.princess, this.stone)){
            this.stone.alpha= 0;
            this.sound.play('collect');
        }
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