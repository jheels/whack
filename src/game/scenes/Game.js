import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    preload() {
        // Load the TMX/TMJ file and tileset images
        
        this.load.image('tiles', 'assets/tiles.png'); // Load the tileset image
        this.load.tilemapTiledJSON('map', 'assets/map.json'); // or 'assets/map.tmj'
    }

    create() {
        // Create the tile map and layers
        
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

        // Add a sprite and enable movement
        this.player = this.physics.add.sprite(100, 100, 'sprite');
        this.cursors = this.input.keyboard.createCursorKeys();

        
    
        // Add a sprite and enable movement
    }


    update() {
        // Handle player movement
    }
}