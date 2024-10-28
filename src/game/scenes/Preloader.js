import { Scene } from "phaser";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {

        this.load.image('tiles', 'assets/map/tiles.png'); // Load the tileset image
        this.load.tilemapTiledJSON('map', 'assets/map/map.json'); // or 'assets/map.tmj'
        this.load.image("logo", "assets/icons/logo.png");
        this.load.image("muteIcon", "assets/icons/mute-icon.png");
        this.load.image("unmuteIcon", "assets/icons/unmute-icon.png");
        
        this.load.audio('backgroundMusic', 'assets/sounds/bgm.mp3');
        this.load.audio('wrong', 'assets/sounds/wrong.mp3');
        this.load.audio('levelUpSFX', 'assets/sounds/level-up.mp3');
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start("MainMenu");
    }
}

