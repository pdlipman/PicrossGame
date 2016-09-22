const Tile = require('./Tile.jsx');

function Board(columns, rows, answerKey, game) {
    const board = [];
    const group = game.add.group();

    for (let y = 0; y < answerKey.length; y++) {
        const row = [];
        for (let x = 0; x < answerKey[0].length; x++) {
            const tile = new Tile(x, y, group, game, rows, (answerKey[y][x] === '1'));
            row.push(tile);
        }

        board.push(row);
    }

    this.moveTo = function (x, y) {
        group.x = x;
        group.y = y;
    };
}

module.exports = Board;
