import { Scene } from "phaser";
import Phaser from "phaser";

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    preload() {

        const npcs = [
            { key: "npc1", path: "assets/npc/M_01.png" },
            { key: "npc2", path: "assets/npc/M_02.png" },
            { key: "npc3", path: "assets/npc/M_03.png" },
            { key: "npc4", path: "assets/npc/M_04.png" },
            { key: "npc5", path: "assets/npc/M_05.png" },
            { key: "npc6", path: "assets/npc/M_06.png" },
            { key: "npc7", path: "assets/npc/F_01.png" },
            { key: "npc8", path: "assets/npc/F_02.png" },
            { key: "npc9", path: "assets/npc/F_03.png" },
            { key: "npc10", path: "assets/npc/F_04.png" },
            { key: "npc11", path: "assets/npc/F_05.png" },
            { key: "npc12", path: "assets/npc/F_06.png" },
        ];
    
        // Load NPC spritesheets
        npcs.forEach(npc => {
            this.load.spritesheet(npc.key, npc.path, {
                frameWidth: 16,
                frameHeight: 18,
            });
        });
    
        this.load.spritesheet("character", "assets/player/character.png", {
            frameWidth: 16,
            frameHeight: 16,
        });

        this.load.spritesheet("idlechar", "assets/player/idle.png", {
            frameWidth: 16, // Adjust if your sprite size is different
            frameHeight: 16, // Adjust if your sprite size is different
        });
    }

    create() {
        // Set up map and layers
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

        foregroundLayer.setDepth(3);
        backupLayer.setDepth(0);

        var music = this.sound.get("backgroundMusic");
        var levelUpSFX = this.sound.add('levelUpSFX');
        levelUpSFX.play();

        // var muteButton = this.add.sprite(1250, 100, "unmuteIcon"); // Position as needed
        // muteButton.setInteractive(); // Make it interactive

        // // Mute button click handler
        // muteButton.on("pointerdown", function () {
        //     if (music.isPlaying) {
        //         music.pause();
        //         muteButton.setTexture("muteIcon"); // Change icon to mute
        //     } else {
        //         music.resume();
        //         muteButton.setTexture("unmuteIcon"); // Change icon to unmute
        //     }
        // });

        // muteButton.setScale(0.5);

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

        this.anims.create({
            key: "idle-down",
            frames: this.anims.generateFrameNumbers("idlechar", {
                start: 0,
                end: 1,
            }),
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: "idle-up",
            frames: this.anims.generateFrameNumbers("idlechar", {
                start: 4,
                end: 5,
            }),
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: "idle-right",
            frames: this.anims.generateFrameNumbers("idlechar", {
                start: 8,
                end: 9,
            }),
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: "idle-left",
            frames: this.anims.generateFrameNumbers("idlechar", {
                start: 12,
                end: 13,
            }),
            frameRate: 2,
            repeat: -1,
        });

        this.player = this.physics.add.sprite(100, 550, "character");
        this.player.setScale(2.5);
        this.player.body.setSize(
            this.player.width * 0.5,
            this.player.height * 0.5
        );
        this.player.body.setOffset(
            this.player.width * 0.25,
            this.player.height * 0.25
        );

        this.cursors = this.input.keyboard.createCursorKeys();

        this.WASDkeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });

        // Set up the camera to follow the player
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 1344, 1104);

        // Create NPCs
        const npcData = [
            { key: "npc1", x: 700, y: 200 },
            { key: "npc2", x: 100, y: 430 },
            { key: "npc3", x: 420, y: 500 },
            { key: "npc4", x: 400, y: 750 },
            { key: "npc5", x: 750, y: 500 },
            { key: "npc6", x: 75, y: 900 },
            { key: "npc7", x: 550, y: 875 },
            { key: "npc8", x: 1100, y: 800 },
            { key: "npc9", x: 650, y: 1000 },
            { key: "npc10", x: 1150, y: 470 },
            { key: "npc11", x: 1200, y: 230 },
            { key: "npc12", x: 1050, y: 1000 },
        ];
    
        // Create NPCs, scale them up, and set them as immovable
        this.npcs = npcData.map(data => {
            const npc = this.physics.add.sprite(data.x, data.y, data.key).setScale(2.5);
            npc.body.immovable = true;
            this.physics.add.collider(this.player, npc);
            return npc;
        });

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
                zIndex : 1000,
                fontSize: "16px",
                fill: "#ffffff",
                backgroundColor: "#000000",
                padding: { x: 5, y: 3 },
            }
        );
        this.tooltip.setOrigin(0.5); // Center the tooltip
        this.tooltip.setVisible(false); // Start with it hidden

        const collisionObjects = map.getObjectLayer("collision").objects;
        collisionObjects.forEach((object) => {
            const obj = this.physics.add
                .sprite(object.x * scaleX, object.y * scaleY, null)
                .setOrigin(0, 0);
            obj.displayWidth = object.width * scaleX;
            obj.displayHeight = object.height * scaleY;
            obj.visible = false;
            obj.body.setImmovable(true);
            obj.body.setAllowGravity(false);
            this.physics.add.collider(this.player, obj);
        });
    }

    update() {
        // Reset velocity
        this.player.body.setVelocity(0);

        const speed = 300;
        let moving = false;
        let lastDirection = this.player.lastDirection || "down";

        // Handle movement and animations
        if (
            this.cursors.left.isDown ||
            this.cursors.right.isDown ||
            this.cursors.up.isDown ||
            this.cursors.down.isDown ||
            this.WASDkeys.left.isDown ||
            this.WASDkeys.right.isDown ||
            this.WASDkeys.up.isDown ||
            this.WASDkeys.down.isDown
        ) {
            if (this.cursors.left.isDown || this.WASDkeys.left.isDown) {
                this.player.body.setVelocityX(-speed);
                this.player.anims.play("walk-left", true);
                lastDirection = "left";
                moving = true;
            } else if (
                this.cursors.right.isDown ||
                this.WASDkeys.right.isDown
            ) {
                this.player.body.setVelocityX(speed);
                this.player.anims.play("walk-right", true);
                lastDirection = "right";
                moving = true;
            }

            if (this.cursors.up.isDown || this.WASDkeys.up.isDown) {
                this.player.body.setVelocityY(-speed);
                this.player.anims.play("walk-up", true);
                lastDirection = "up";
                moving = true;
            } else if (this.cursors.down.isDown || this.WASDkeys.down.isDown) {
                this.player.body.setVelocityY(speed);
                this.player.anims.play("walk-down", true);
                lastDirection = "down";
                moving = true;
            }
        }

        // Play idle animation if not moving
        if (!moving) {
            switch (lastDirection) {
                case "left":
                    this.player.anims.play("idle-left", true);
                    break;
                case "right":
                    this.player.anims.play("idle-right", true);
                    break;
                case "up":
                    this.player.anims.play("idle-up", true);
                    break;
                case "down":
                default:
                    this.player.anims.play("idle-down", true);
                    break;
            }
        }

        // Store the last direction
        this.player.lastDirection = lastDirection;

        // Keep camera zoom
        this.cameras.main.setZoom(1.5);

        // Proximity check for NPC interaction
        this.isNearNPC = this.npcs.some(npc => this.checkProximity(npc, 50));


        // Show or hide the tooltip based on proximity
        if (this.isNearNPC) {
            this.tooltip.setVisible(true);
            console.log(this.player.x, this.player.y);
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

