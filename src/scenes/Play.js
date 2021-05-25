class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('map1', './assets/testmap.png');
        this.load.image('stone', './assets/teststone.png');
        this.load.image('princessFront', './assets/PrincessFront.png');
        this.load.tilemapTiledJSON('tilemap', './assets/tilemap1.json');
        this.load.spritesheet("tileset", "./assets/tiles.png", {
            frameWidth: 28,
            frameHeight: 28,
            margin: 1,
            spacing: 2
        });
        
    }

    create() {
        this.velocity= 200;


        const map = this.add.tilemap("tilemap");
        const tileset = map.addTilesetImage("Tileset", "tileset");
        // const tileset2 = map.addTilesetImage("Wall", "wall");
        // const tileset3 = map.addTilesetImage("WallFloral", "wallfloral");
        // const tileset4 = map.addTilesetImage("Window", "window");
        const groundLayer = map.createLayer("Tile Layer", tileset, 0, 0);
        const secondLayer = map.createLayer("Tile Layer 2", tileset, 0, 0);
        groundLayer.setCollisionByProperty({ 
            collides: true 
        });
        secondLayer.setCollisionByProperty({ 
            collides: true 
        });

        // player spawn
        const playerSpawn = map.findObject("Object Layer", obj => obj.name === "Spawn");
        this.princess = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, "tileset", 83);

        this.stone = new Stone(
            this,
            borderUISize + borderPadding + 450,
            game.config.height - borderUISize*4.6,
            'stone',
        );

        // this.princess= this.physics.add.sprite(borderUISize + borderPadding + 315, game.config.height - borderUISize*10, 'princessFront',);

        this.physics.add.collider(this.princess, groundLayer);
        


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