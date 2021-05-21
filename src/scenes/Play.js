class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.spritesheet("spritesheet", "spritesheet.png", {
            frameWidth: 28,
            frameHeight: 28
        });
        this.load.tilemapTiledJSON("map", "floor1.json");
    }

    create() {
        this.x0 = false;
        this.y0 = false;
        this.velocity = 120;

        // loading map & layers
        const map = this.add.tilemap("map");
        const tileset = map.addTilesetImage("spritesheet", "spritesheet");
        const groundLayer = map.createLayer("Ground", tileset, 0, 0);
        const wallLayer = map.createLayer("Walls", tileset, 0, 0);
        const furnitureLayer = map.createLayer("Furniture", tileset, 0, 0);

        // walls and furniture collide
        wallLayer.setCollisionByProperty({ 
            collides: true 
        });
        furnitureLayer.setCollisionByProperty({ 
            collides: true 
        });

        // player spawn
        const playerSpawn = map.findObject("Objects", obj => obj.name === "Player Spawn");
        this.princess = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, "spritesheet", 83);

        // set player physics properties
        this.princess.body.setCollideWorldBounds(true);

        this.physics.add.collider(this.princess, wallLayer);
        this.physics.add.collider(this.princess, furnitureLayer);

        // player animations

        // idling
        this.anims.create({
            key: 'idledown',
            defaultTextureKey: 'spritesheet',
            frames: [
                { frame: 83 }
            ]
        });
        this.anims.create({
            key: 'idleright',
            defaultTextureKey: 'spritesheet',
            frames: [
                { frame: 86 }
            ]
        });
        this.anims.create({
            key: 'idleleft',
            defaultTextureKey: 'spritesheet',
            frames: [
                { frame: 89 }
            ]
        });
        this.anims.create({
            key: 'idleup',
            defaultTextureKey: 'spritesheet',
            frames: [
                { frame: 92 }
            ]
        });

        // walking
        this.anims.create({
            key: 'walkdown',
            defaultTextureKey: 'spritesheet',
            frames: [
                { frame: 84 },
                { frame: 83 },
                { frame: 85 },
                { frame: 83 }
            ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkright',
            defaultTextureKey: 'spritesheet',
            frames: [
                { frame: 87 },
                { frame: 86 },
                { frame: 88 },
                { frame: 86 }
            ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkleft',
            defaultTextureKey: 'spritesheet',
            frames: [
                { frame: 90 },
                { frame: 89 },
                { frame: 91 },
                { frame: 89 }
            ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'walkup',
            defaultTextureKey: 'spritesheet',
            frames: [
                { frame: 93 },
                { frame: 92 },
                { frame: 94 },
                { frame: 92 }
            ],
            frameRate: 10,
            repeat: -1
        });

        // init player animation
        this.princess.anims.play('idledown');

        // define keys
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
            this.princess.play('walkright', true);
            this.princess.chain('idleright');
            this.x0 = false;
        } else if(this.cursors.left.isDown) {
            this.princess.setVelocityX(-this.velocity);
            this.princess.play('walkleft', true);
            this.princess.chain('idleleft');
            this.x0 = false;
        } else {
            this.princess.body.velocity.x = 0;
            this.x0 = true;
        }
        if(this.cursors.down.isDown) {
            this.princess.setVelocityY(this.velocity);
            this.princess.play('walkdown', true);
            this.princess.chain('idledown');
            this.y0 = false;
        } else if(this.cursors.up.isDown) {
            this.princess.setVelocityY(-this.velocity);
            this.princess.play('walkup', true);
            this.princess.chain('idleup');
            this.y0 = false;
        } else {
            this.princess.body.velocity.y = 0;
            this.y0 = true;
        }
        if(this.x0 && this.y0) {
            this.princess.stop();
        }

        //sets camera to follow player
        this.cameras.main.setBounds(0, 0, 640, 480);
        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.princess);

        // temporary: makes stone invisible on contact
        // if(this.checkCollision(this.princess, this.stone)){
        //     this.stone.alpha = 0;
        //     this.sound.play('collect');
        // }
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