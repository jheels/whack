import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('muteIcon', 'assets/mute-icon.png'); 
        this.load.image('unmuteIcon', 'assets/unmute-icon.png');

        this.load.image('tiles', 'assets/tiles.png'); // Load the tileset image
        this.load.tilemapTiledJSON('map', 'assets/map.json'); // or 'assets/map.tmj'
        this.load.audio('backgroundMusic', 'assets/bgm.mp3'); // Adjust the path and file name
        this.load.audio('levelUpSFX', 'assets/level-up.mp3');
        this.load.audio('wrong', 'assets/wrong.mp3');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
