import GameProperties from '../main/GameProperties.jsx';
import Preloader from './Preloader.jsx';

export default class Boot extends Phaser.State { // eslint-disable-line no-undef
    create() {
        this.game.canvas.oncontextmenu = (e) => { e.preventDefault(); };
        this.state.add(GameProperties.states.preloader, Preloader);
        this.state.start(GameProperties.states.preloader);
    }
}

module.exports = Boot;
