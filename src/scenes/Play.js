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
        this.princess = new Princess(this, playerSpawn.x, playerSpawn.y, "tileset", 83);
        this.physics.add.collider(this.princess, wallLayer);
        
        this.enemy10 = new Enemy(this, playerSpawn.x + 56, playerSpawn.y, "tileset", 97); // test boi for easy viewing
        // new Enemy(1160, 1634, "tileset", 97);
        // new Enemy(768, 1464, "tileset", 97);
        // new Enemy(377, 873, "tileset", 97);
        // new Enemy(1215, 627, "tileset", 97);
        // new Enemy(2030, 903, "tileset", 97);
        // new Enemy(740, 2102, "tileset", 97);
        // new Enemy(1918, 1936, "tileset", 97);
        // new Enemy(1413, 2497, "tileset", 97);
        // new Enemy(2142, 2134, "tileset", 97);
        // new Enemy(2254, 2556, "tileset", 97);

        // Generate stones from map
        this.stones = map.createFromObjects("Objects", {
            name: "Stone",
            key: "tileset",
            frame: 95
        });
        this.physics.world
        document.getElementById("stoneDisplay").innerHTML = "Stones: " + this.princess.stoneBag;

        // attach physics to the stones
        this.physics.world.enable(this.stones, Phaser.Physics.Arcade.STATIC_BODY);
        this.stones.map((stone) => {
            stone.body.setCircle(4).setOffset(4,4);
        });
        this.stoneGroup = this.add.group(this.stones);

        // apply pickup and drop mechanics to stones generated from map
        this.physics.add.overlap(this.princess, this.stoneGroup, (obj1, obj2) => {
            if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
                obj2.destroy();
                this.sound.play('collect');
                this.princess.stoneBag += 1;
                document.getElementById("stoneDisplay").innerHTML = "Stones: " + this.princess.stoneBag;
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
        
        // Enemy Animations
        this.anims.create({ key: 'enwalkdown', defaultTextureKey: 'tileset', frames: [ { frame: 98 }, { frame: 97 }, { frame: 99 }, { frame: 97 } ], frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'enwalkleft', defaultTextureKey: 'tileset', frames: [ { frame: 101 }, { frame: 100 } ], frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'enwalkright', defaultTextureKey: 'tileset', frames: [ { frame: 103 }, { frame: 102 } ], frameRate: 4, repeat: -1 });
        this.anims.create({ key: 'enwalkup', defaultTextureKey: 'tileset', frames: [ { frame: 105 }, { frame: 104 }, { frame: 106 }, { frame: 104 } ], frameRate: 4, repeat: -1 });
    }

    update() {
        this.princess.update();
        this.enemy10.update();

        //sets camera to follow player
        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.princess);
    } 
}