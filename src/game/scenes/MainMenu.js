import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    logoTween;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
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


        this.logo = this.add.image(x, y, 'logo').setDepth(100);
        
        var graphics = this.add.graphics();

        // Set a fill color (RGBA format, with alpha for transparency)
        graphics.fillStyle(0x000000, 0.8); // Black with 50% transparency
    
        // Calculate the box dimensions
        var boxWidth = 900;
        var boxHeight = 600;
        var x = (this.cameras.main.width / 2) - (boxWidth / 2);  // Center X
        var y = (this.cameras.main.height / 2) - (boxHeight / 2); // Center Y
    
        // Draw the rectangle (overlay box)
        graphics.fillRect(x, y, boxWidth, boxHeight);
    
        // Optionally, add a border or outline
        graphics.lineStyle(4, 0xffffff); // White border
        graphics.strokeRect(x, y, boxWidth, boxHeight);

        var buttonText = this.add.text(
            this.cameras.main.width / 2, // Center X
            y + boxHeight - 100, // Position Y (near bottom of the box)
            'Play', // Text
            { fontSize: '40px', fill: '#ffffff' } // Style (white text, 24px size)
        );
    
        // Set the button's origin to center it
        buttonText.setOrigin(0.5);
    
        // Add interactivity to the button
        buttonText.setInteractive();
    
        // Add a callback for when the button is clicked
        buttonText.on('pointerdown', function () {

        });

        buttonText.on('pointerup', function(){
            buttonText.setStyle({ fill: '#ffffff' }); // Revert to white
            graphics.destroy();  // This removes the overlay graphics
            buttonText.destroy();  // This removes the Play button
            this.logo.destroy();
            this.scene.start('Game');
        })
    
        // Optional: Add hover effect to the Play button (e.g., change color on hover)
        buttonText.on('pointerover', function () {
            buttonText.setStyle({ fill: '#ff0' }); // Yellow when hovered
        });
    
        buttonText.on('pointerout', function () {
            buttonText.setStyle({ fill: '#ffffff' }); // Revert to white
        });
        
        EventBus.emit('current-scene-ready', this);
    }
}
