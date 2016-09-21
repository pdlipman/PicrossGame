const GameProperties = require('../main/GameProperties.jsx');
const Preloader = require('./Preloader.jsx');

export class Boot extends Phaser.State {
    create() {
        this.game.canvas.oncontextmenu = (e) => { e.preventDefault(); };
        this.state.add(GameProperties.states.preloader, Preloader);
        this.state.start(GameProperties.states.preloader);
    }
}

module.exports = Boot;
