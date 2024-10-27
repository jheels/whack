import { Scene } from "phaser";

export class Game extends Scene {

    constructor() {
        super("Game");
    }

    preload() {
        // Load the TMX/TMJ file and tileset images
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

        foregroundLayer.setDepth(3);
        backupLayer.setDepth(0);

        var music = this.sound.get("backgroundMusic");

        var muteButton = this.add.sprite(1250, 100, 'unmuteIcon'); // Position as needed
        muteButton.setInteractive(); // Make it interactive
    
        // Mute button click handler
        muteButton.on('pointerdown', function () {
            if (music.isPlaying) {
                music.pause();
                muteButton.setTexture('muteIcon'); // Change icon to mute
            } else {
                music.resume();
                muteButton.setTexture('unmuteIcon'); // Change icon to unmute
            }
        });

        muteButton.setScale(0.5);

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
        this.player.setScale(2.5);
        this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.5);
        this.player.body.setOffset(this.player.width * 0.25, this.player.height * 0.25);

        this.physics.world.createDebugGraphic();
        this.physics.world.debugGraphic.visible = true;
        this.cursors = this.input.keyboard.createCursorKeys();

        this.WASDkeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Set up the camera to follow the player
        this.cameras.main.startFollow(this.player);

        this.cameras.main.setBounds(0, 0, 1344, 1104);

        this.npc = this.physics.add.sprite(200, 400, "npc");
        this.npc.state = "idle";
        this.npc2 = this.physics.add.sprite(300, 400, "npc");
        this.npc.setScale(2);
        this.npc2.setScale(2);

        const collisionObjects = map.getObjectLayer('collision').objects;
        collisionObjects.forEach(object => {
            const obj = this.physics.add.sprite(object.x * scaleX, object.y * scaleY, null).setOrigin(0, 0);
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

        const speed = 400;

        if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown
            || this.WASDkeys.left.isDown || this.WASDkeys.right.isDown || this.WASDkeys.up.isDown || this.WASDkeys.down.isDown
        )
        {
            if (this.cursors.left.isDown) {
                this.player.body.setVelocityX(-speed);
                this.player.anims.play("walk-left", true);
            } else if (this.cursors.right.isDown) {
                this.player.body.setVelocityX(speed);
                this.player.anims.play("walk-right", true);
            }

            if (this.cursors.up.isDown) {
                this.player.body.setVelocityY(-speed);
                this.player.anims.play("walk-up", true);
            } else if (this.cursors.down.isDown) {
                this.player.body.setVelocityY(speed);
                this.player.anims.play("walk-down", true);
            } 

            if (this.WASDkeys.left.isDown) {
                this.player.body.setVelocityX(-speed);
                this.player.anims.play("walk-left", true);
            } else if (this.WASDkeys.right.isDown) {
                this.player.body.setVelocityX(speed);
                this.player.anims.play("walk-right", true);
            }

            if (this.WASDkeys.up.isDown) {
                this.player.body.setVelocityY(-speed);
                this.player.anims.play("walk-up", true);
            } else if (this.WASDkeys.down.isDown) {
                this.player.body.setVelocityY(speed);
                this.player.anims.play("walk-down", true);
            } 
        } else {
            this.player.anims.stop();
        }



        // Keep camera zoom
        this.cameras.main.setZoom(1.5);
    }
}

