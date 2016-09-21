const GameProperties = require('../main/GameProperties.jsx');
const Player = require('./Player.jsx');
const Enemy = require('./Enemy.jsx');
const InventoryMenu = require('../ui/inventory/InventoryMenu.jsx');

//function World() {}

export class World extends Phaser.State {
    preload() {
    }

    create() {
        const player = new Player(
            this.game,
            GameProperties.playerProps.x,
            GameProperties.playerProps.y);
        this.game.camera.follow(player);

        this.player = player;

        const target = this.game.add.sprite(
            GameProperties.screenHeight / 2,
            GameProperties.screenHeight / 2,
            'block'
        );

        this.game.physics.enable(target);
        target.scale.setMagnitude(2);
        target.anchor.setTo(0.5, 0.5);
        target.inputEnabled = true;
        target.renderable = false;

        this.target = target;

        const testEnemy = new Enemy(
            this.game,
            GameProperties.screenHeight / 2,
            GameProperties.screenHeight / 2,
            'block'
        );

        this.testEnemy = testEnemy;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        const inventoryMenu = new InventoryMenu(this.game);
        inventoryMenu.create();

        this.inventoryMenu = inventoryMenu;

        this.clearKey = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
        this.clearKey.onDown.add(this.clearProps, this);

        this.escapeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    }

    clearProps() {
        GameProperties.playerProps.x = 0;
        GameProperties.playerProps.y = 0;
        GameProperties.playerProps.foughtTestEnemy = false;
    }

    update() {
        const player = this.player;
        const target = this.target;

        const testEnemy = this.testEnemy;

        const angle = Phaser.Math.radToDeg(this.physics.arcade.angleToPointer(player));

        player.body.velocity.x = 0;

        target.input.enabled = true;
        target.x = this.game.input.mousePointer.worldX;
        target.y = this.game.input.mousePointer.worldY

        this.playerController();

        if (!GameProperties.playerProps.foughtTestEnemy && this.physics.arcade.overlap(player, testEnemy)) {
            testEnemy.tint = 0xffff00;
            GameProperties.playerProps.foughtTestEnemy = true;
            this.state.start(GameProperties.states.picrossBoard);

        } else {
            testEnemy.tint = 0xff0000;
        }
    }

    playerController() {
        const player = this.player;
        const target = this.target;
        const inventoryMenu = this.inventoryMenu;

        if(inventoryMenu.closed) {
            if (this.game.input.activePointer.leftButton.isDown) {
                this.game.physics.arcade.moveToPointer(player, 300);

                if (this.physics.arcade.overlap(player, target)) {
                    player.body.velocity.setTo(0, 0);
                }
            } else {
                player.body.velocity.setTo(0, 0);
            }
        } else {
            if (this.escapeKey.isDown) {
                inventoryMenu.toggleInventoryMenu();
            }
            player.body.velocity.setTo(0, 0);

        }
    }

    render() {
        this.game.debug.inputInfo(32, 32);
    }

    shutdown() {
        GameProperties.playerProps.x = this.player.x;
        GameProperties.playerProps.y = this.player.y;
    }
}

module.exports = World;
