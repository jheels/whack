import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class MainMenu extends Scene {
    constructor() {
        super("MainMenu");
    }

    create() {
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

        var graphics = this.add.graphics();

        // Set a fill color (RGBA format, with alpha for transparency)
        graphics.fillStyle(0x000000, 0.8); // Black with 50% transparency

        // Calculate the box dimensions
        var boxWidth = 900;
        var boxHeight = 600;
        var x = this.cameras.main.width / 2 - boxWidth / 2; // Center X
        var y = this.cameras.main.height / 2 - boxHeight / 2; // Center Y

        // Draw the rectangle (overlay box)
        graphics.fillRect(x, y, boxWidth, boxHeight);

        // Optionally, add a border or outline
        graphics.lineStyle(4, 0xffffff); // White border
        graphics.strokeRect(x, y, boxWidth, boxHeight);

        var logo = this.add
            .image(
                this.cameras.main.width / 2, // Center X
                y + 200,
                "logo"
            )
            .setDepth(100);

        logo.setOrigin(0.5);

        // Play Button
        var playButtonText = this.add.text(
            this.cameras.main.width / 2, // Center X
            y + boxHeight - 200, // Position Y (near bottom of the box)
            "Play", // Text
            { fontSize: "50px", fill: "#ffffff" } // Style (white text, 40px size)
        );

        // Center the button
        playButtonText.setOrigin(0.5);

        // Add interactivity to the button
        playButtonText.setInteractive();

        // Play button events
        playButtonText.on("pointerdown", function () {
            playButtonText.setStyle({ fill: "#00ff00" }); // Optional click color change
        });

        playButtonText.on(
            "pointerup",
            function () {
                playButtonText.setStyle({ fill: "#ffffff" }); // Revert to white
                this.scene.start("Game");
                this.game.events.emit("display-progress");
            },
            this
        );

        playButtonText.on("pointerover", function () {
            playButtonText.setStyle({ fill: "#ff0" }); // Yellow when hovered
        });

        playButtonText.on("pointerout", function () {
            playButtonText.setStyle({ fill: "#ffffff" }); // Revert to white
        });

        // Play the background music
        var music = this.sound.add("backgroundMusic"); // Create a sound object
        music.play({ loop: true }); // Play the music in a loop

        // Adjust Volume
        music.setVolume(0.5); // Set the volume (0.0 to 1.0)

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

        EventBus.emit("current-scene-ready", this);
        // how to play instructions
        var instructionText = this.add.text(
            this.cameras.main.width / 2, // Center X
            y + boxHeight - 100, // Position Y (slightly below the Play button)
            `Use WASD to move and `, // Text
            { fontSize: "30px", fill: "#ffffff" } // Style (white text, 30px size)
        );

        // Center the button
        instructionText.setOrigin(0.5);
        // how to play instructions
        var instructionText2 = this.add.text(
            this.cameras.main.width / 2, // Center X
            y + boxHeight - 50, // Position Y (slightly below the Play button)
            `press "e" to interact with NPC`, // Text
            { fontSize: "30px", fill: "#ffffff" } // Style (white text, 40px size)
        );

        // Center the button
        instructionText2.setOrigin(0.5);

        // // Add interactivity to the button
        // progressButtonText.setInteractive();

        // // Progress button events
        // progressButtonText.on("pointerdown", function () {
        //     progressButtonText.setStyle({ fill: "#00ff00" }); // Optional click color change
        // });

        // progressButtonText.on(
        //     "pointerup",
        //     function () {
        //         progressButtonText.setStyle({ fill: "#ffffff" }); // Revert to white
        //         // graphics.destroy();
        //         // destroy the Play button
        //         playButtonText.destroy();
        //         // destroy the logo
        //         logo.destroy();
        //         progressButtonText.destroy();

        //         // emit display-progress event
        //         // this.game.events.emit("display-progress");
        //     },
        //     this
        // );

        // progressButtonText.on("pointerover", function () {
        //     progressButtonText.setStyle({ fill: "#ff0" }); // Yellow when hovered
        // });

        // progressButtonText.on("pointerout", function () {
        //     progressButtonText.setStyle({ fill: "#ffffff" }); // Revert to white
        // });

        EventBus.emit("current-scene-ready", this);
    }
}

