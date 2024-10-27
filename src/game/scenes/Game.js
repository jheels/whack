import { Scene } from "phaser";
import Phaser from "phaser";

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    preload() {
        // Load assets
        this.load.image("tiles", "assets/tiles.png");
        this.load.tilemapTiledJSON("map", "assets/map.json");
        this.load.spritesheet("npc", "assets/global.png", {
            frameWidth: 24,
            frameHeight: 32,
        });
        this.load.spritesheet("character", "assets/character.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
    }

    create() {
        // Set up map and layers
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tiles", "tiles");
        const scaleX = this.scale.width / map.widthInPixels;
        const scaleY = this.scale.height / map.heightInPixels;

        const groundLayer = map
            .createLayer("Tile Layer 1", tileset)
            .setScale(scaleX, scaleY);
        const foregroundLayer = map
            .createLayer("Tile Layer 2", tileset)
            .setScale(scaleX, scaleY);
        const backupLayer = map
            .createLayer("Tile Layer 3", tileset)
            .setScale(scaleX, scaleY);
        const extraLayer = map
            .createLayer("Tile Layer 4", tileset)
            .setScale(scaleX, scaleY);

        // Player animations
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

        // Create player
        this.player = this.physics.add
            .sprite(100, 550, "character")
            .setScale(2);
        this.cursors = this.input.keyboard.createCursorKeys();

        // Set up the camera to follow the player
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 1344, 1104);

        // Create NPCs
        this.npc = this.physics.add.sprite(200, 520, "npc").setScale(2);
        this.npc2 = this.physics.add.sprite(300, 530, "npc").setScale(2);
        this.npc.body.immovable = true;
        this.npc2.body.immovable = true;

        // Add collision with NPCs
        this.physics.add.collider(this.player, this.npc);
        this.physics.add.collider(this.player, this.npc2);

        // Add E key for interaction
        this.interactKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.E
        );

        // Boolean to track if player is near an NPC
        this.isNearNPC = false;

        // Tooltip text for interaction, initially hidden
        this.tooltip = this.add.text(
            this.player.x,
            this.player.y - 40,
            'Press "E" to interact',
            {
                fontSize: "16px",
                fill: "#ffffff",
                backgroundColor: "#000000",
                padding: { x: 5, y: 3 },
            }
        );
        this.tooltip.setOrigin(0.5); // Center the tooltip
        this.tooltip.setVisible(false); // Start with it hidden
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
            this.player.anims.stop();
        }

        // Keep camera zoom
        this.cameras.main.setZoom(1.5);

        // Proximity check for NPC interaction
        this.isNearNPC =
            this.checkProximity(this.npc, 50) ||
            this.checkProximity(this.npc2, 50);

        // Show or hide the tooltip based on proximity
        if (this.isNearNPC) {
            this.tooltip.setVisible(true);
            this.tooltip.setPosition(this.player.x, this.player.y - 40); // Position above the player
        } else {
            this.tooltip.setVisible(false);
        }

        // Check if E key is pressed and player is near an NPC
        if (
            this.isNearNPC &&
            Phaser.Input.Keyboard.JustDown(this.interactKey)
        ) {
            this.triggerInteraction();
        }
    }

    checkProximity(npc, distance) {
        // Calculate distance between player and npc
        const dist = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            npc.x,
            npc.y
        );
        return dist < distance;
    }

    triggerInteraction() {
        this.game.events.emit("interaction-triggered");
        // Placeholder function to handle the popup
        console.log("Interaction triggered!");
        // Replace with the actual logic to show the popup
    }
}

