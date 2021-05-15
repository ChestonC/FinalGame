class Princess extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);


    }
    preload() {
        this.load.image('princess', './assets/testprincess.png');
    }
    update() {

        
    }

}