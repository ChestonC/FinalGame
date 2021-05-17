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

     /*   this.princess = new Princess(
            this,
            borderUISize + borderPadding + 315,
            game.config.height - borderUISize*10,
            'princess',
        ); */
        this.princess= this.physics.add.sprite(borderUISize + borderPadding + 315, game.config.height - borderUISize*10, 'princess',);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursors= this.input.keyboard.createCursorKeys();
    }

    update() {
        if(this.cursors.left.isDown) {
            this.princess.setVelocityX(-this.velocity);
        } else if(this.cursors.right.isDown) {
            this.princess.setVelocityX(this.velocity);
        } else if (this.cursors.up.isDown) {
            this.princess.setVelocityY(-this.velocity);
        } else if(this.cursors.down.isDown) {
            this.princess.setVelocityY(this.velocity);
        } else {
            this.princess.body.velocity.x= 0;
            this.princess.body.velocity.y= 0;
        }

       // this.princess.update();
        
    }
}