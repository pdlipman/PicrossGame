const Tile = require('./Tile.jsx');

function Board(columns, rows, game) {
    const board = [];
    const group = game.add.group();

    for (let y = 0; y < rows; y++) {
        const row = [];

        for (let x = 0; x < columns; x++) {
            const tile = new Tile(x, y, group, game, rows);
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