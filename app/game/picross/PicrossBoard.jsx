const GameProperties = require('../main/GameProperties.jsx');
const Board = require('./Board.jsx');

export class PicrossBoard extends Phaser.State {
    init() {
        this.boardWidth = 5;
        this.boardHeight = 5;

        this.boardLeft =
            (GameProperties.screenWidth - (GameProperties.tileWidth * this.boardWidth)) * 0.5;
        this.boardTop =
            (GameProperties.screenHeight - (GameProperties.tileHeight * this.boardHeight)) * 0.5;
    }

    preload() {
    }

    create() {
        this.board = new Board(this.boardWidth, this.boardHeight, this.game);
        this.board.moveTo(this.boardLeft, this.boardTop);
        this.exitKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.exitKey.onDown.add(this.exitState, this);
    }

    update() {
    }

    render() {
        this.game.debug.inputInfo(32, 32);
    }

    exitState() {
        this.state.start(GameProperties.states.world);

    }
}

module.exports = PicrossBoard;
