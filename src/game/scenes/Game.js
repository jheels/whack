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
        this.load.spritesheet("character", "assets/character.png", {
            frameWidth: 16, // Adjust if your sprite size is different
            frameHeight: 16, // Adjust if your sprite size is different
        });
    }

    create() {
        // Create the tile map and layers

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

        // Create the tile map and layers
        this.anims.create({
            key: "walk-down",
            frames: this.anims.generateFrameNumbers("character", {
                start: 0,
                end: 3,
            }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "walk-up",
            frames: this.anims.generateFrameNumbers("character", {
                start: 4,
                end: 7,
            }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "walk-right",
            frames: this.anims.generateFrameNumbers("character", {
                start: 8,
                end: 11,
            }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "walk-left",
            frames: this.anims.generateFrameNumbers("character", {
                start: 12,
                end: 15,
            }),
            frameRate: 8,
            repeat: -1,
        });

        this.player = this.physics.add.sprite(100, 550, "character");
        this.player.setScale(2);
        this.cursors = this.input.keyboard.createCursorKeys();

        // Set up the camera to follow the player
        this.cameras.main.startFollow(this.player);

        this.cameras.main.setBounds(0, 0, 1344, 1104);

        this.npc = this.physics.add.sprite(200, 400, "npc");
        this.npc.state = "idle";
        this.npc2 = this.physics.add.sprite(300, 400, "npc");
        this.npc.setScale(2);
        this.npc2.setScale(2);
    }

    update() {
        // Reset velocity
        this.player.body.setVelocity(0);

        const speed = 160;
        // Handle movement and animations
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-speed);
            this.player.anims.play("walk-left", true);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
            this.player.anims.play("walk-right", true);
        } else if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
            this.player.anims.play("walk-up", true);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
            this.player.anims.play("walk-down", true);
        } else {
            // Stop animation if not moving
            this.player.anims.stop();
        }

        // Keep camera zoom
        this.cameras.main.setZoom(1.5);
    }
}

