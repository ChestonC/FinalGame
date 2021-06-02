class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    create() {
        console.log("I exist!"); // why isn't create() firing?????
        
        this.play("enwalkdown");
    }

    update() {
        this.x -= 1; // when this finally makes it move then the enemy spawning works
    }

}