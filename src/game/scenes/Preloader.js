import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');
        
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.add.image(0, 0, 'tiles')
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tiles', 'tiles');
        const scaleX = this.scale.width / map.widthInPixels;
        const scaleY = this.scale.height / map.heightInPixels;

        const groundLayer = map.createLayer('Tile Layer 1', tileset);
        groundLayer.setScale(scaleX, scaleY);

        const foregroundLayer = map.createLayer('Tile Layer 2', tileset);
        foregroundLayer.setScale(scaleX, scaleY);

        const backupLayer = map.createLayer('Tile Layer 3', tileset);
        backupLayer.setScale(scaleX, scaleY);

        const extraLayer = map.createLayer('Tile Layer 4', tileset);
        extraLayer.setScale(scaleX, scaleY);

        this.scene.start('MainMenu');
    }
}
