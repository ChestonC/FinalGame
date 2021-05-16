class Princess extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);


    }
    preload() {
        this.load.image('princess', './assets/testprincess.png');
    }
    update() {
        if (Phaser.input.keyboard.isDown(keyLEFT))
        {
            princess.x -= 4;
        }
        else if (Phaser.input.keyboard.isDown(keyRIGHT))
        {
            princess.x += 4;
        }

        if (Phaser.input.keyboard.isDown(keyUP))
        {
            princess.y -= 4;
        }
        else if (Phaser.input.keyboard.isDown(keyDOWN))
        {
            princess.y += 4;
        }
        
    }

}