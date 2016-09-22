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

        this.initializeAnswerKey();
    }

    preload() {
    }

    create() {
        this.board = new Board(this.boardWidth, this.boardHeight, this.answerKey, this.game);
        this.board.moveTo(this.boardLeft, this.boardTop);
        this.exitKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.exitKey.onDown.add(this.exitState, this);
    }

    update() {
        if (GameProperties.board.correctAnswer === GameProperties.board.currentCorrectAnswer
        && !GameProperties.board.win) {
            GameProperties.board.win = true;
            console.log('YOU WiN!');
        }
    }

    render() {
        this.game.debug.inputInfo(32, 32);
    }

    exitState() {
        this.state.start(GameProperties.states.world);

    }

    initializeAnswerKey() {
        const answerKeyCsv = '1,1,1,1,1\n'
            + '1,0,1,0,1\n'
            + '1,1,1,1,1\n'
            + '0,1,1,1,0\n'
            + '0,1,0,1,0';

        this.answerKey = this.csvToArray(answerKeyCsv);

        GameProperties.board.correctAnswer = (answerKeyCsv.match(/1/g) || []).length;
        GameProperties.board.correctEmpty = (answerKeyCsv.match(/0/g) || []).length;
        GameProperties.board.currentCorrectAnswer = 0;
        GameProperties.board.currentCorrectEmpty = 0;
        GameProperties.board.win = false;

        //console.log(GameProperties.board.correctAnswer);
        //console.log(GameProperties.board.correctEmpty);
        //console.log(GameProperties.board.currentCorrectAnswer);
        //console.log(GameProperties.board.currentCorrectEmpty);
    }


    csvToArray(csv) {
        const rows = csv.split('\n');
        return rows.map((row) => row.split(','));
    }
}

module.exports = PicrossBoard;
