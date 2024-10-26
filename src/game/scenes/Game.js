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
        
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tiles', 'tiles');
        const scaleX = this.scale.width / map.widthInPixels;
        const scaleY = this.scale.height / map.heightInPixels;
        const scale = Math.min(scaleX, scaleY);

        const groundLayer = map.createLayer('Tile Layer 1', tileset);
        groundLayer.setScale(scaleX, scaleY);

        const foregroundLayer = map.createLayer('Tile Layer 2', tileset);
        foregroundLayer.setScale(scaleX, scaleY);

        const backupLayer = map.createLayer('Tile Layer 3', tileset);
        backupLayer.setScale(scaleX, scaleY);

        const extraLayer = map.createLayer('Tile Layer 4', tileset);
        extraLayer.setScale(scaleX, scaleY);

        // Add a sprite and enable movement
        const graphics = this.add.graphics();
        graphics.fillStyle(0xff0000, 1); // Red color
        graphics.fillRect(0, 0, 20, 40); 
        graphics.generateTexture('rectangle', 50, 100);
        graphics.destroy(); // Clean up the graphics object
    
        this.player = this.physics.add.sprite(100, 550, 'rectangle');
        this.cursors = this.input.keyboard.createCursorKeys();
    
        // Set up the camera to follow the player
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(); // Adjust the zoom level as needed
    
        this.cameras.main.setBounds(0, 0, map.widthInPixels * scaleX, map.heightInPixels * scaleY);
        // Add a sprite and enable movement
    }


    update() {
        // Handle player movement
        this.player.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(160);
        }

        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(160);
        }
        this.cameras.main.setZoom(1.5); // Adjust the zoom level as needed

    }
}