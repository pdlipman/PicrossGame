import GameProperties from '../main/GameProperties.jsx';

import MainMenu from '../ui/menu/MainMenu.jsx';
import PicrossBoard from '../picross/PicrossBoard.jsx';
import World from '../world/World.jsx';

export default class Preloader extends Phaser.State { // eslint-disable-line no-undef
    loadGameStates() {
        this.state.add(GameProperties.states.mainMenu, MainMenu);
        this.state.add(GameProperties.states.picrossBoard, PicrossBoard);
        this.state.add(GameProperties.states.world, World);
    }

    loadSprites() {
        const assetDirectory = 'static/game-assets/';
        const blockAsset = 'block.png';

        this.load.image('block', assetDirectory + blockAsset);
    }

    preload() {
        this.loadSprites();
    }

    create() {
        this.loadGameStates();
        this.state.start(GameProperties.states.beginState);
    }
}

module.exports = Preloader;
