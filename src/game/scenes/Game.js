import { Scene } from "phaser";

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    preload() {
        // Load the TMX/TMJ file and tileset images

        this.load.image("tiles", "assets/tiles.png"); // Load the tileset image
        this.load.tilemapTiledJSON("map", "assets/map.json"); // or 'assets/map.tmj'
        this.load.spritesheet("npc", "assets/global.png", {
            frameWidth: 32, // Adjust based on your sprite dimensions
            frameHeight: 32,
        });
    }

    create() {
        // Create the tile map and layers

        this.add.image(0, 0, "tiles");
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tiles", "tiles");
        const scaleX = this.scale.width / map.widthInPixels;
        const scaleY = this.scale.height / map.heightInPixels;

        const groundLayer = map.createLayer("Tile Layer 1", tileset);
        groundLayer.setScale(scaleX, scaleY);

        const foregroundLayer = map.createLayer("Tile Layer 2", tileset);
        foregroundLayer.setScale(scaleX, scaleY);

        const backupLayer = map.createLayer("Tile Layer 3", tileset);
        backupLayer.setScale(scaleX, scaleY);

        const extraLayer = map.createLayer("Tile Layer 4", tileset);
        extraLayer.setScale(scaleX, scaleY);

        // Add a sprite and enable movement
        // this.player = this.physics.add.sprite(100, 100, "sprite");
        // this.cursors = this.input.keyboard.createCursorKeys();

        // Add an NPC sprite
        this.npc = this.physics.add.sprite(200, 400, "npc");
        this.npc.state = "idle";
        this.npc2 = this.physics.add.sprite(300, 400, "npc");
        this.npc.setScale(2);
        this.npc2.setScale(2);

        console.log(this.npc);

        // Add collision between the player and the NPC
        // this.physics.add.collider(this.player, this.npc);
    }

    update() {
        // Handle player movement
    }
}

