class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.spritesheet("spritesheet", "castle_sheet.png", {
            frameWidth: 28,
            frameHeight: 28,
            margin: 1,
            spacing: 2
        });
        this.load.tilemapTiledJSON("map", "floor1.json");
    }

    create() {
        this.x0 = false;
        this.y0 = false;
        this.velocity = 120;

        // loading map & layers
        const map = this.add.tilemap("map");
        const tileset = map.addTilesetImage("castle_sheet", "spritesheet");
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

        // generate stones from map
        this.stones = map.createFromObjects("Objects", {
            name: "stone",
            key: "spritesheet",
            frame: 95
        });

        // attach physics to the stones
        this.physics.world.enable(this.stones, Phaser.Physics.Arcade.STATIC_BODY);
        this.stones.map((stone) => {
            stone.body.setCircle(4).setOffset(4,4);
        });
        this.stoneGroup = this.add.group(this.stones);

        // player spawn
        const playerSpawn = map.findObject("Objects", obj => obj.name === "Player Spawn");
        this.princess = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, "spritesheet", 83);

        // set player physics properties
        this.princess.body.setCollideWorldBounds(true);

        // player animations

        // idling
        // this.anims.create({
        //     key: 'idledown',
        //     defaultTextureKey: 'spritesheet',
        //     frames: [
        //         { frame: 83 }
        //     ]
        // });
        // this.anims.create({
        //     key: 'idleright',
        //     defaultTextureKey: 'spritesheet',
        //     frames: [
        //         { frame: 86 }
        //     ]
        // });
        // this.anims.create({
        //     key: 'idleleft',
        //     defaultTextureKey: 'spritesheet',
        //     frames: [
        //         { frame: 89 }
        //     ]
        // });
        // this.anims.create({
        //     key: 'idleup',
        //     defaultTextureKey: 'spritesheet',
        //     frames: [
        //         { frame: 92 }
        //     ]
        // });

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

        // define world limit
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        
        this.physics.add.collider(this.princess, wallLayer);
        this.physics.add.collider(this.princess, furnitureLayer);

        // remove stone when the player is on it AND they press shift.
        this.physics.add.overlap(this.princess, this.stoneGroup, (obj1, obj2) => {
            if(this.cursors.shift.isDown) {
                obj2.destroy();
                this.sound.play('collect');
            }
        })

        // define keys
        this.cursors= this.input.keyboard.createCursorKeys();

        //sets camera to follow player
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.princess);
        // this.cameras.main.setDeadzone(50, 50); // camera deadzone. might be cool?
    }

    update() {

        // Movement for princess
        if(this.cursors.right.isDown) {
            this.princess.setVelocityX(this.velocity);
            this.princess.play('walkright', true);
            this.x0 = false;
        } else if(this.cursors.left.isDown) {
            this.princess.setVelocityX(-this.velocity);
            this.princess.play('walkleft', true);
            this.x0 = false;
        } else {
            this.princess.body.velocity.x = 0;
            this.x0 = true;
        }
        if(this.cursors.down.isDown) {
            this.princess.setVelocityY(this.velocity);
            this.princess.play('walkdown', true);
            this.y0 = false;
        } else if(this.cursors.up.isDown) {
            this.princess.setVelocityY(-this.velocity);
            this.princess.play('walkup', true);
            this.y0 = false;
        } else {
            this.princess.body.velocity.y = 0;
            this.y0 = true;
        }
        if(this.x0 && this.y0) {
            this.princess.stop();
        }
    }
}