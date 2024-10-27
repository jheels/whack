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

        // Add a sprite and enable movement
        this.player = this.physics.add.sprite(100, 100, 'sprite');
        this.cursors = this.input.keyboard.createCursorKeys();

        
    
        // Add a sprite and enable movement
    }


    update() {
        // Handle player movement
    }
}