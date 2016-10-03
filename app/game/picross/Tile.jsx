import GameProperties from '../main/GameProperties.jsx';

export default class Tile extends Phaser.Sprite { // eslint-disable-line no-undef
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
        this.events.onInputUp.add(this.inputUp, this);

        group.add(this);

        this.loadTiles();

        this.game = game;
    }
}

Tile.prototype.inputUp = function inputUp() {
    if (!GameProperties.board.dragEvent) {
        this.answerSelected();
    }
    GameProperties.tiles.targetTile = null;
    GameProperties.board.dragEvent = false;
};

Tile.prototype.dragSelected = function dragSelected() {
    this.tint = 0xd3d3d3;
};

Tile.prototype.unSelect = function unSelect() {
    if (!this.clicked) {
        this.tint = 0xffffff;
    }
};


Tile.prototype.initializeControls = function initializeControls() {
    this.inputEnabled = true;
    this.input.useHandCursor = true;
};

Tile.prototype.loadTiles = function loadTiles() {
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

Tile.prototype.answerSelected = function answerSelected() {
    if (this.answer) {
        if (!this.clicked) {
            GameProperties.board.currentCorrectAnswer += 1;
        }
        this.tint = 0x00ff00;
    } else {
        this.tint = 0xff0000;
    }

    this.clicked = true;
};

Tile.prototype.click = function click() {
    if (this.game.input.activePointer.leftButton.isDown) {
        GameProperties.tiles.targetTile = this;
        GameProperties.board.pointerStartLocationX = this.game.input.activePointer.x;
        GameProperties.board.pointerStartLocationY = this.game.input.activePointer.y;
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

Tile.prototype.rollOver = function rollOver() {
    const tween = this.game.add.tween(this);
    tween.to(
        {
            x: this.startingX - this.movementDistance,
            y: this.startingY - this.movementDistance,
        },
        this.movementSpeed,
        Phaser.Easing.Exponential.easeOut); // eslint-disable-line no-undef
    tween.start();
};

Tile.prototype.rollOut = function rollOut() {
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
