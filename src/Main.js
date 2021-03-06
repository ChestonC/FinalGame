/*
Game made bu Tony Alegria, Cheston Chen, Israel Renteria, and Justin Juang
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    backgroundColor: '#595959',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0,
            }
        }
    },
    scene: [Menu, Play, Playmap2]
    
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//define keys
let keyLEFT;
let keyRIGHT;
let keyUP;
let keyDOWN;
let keySPACE;
let keyD;
let keyS;
