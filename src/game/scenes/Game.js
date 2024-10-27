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
        this.load.spritesheet("npc1", "assets/npc/M_01.png", {
            frameWidth: 16,
            frameHeight: 18,
        });
        this.load.spritesheet("npc2", "assets/npc/M_02.png", {
            frameWidth: 16,
            frameHeight: 18,
        });
        this.load.spritesheet("npc3", "assets/npc/M_03.png", {
            frameWidth: 16,
            frameHeight: 18,
        });
        this.load.spritesheet("npc4", "assets/npc/M_04.png", {
            frameWidth: 16,
            frameHeight: 18,
        });
        this.load.spritesheet("npc5", "assets/npc/M_05.png", {
            frameWidth: 16,
            frameHeight: 18,
        });
        this.load.spritesheet("npc6", "assets/npc/M_06.png", {
            frameWidth: 16,
            frameHeight: 18,
        });
        this.load.spritesheet("npc7", "assets/npc/F_01.png", {
            frameWidth: 16,
            frameHeight: 18,
        });
        this.load.spritesheet("npc8", "assets/npc/F_02.png", {
            frameWidth: 16,
            frameHeight: 18,
        });
        this.load.spritesheet("npc9", "assets/npc/F_03.png", {
            frameWidth: 16,
            frameHeight: 18,
        });
        this.load.spritesheet("npc10", "assets/npc/F_04.png", {
            frameWidth: 16,
            frameHeight: 18,
        });
        this.load.spritesheet("npc11", "assets/npc/F_05.png", {
            frameWidth: 16,
            frameHeight: 18,
        });
        this.load.spritesheet("npc12", "assets/npc/F_06.png", {
            frameWidth: 16,
            frameHeight: 18,
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
        this.npc = this.physics.add.sprite(700, 420, "npc1").setScale(2);
        this.npc2 = this.physics.add.sprite(300, 530, "npc2").setScale(2);
        this.npc3 = this.physics.add.sprite(400, 530, "npc3").setScale(2);
        this.npc4 = this.physics.add.sprite(320, 760, "npc4").setScale(2);
        this.npc5 = this.physics.add.sprite(210, 810, "npc5").setScale(2);
        this.npc6 = this.physics.add.sprite(100, 800, "npc6").setScale(2);
        this.npc7 = this.physics.add.sprite(300, 900, "npc7").setScale(2);
        this.npc8 = this.physics.add.sprite(800, 840, "npc8").setScale(2);
        this.npc9 = this.physics.add.sprite(300, 1000, "npc9").setScale(2);
        this.npc10 = this.physics.add.sprite(1200, 530, "npc10").setScale(2);
        this.npc11 = this.physics.add.sprite(800, 740, "npc11").setScale(2);
        this.npc12 = this.physics.add.sprite(940, 1030, "npc12").setScale(2);

        this.npc.body.immovable = true;
        this.npc2.body.immovable = true;
        this.npc3.body.immovable = true;
        this.npc4.body.immovable = true;
        this.npc5.body.immovable = true;
        this.npc6.body.immovable = true;
        this.npc7.body.immovable = true;
        this.npc8.body.immovable = true;
        this.npc9.body.immovable = true;
        this.npc10.body.immovable = true;
        this.npc11.body.immovable = true;
        this.npc12.body.immovable = true;

        this.physics.add.collider(this.player, this.npc);
        this.physics.add.collider(this.player, this.npc2);
        this.physics.add.collider(this.player, this.npc3);
        this.physics.add.collider(this.player, this.npc4);
        this.physics.add.collider(this.player, this.npc5);
        this.physics.add.collider(this.player, this.npc6);
        this.physics.add.collider(this.player, this.npc7);
        this.physics.add.collider(this.player, this.npc8);
        this.physics.add.collider(this.player, this.npc9);
        this.physics.add.collider(this.player, this.npc10);
        this.physics.add.collider(this.player, this.npc11);
        this.physics.add.collider(this.player, this.npc12);

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
            this.checkProximity(this.npc2, 50) ||
            this.checkProximity(this.npc3, 50) ||
            this.checkProximity(this.npc4, 50) ||
            this.checkProximity(this.npc5, 50) ||
            this.checkProximity(this.npc6, 50) ||
            this.checkProximity(this.npc7, 50) ||
            this.checkProximity(this.npc8, 50) ||
            this.checkProximity(this.npc9, 50) ||
            this.checkProximity(this.npc10, 50) ||
            this.checkProximity(this.npc11, 50) ||
            this.checkProximity(this.npc12, 50);

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

