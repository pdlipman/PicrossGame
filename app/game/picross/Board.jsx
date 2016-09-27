const Tile = require('./Tile.jsx');

function Board(columns, rows, answerKey, game) {
    const board = [];
    const group = game.add.group();
    this.hintsX = [];
    this.hintsY = [];

    this.answerKey = answerKey;
    this.boardWidth = answerKey[0].length;
    this.boardHeight = answerKey.length;

    for (let y = 0; y < this.boardHeight; y++) {
        const row = [];

        for (let x = 0; x < this.boardWidth; x++) {
            const tile = new Tile(x, y, group, game, rows, (answerKey[y][x] === '1'));
            row.push(tile);
        }

        board.push(row);
    }


    for (let y = 0; y < this.boardHeight; y++) {
        let streak = 0;
        this.hintsX[y] = [];
        for (let x = 0; x < this.boardWidth; x++) {
            if (this.answerKey[y][x] === '0') {
                if (streak > 0) {
                    this.hintsX[y].push(streak);
                }

                streak = 0;
            } else {
                streak++;
            }
        }

        if (streak > 0) {
            this.hintsX[y].push(streak);
        }
    }

    for (let x = 0; x < this.boardWidth; x++) {
        let streak = 0;
        this.hintsY[x] = [];
        for (let y = 0; y < this.boardHeight; y++) {
            if (this.answerKey[y][x] === '0') {
                if (streak > 0) {
                    this.hintsY[x].push(streak);
                }

                streak = 0;
            } else {
                streak++;
            }
        }

        if (streak > 0) {
            this.hintsY[x].push(streak);
        }

        this.moveTo = function (x, y) {
            group.x = x;
            group.y = y;
            //group.align(this.boardWidth, -1, 4, 4);
            this.showHints(x, y);
        };

        this.showHints = function (parentX, parentY) {
            const hintStyle = {
                font: '14pt Arial',
                fill: '#fff',
                stroke: 'rgba(0,0,0,0)',
                srokeThickness: 4,
            };

            for ( let y = 0; y < this.hintsX.length; y++) {

                let hintXText = '';
                for (let i = 0; i < this.hintsX[y].length; i++) {
                    hintXText += this.hintsX[y][i];
                    if (i + 1 < this.hintsX[y].length) {
                        hintXText += ' ';
                    }
                }

                var text = game.add.text(parentX - 4, parentY + board[y][0].startingY + 4, hintXText, hintStyle);
                text.anchor.setTo(1, 0);
            }

            const hintStyleHorizontal = {
                font: '16pt Arial',
                fill: '#fff',
                stroke: 'rgba(0,0,0,0)',
                srokeThickness: 4,
            };

            for ( let x = 0; x < this.hintsY.length; x++) {
                let hintYText = '';
                for (let i = 0; i < this.hintsY[x].length; i++) {
                    hintYText += this.hintsY[x][i];
                    if (i + 1 < this.hintsY[x].length) {
                        hintYText += '\n';
                    }
                }
                var text = game.add.text(parentX + board[0][x].startingX + 16, parentY, hintYText, hintStyle);
                text.anchor.setTo(0.5, 1);

            }


        }

    }

    console.log(this.hintsX);
    console.log(this.hintsY);

}

module.exports = Board;
