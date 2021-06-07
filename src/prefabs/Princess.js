class Princess extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.stabbing = false;
        this.x0 = false;
        this.y0 = false;
        this.xDirection = 0;
        this.yDirection = 10;
        this.stabTimer = scene.time.delayedCall(500, () => {}, null, this);
        this.stabbing = false;
        this.velocity = 120;
        this.stoneBag = 0;
        this.setDepth(1);
    }

    update() {
    
        if(!this.stabbing) {
            this.move();
        }
        if (Phaser.Input.Keyboard.JustDown(keyS)) {
            this.attack();
        }
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.stoneDrop();
        }
    }

    // Movement
    move() {
        if(keyRIGHT.isDown) {
            this.setVelocityX(this.velocity);
            if(this.y0) {
                this.play('walkright', true);
                this.xDirection = 10;
                this.yDirection = 0;
            }
            this.x0 = false;
        } else if(keyLEFT.isDown) {
            this.setVelocityX(-this.velocity);
            if(this.y0) {
                this.play('walkleft', true);
                this.xDirection = -10;
                this.yDirection = 0;
            }
            this.x0 = false;
        } else {
            this.body.velocity.x = 0;
            this.x0 = true;
        }
        if(keyDOWN.isDown) {
            this.setVelocityY(this.velocity);
            if(this.x0) {
                this.play('walkdown', true);
                this.xDirection = 0;
                this.yDirection = 10;
            }
            this.y0 = false;
        } else if(keyUP.isDown) {
            this.setVelocityY(-this.velocity);
            if(this.x0) {
                this.play('walkup', true);
                this.xDirection = 0;
                this.yDirection = -10;
            }
            this.y0 = false;
        } else {
            this.body.velocity.y = 0;
            this.y0 = true;
        }
        if(this.x0 && this.y0) {
            this.stop();
        }
    }

    // Attack animation
    attack() {
        if(this.stabTimer.elapsed == 500) {
            this.stabbing = true;
            this.disableBody();
            this.dagger = this.scene.physics.add.sprite(this.x+this.xDirection, this.y+this.yDirection, "tileset", 96);
            if(this.xDirection == 10) {
                this.dagger.setRotation(Math.PI/2);
                this.play('idleright', true,);
            } else if(this.xDirection == -10) {
                this.dagger.setRotation(-Math.PI/2);
                this.play('idleleft', true,);
            } else if(this.yDirection == 10) {
                this.dagger.setRotation(Math.PI);
                this.play('idledown', true,);
                this.dagger.setDepth(2);
            } else if(this.yDirection == -10) {
                this.dagger.setRotation(0);
                this.play('idleup', true,);
            }
            this.stabTimer = this.scene.time.delayedCall(200, () => {
                this.dagger.destroy();
                this.velocity = 120;
                this.enableBody();
                this.stabbing = false;
                this.dagger.setDepth(0);
            }, null, this);
            this.stabTimer = this.scene.time.delayedCall(500, () => {}, null, this);
        }
    }

    // Stone Drop/Pickup
    stoneDrop() {
        if(this.stoneBag >= 1) {
            this.scene.stone = this.scene.physics.add.sprite( this.x, this.y, "tileset", 95);
            this.scene.physics.add.overlap(this, this.scene.stone, (obj1, obj2) => {
                if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    obj2.destroy();
                    this.scene.sound.play('collect');
                    this.stoneBag += 1;
                    document.getElementById("stoneDisplay").innerHTML = "Stones: " + this.stoneBag;
                }
            });
            this.stoneBag -= 1;
            document.getElementById("stoneDisplay").innerHTML = "Stones: " + this.stoneBag;
        }
    }
}