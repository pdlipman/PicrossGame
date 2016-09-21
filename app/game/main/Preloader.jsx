const GameProperties = require('../main/GameProperties.jsx');

const MainMenu = require('../ui/menu/MainMenu.jsx');
const PicrossBoard = require('../picross/PicrossBoard.jsx');
const World = require('../world/World.jsx');

export class Preloader extends Phaser.State {
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
        // this.state.start(GameProperties.states.picrossBoard);
        //this.state.start(GameProperties.states.world);
        this.state.start(GameProperties.states.beginState);
    }
}

module.exports = Preloader;
