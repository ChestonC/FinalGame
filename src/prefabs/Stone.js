class Stone extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);


    }
    preload() {
        this.load.image('stone', './assets/teststone.png');
    }
    update() {

    }

}