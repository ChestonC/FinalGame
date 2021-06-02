class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
    }

    preload() {
        
        this.load.spritesheet("tileset", "./assets/tiles.png", {
            frameWidth: 28,
            frameHeight: 28,
            margin: 1,
            spacing: 2
        });
    }

    create() {
        
        // Enemy Animations
        this.anims.create({ key: 'enwalkdown', defaultTextureKey: 'tileset', frames: [ { frame: 98 }, { frame: 97 }, { frame: 99 }, { frame: 97 } ], framerate: 5, repeat: -1 });
        this.anims.create({ key: 'enwalkleft', defaultTextureKey: 'tileset', frames: [ { frame: 101 }, { frame: 100 } ], framerate: 5, repeat: -1 });
        this.anims.create({ key: 'enwalkright', defaultTextureKey: 'tileset', frames: [ { frame: 103 }, { frame: 102 } ], framerate: 5, repeat: -1 });
        this.anims.create({ key: 'enwalkup', defaultTextureKey: 'tileset', frames: [ { frame: 105 }, { frame: 104 }, { frame: 106 }, { frame: 104 } ], framerate: 5, repeat: -1 });
        this.anims.play("enwalkdown");
    }

    update() {
        this.x += 1;
    }

}