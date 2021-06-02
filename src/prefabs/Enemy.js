class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    create() {
        console.log("I exist!"); // why isn't create() firing?????
        
        // Enemy Animations
        this.anims.create({ key: "enwalkdown", defaultTextureKey: 'tileset', frames: [ { frame: 98 }, { frame: 97 }, { frame: 99 }, { frame: 97 } ], framerate: 5, repeat: -1 });
        this.anims.create({ key: "enwalkleft", defaultTextureKey: 'tileset', frames: [ { frame: 101 }, { frame: 100 } ], framerate: 5, repeat: -1 });
        this.anims.create({ key: "enwalkright", defaultTextureKey: 'tileset', frames: [ { frame: 103 }, { frame: 102 } ], framerate: 5, repeat: -1 });
        this.anims.create({ key: "enwalkup", defaultTextureKey: 'tileset', frames: [ { frame: 105 }, { frame: 104 }, { frame: 106 }, { frame: 104 } ], framerate: 5, repeat: -1 });
        this.play("enwalkdown");
    }

    update() {
        this.x -= 1; // when this finally makes it move then the enemy spawning works
    }

}