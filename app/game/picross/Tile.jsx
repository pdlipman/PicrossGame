const GameProperties = require('../main/GameProperties.jsx');

export class Tile extends Phaser.Sprite {
    constructor(column, row, group, game, totalRows, answer) {
        super(game, 0, 0, 'block', 0);

        const padding = GameProperties.tiles.tilePadding;
        this.movementDistance = 3;
        this.movementSpeed = 100;
        this.column = column;
        this.row = row;
        this.totalRows = totalRows;
        this.startingX = (column * GameProperties.tiles.tileWidth) + (column * padding);
        this.startingY = (row * GameProperties.tiles.tileHeight) + (row * padding);
        this.position.setTo(this.startingX, -400);
        this.answer = answer;
        this.clicked = false;

        this.events.onInputOut.add(this.rollOut, this);
        this.events.onInputOver.add(this.rollOver, this);
        this.events.onInputDown.add(this.click, this);

        group.add(this);

        this.loadTiles();

        this.game = game;
    }
}

Tile.prototype.initializeControls = function() {
    this.inputEnabled = true;
    this.input.useHandCursor = true;
};

Tile.prototype.loadTiles = function() {
    const tween = this.game.add.tween(this);
    tween.to(
        {
            x: this.startingX,
            y: this.startingY,
        },
        400 + ((this.totalRows - this.row) * 150) + (this.column * 150),
        Phaser.Easing.Exponential.easeOut); // eslint-disable-line no-undef
    tween.onComplete.add(this.initializeControls, this);
    tween.start();
};

Tile.prototype.click = function() {
    if (this.game.input.activePointer.leftButton.isDown) {
        if (this.answer) {
            if (!this.clicked) {
                this.clicked = true;
                GameProperties.board.currentCorrectAnswer++;
                console.log(GameProperties.board.currentCorrectAnswer);
            }
            this.tint = 0x00ff00;
        } else {
            this.tint = 0xff0000;
        }
    }

    if (this.game.input.activePointer.middleButton.isDown) {
        // console.log('middle');
        this.tint = 0xffffff;
    }

    if (this.game.input.activePointer.rightButton.isDown) {
        // console.log('right');
        this.tint = 0x000000;
    }
};

Tile.prototype.rollOver = function() {
    const tween = this.game.add.tween(this);
    tween.to(
        {
            x: this.x - this.movementDistance,
            y: this.y - this.movementDistance,
        },
        this.movementSpeed,
        Phaser.Easing.Exponential.easeOut); // eslint-disable-line no-undef
    tween.start();

    if (this.game.input.activePointer.leftButton.isDown) {
        // console.log('left');
        if(this.answer) {
            if (!this.clicked) {
                this.clicked = true;
                GameProperties.board.currentCorrectAnswer++;
                console.log(GameProperties.board.currentCorrectAnswer);
            }
            this.tint = 0x00ff00;

        } else {
            this.tint = 0xff0000;
        }
    }

};

Tile.prototype.rollOut = function() {
    const tween = this.game.add.tween(this);
    tween.to(
        {
            x: this.startingX,
            y: this.startingY,
        },
        this.movementSpeed,
        Phaser.Easing.Exponential.easeOut); // eslint-disable-line no-undef
    tween.start();
};

module.exports = Tile;