class Menu extends Phaser.Scene {
    constructor() {
        super("menuscene");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.audio('collect', 'testcollect.mp3');
        this.load.audio('menu', 'Final_Game_BGM_Menu.mp3')
        this.load.audio('bgm', 'Final_Game_BGM.mp3')
    }
    
    create() {

        //menu music
        let munumusic = this.sound.add('menu', {
            mute: false,
            volume: .3,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        munumusic.play();

        // menu text config
        let titleConfig = {
            fontFamily: 'fantasy',
            fontSize: '40px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let menuConfig = {
            fontFamily: 'fantasy',
            fontSize: '30px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(borderUISize + borderPadding + 150, borderUISize + borderPadding, 'Castle Crawler', titleConfig);

        this.add.text(borderUISize + borderPadding + 130, borderUISize + borderPadding + 350, 'Press [SPACE] to Start', menuConfig);

        this.add.text(borderUISize + borderPadding - 20, borderUISize + borderPadding + 100, '- Use arrow keys to move', menuConfig);

        this.add.text(borderUISize + borderPadding - 20, borderUISize + borderPadding + 150, '- D to drop Stones, S to attack', menuConfig);

        this.add.text(borderUISize + borderPadding - 20, borderUISize + borderPadding + 200, '- Try to escape each maze', menuConfig);

        this.add.text(borderUISize + borderPadding - 20, borderUISize + borderPadding + 250, '- Avoid enemies on the way', menuConfig);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene')
            //stop menu music when enter the game
            this.sound.stopAll();

        }
    }

    
}