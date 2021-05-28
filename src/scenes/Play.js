class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //this.load.audio('menubgm', './assets/Final_Game_BGM_Menu.mp3')
        //this.load.audio('bgm', './assets/Final_Game_BGM.mp3')
        this.load.tilemapTiledJSON('tilemap', './assets/tilemap1.json');
        this.load.spritesheet("tileset", "./assets/tiles.png", {
            frameWidth: 28,
            frameHeight: 28,
            margin: 1,
            spacing: 2
        });
        
    }

    create() {
        let music = this.sound.add('bgm', {
            mute: false,
            volume: .3,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        music.play();


        this.velocity= 200;

        const map = this.add.tilemap("tilemap");
        const tileset = map.addTilesetImage("Tileset", "tileset");
        const groundLayer = map.createLayer("Ground", tileset, 0, 0);
        const wallLayer = map.createLayer("Walls", tileset, 0, 0);
        groundLayer.setCollisionByProperty({ 
            collides: false 
        });
        wallLayer.setCollisionByProperty({ 
            collides: true 
        });

        // player spawn
        const playerSpawn = map.findObject("Objects", obj => obj.name === "Spawn");
        this.princess = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, "tileset", 83);

        this.physics.add.collider(this.princess, wallLayer);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
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

        //Stone Drop
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.stone= this.physics.add.sprite( this.princess.x, this.princess.y, "tileset", 95);
        }

        //Attack animation
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            this.dagger= this.physics.add.sprite( this.princess.x, this.princess.y+20, "tileset", 96);
        }

        //sets camera to follow player
        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.princess);
    } 
}