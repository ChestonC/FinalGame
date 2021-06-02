class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //this.load.audio('menubgm', './assets/Final_Game_BGM_Menu.mp3')
        //this.load.audio('bgm', './assets/Final_Game_BGM.mp3')
        this.load.path = "./assets/";
        this.load.tilemapTiledJSON('tilemap', 'tilemap1.json');
        this.load.spritesheet("tileset", "tiles.png", {
            frameWidth: 28,
            frameHeight: 28,
            margin: 1,
            spacing: 2
        });
    }

    create() {
        //bgm added
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
        this.x0 = false;
        this.y0 = false;
        this.xDirection = 0;
        this.yDirection = 10;
        this.stabTimer = this.time.delayedCall(500, () => {}, null, this);
        this.stabbing = false;
        this.velocity= 120;
        this.stoneBag = 0;
        document.getElementById("stoneDisplay").innerHTML = "Stones: " + this.stoneBag;

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
        this.princess.setDepth(1);
        this.physics.add.collider(this.princess, wallLayer);
        
        // Generate enemies
        const enemies = this.physics.add.group({
            classType: Enemy
        });
        //enemies.get(playerSpawn.x + 56, playerSpawn.y, "tileset", 97); // test boi for easy viewing
        enemies.get(1160, 1634, "tileset", 97);
        enemies.get(768, 1464, "tileset", 97);
        enemies.get(377, 873, "tileset", 97);
        enemies.get(1215, 627, "tileset", 97);
        enemies.get(2030, 903, "tileset", 97);
        enemies.get(740, 2102, "tileset", 97);
        enemies.get(1918, 1936, "tileset", 97);
        enemies.get(1413, 2497, "tileset", 97);
        enemies.get(2142, 2134, "tileset", 97);
        enemies.get(2254, 2556, "tileset", 97);

        // Generate stones from map
        this.stones = map.createFromObjects("Objects", {
            name: "Stone",
            key: "tileset",
            frame: 95
        });
        this.physics.world

        // attach physics to the stones
        this.physics.world.enable(this.stones, Phaser.Physics.Arcade.STATIC_BODY);
        this.stones.map((stone) => {
            stone.body.setCircle(4).setOffset(4,4);
        });
        this.stoneGroup = this.add.group(this.stones);

        // remove stone when the player is on it AND presses space
        this.physics.add.overlap(this.princess, this.stoneGroup, (obj1, obj2) => {
            if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
                obj2.destroy();
                this.sound.play('collect');
                this.stoneBag += 1;
                document.getElementById("stoneDisplay").innerHTML = "Stones: " + this.stoneBag;
            }
        });

        this.night = this.add.rectangle(0, 0, 10000, 10000, 0x000022, 0.7);
        this.night.setDepth(5);
        
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // player animations
        this.anims.create({ key: 'idledown', defaultTextureKey: 'tileset', frames: [ { frame: 83 } ], repeat: -1 });
        this.anims.create({ key: 'idleright', defaultTextureKey: 'tileset', frames: [ { frame: 86 } ], repeat: -1 });
        this.anims.create({ key: 'idleleft', defaultTextureKey: 'tileset', frames: [ { frame: 89 } ], repeat: -1 });
        this.anims.create({ key: 'idleup', defaultTextureKey: 'tileset', frames: [ { frame: 92 } ], repeat: -1 });
        this.anims.create({ key: 'walkdown', defaultTextureKey: 'tileset', frames: [ { frame: 84 }, { frame: 83 }, { frame: 85 }, { frame: 83 } ], frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'walkright', defaultTextureKey: 'tileset', frames: [ { frame: 87 }, { frame: 86 }, { frame: 88 }, { frame: 86 } ], frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'walkleft', defaultTextureKey: 'tileset', frames: [ { frame: 90 }, { frame: 89 }, { frame: 91 }, { frame: 89 } ], frameRate: 7, repeat: -1 });
        this.anims.create({ key: 'walkup', defaultTextureKey: 'tileset', frames: [ { frame: 93 }, { frame: 92 }, { frame: 94 }, { frame: 92 } ], frameRate: 7, repeat: -1 });
    }

    update() {

        // Movement for princess
        if(!this.stabbing) {
            if(keyRIGHT.isDown) {
                this.princess.setVelocityX(this.velocity);
                if(this.y0) {
                    this.princess.play('walkright', true);
                    this.xDirection = 10;
                    this.yDirection = 0;
                }
                this.x0 = false;
            } else if(keyLEFT.isDown) {
                this.princess.setVelocityX(-this.velocity);
                if(this.y0) {
                    this.princess.play('walkleft', true);
                    this.xDirection = -10;
                    this.yDirection = 0;
                }
                this.x0 = false;
            } else {
                this.princess.body.velocity.x = 0;
                this.x0 = true;
            }
            if(keyDOWN.isDown) {
                this.princess.setVelocityY(this.velocity);
                if(this.x0) {
                    this.princess.play('walkdown', true);
                    this.xDirection = 0;
                    this.yDirection = 10;
                }
                this.y0 = false;
            } else if(keyUP.isDown) {
                this.princess.setVelocityY(-this.velocity);
                if(this.x0) {
                    this.princess.play('walkup', true);
                    this.xDirection = 0;
                    this.yDirection = -10;
                }
                this.y0 = false;
            } else {
                this.princess.body.velocity.y = 0;
                this.y0 = true;
            }
            if(this.x0 && this.y0) {
                this.princess.stop();
            }
        }

        //Stone Drop
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            if(this.stoneBag >= 1) {
                this.stone = this.physics.add.sprite( this.princess.x, this.princess.y, "tileset", 95);
                this.physics.add.overlap(this.princess, this.stone, (obj1, obj2) => {
                    if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
                        obj2.destroy();
                        this.sound.play('collect');
                        this.stoneBag += 1;
                        document.getElementById("stoneDisplay").innerHTML = "Stones: " + this.stoneBag;
                    }
                });
                this.stoneBag -= 1;
                document.getElementById("stoneDisplay").innerHTML = "Stones: " + this.stoneBag;
            }
        }

        //Attack animation
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            if(this.stabTimer.elapsed == 500) {
                this.stabbing = true;
                this.princess.disableBody();
                this.dagger= this.physics.add.sprite(this.princess.x+this.xDirection, this.princess.y+this.yDirection, "tileset", 96);
                if(this.xDirection == 10) {
                    this.dagger.setRotation(Math.PI/2);
                    this.princess.play('idleright', true,);
                } else if(this.xDirection == -10) {
                    this.dagger.setRotation(-Math.PI/2);
                    this.princess.play('idleleft', true,);
                } else if(this.yDirection == 10) {
                    this.dagger.setRotation(Math.PI);
                    this.princess.play('idledown', true,);
                    this.dagger.setDepth(2);
                } else if(this.yDirection == -10) {
                    this.dagger.setRotation(0);
                    this.princess.play('idleup', true,);
                }
                this.stabTimer = this.time.delayedCall(200, () => {
                    this.dagger.destroy();
                    this.velocity = 120;
                    this.princess.enableBody();
                    this.stabbing = false;
                    this.dagger.setDepth(0);
                }, null, this);
                this.stabTimer = this.time.delayedCall(500, () => {}, null, this);
            }
        }

        //sets camera to follow player
        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.princess);
    } 
}