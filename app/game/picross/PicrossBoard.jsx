import GameProperties from '../main/GameProperties.jsx';
import Board from './Board.jsx';

export default class PicrossBoard extends Phaser.State { // eslint-disable-line no-undef
    init() {
        this.initializeAnswerKey();

        this.boardWidth = this.answerKey[0].length;
        this.boardHeight = this.answerKey.length;

        this.boardLeft =
            (GameProperties.screenWidth -
            (GameProperties.tiles.tileWidth * this.boardWidth)) * 0.5;
        this.boardTop =
            (GameProperties.screenHeight -
            (GameProperties.tiles.tileHeight * this.boardHeight)) * 0.5;
    }

    preload() {
    }

    create() {
        this.board =
            new Board(this.boardWidth, this.boardHeight, this.answerKey, this.game);

        this.board.moveTo(this.boardLeft, this.boardTop);
        this.exitKey =
            this.game.input.keyboard.addKey(Phaser.Keyboard.E); // eslint-disable-line no-undef

        this.exitKey.onDown.add(this.exitState, this);
    }

    update() {
        if (GameProperties.board.correctAnswer === GameProperties.board.currentCorrectAnswer
        && !GameProperties.board.win) {
            GameProperties.board.win = true;
            console.log('YOU WiN!'); // eslint-disable-line no-console
        }

        this.board.update();
    }

    render() {
        this.game.debug.inputInfo(32, 32);
    }

    exitState() {
        this.state.start(GameProperties.states.world);
    }

    initializeAnswerKey() {
        const answerKeyCsv = [
            '1,1,1,1,1\n' +
            '1,0,1,0,1\n' +
            '1,1,1,1,1\n' +
            '0,1,1,1,0\n' +
            '0,1,0,1,0',
        ];

        answerKeyCsv.push(
            '1,0,1,0,1\n' +
            '0,1,1,1,0\n' +
            '1,1,0,1,1\n' +
            '0,1,1,1,0\n' +
            '1,0,1,0,1'
        );

        answerKeyCsv.push(
            '1,1,1,1,1\n' +
            '0,1,0,1,0\n' +
            '0,0,1,0,0\n' +
            '0,1,1,1,0\n' +
            '1,1,1,1,1'
        );

        const key = Math.floor(Math.random() * answerKeyCsv.length);

        this.answerKey = this.csvToArray(answerKeyCsv[key]);

        GameProperties.board.correctAnswer = (answerKeyCsv[key].match(/1/g) || []).length;
        GameProperties.board.correctEmpty = (answerKeyCsv[key].match(/0/g) || []).length;
        GameProperties.board.currentCorrectAnswer = 0;
        GameProperties.board.currentCorrectEmpty = 0;
        GameProperties.board.win = false;
    }

    csvToArray(csv) {
        const rows = csv.split('\n');
        return rows.map(row => row.split(','));
    }
}

module.exports = PicrossBoard;
