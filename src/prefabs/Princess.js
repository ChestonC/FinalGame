class Princess extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        xSpeed = 0;
        ySpeed = 0;
    }
    preload() {
        this.load.image('princess', './assets/testprincess.png');
    }
    update() {
        
    }

}