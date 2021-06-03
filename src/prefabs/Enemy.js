class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.velocity = 60;
        this.direction = 3;
    }

    update() {
        this.move();
    }

    move() {
        if(this.direction == 0) {
            this.setVelocityX(0);
            this.setVelocityY(-this.velocity);
            this.play('enwalkup', true);
        } else if(this.direction == 1) {
            this.setVelocityX(this.velocity);
            this.setVelocityY(0);
            this.play('enwalkright', true);
        } else if(this.direction == 2) {
            this.setVelocityX(0);
            this.setVelocityY(this.velocity);
            this.play('enwalkdown', true);
        } else {
            this.setVelocityX(-this.velocity);
            this.setVelocityY(0);
            this.play('enwalkleft', true);
        }
    }
}