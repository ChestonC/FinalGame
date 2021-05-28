class Menu extends Phaser.Scene {
    constructor() {
        super("menuscene");
    }


    preload() {
        this.load.audio('collect', './assets/testcollect.mp3');
        this.load.audio('menu', './assets/Final_Game_BGM_Menu.mp3')
        this.load.audio('bgm', './assets/Final_Game_BGM.mp3')
    }
    
    create() {
        // menu text config
        let titleConfig = {
            fontFamily: 'monospace',
            fontSize: '36px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let menuConfig = {
            fontFamily: 'monospace',
            fontSize: '26px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(borderUISize + borderPadding + 150, borderUISize + borderPadding, 'Castle Crawler', titleConfig);

        this.add.text(borderUISize + borderPadding + 130, borderUISize + borderPadding + 350, 'Press [SPACE] to Start', menuConfig);

        this.add.text(borderUISize + borderPadding - 20, borderUISize + borderPadding + 100, 'Use arrow keys to move', menuConfig);

        this.add.text(borderUISize + borderPadding - 20, borderUISize + borderPadding + 150, 'D to drop Stones', menuConfig);

        this.add.text(borderUISize + borderPadding - 20, borderUISize + borderPadding + 200, 'Try to escape each maze', menuConfig);

        this.add.text(borderUISize + borderPadding - 20, borderUISize + borderPadding + 250, 'Avoid enemies on the way', menuConfig);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene')
        }
    }

    
}