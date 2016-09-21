const React = require('react');
const Boot = require('./main/Boot.jsx');

const GameProperties = require('./main/GameProperties.jsx');
const PlayerProperties = require('./main/PlayerProperties.jsx');

const Player = require('./world/Player.jsx');
/**
 * Game
 */
export default class GameComponent extends React.Component {

    /**
     * constructor
     * @param {object} props - properties
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {number} width - game canvas width
         * @property {number} height - game canvas height
         */
        this.state = {
            appDivId: props.appDivId,
            width: props.width,
            height: props.height,
        };
    }

    componentDidMount() {
        this.createGame(this.props.width, this.props.height);
    }

    createGame(width, height) {
        const game = new Phaser.Game(width, height, Phaser.AUTO, this.props.appDivId); // eslint-disable-line no-undef

        game.state.add(GameProperties.states.boot, Boot);
        game.state.start(GameProperties.states.boot);
    }

    render() { // eslint-disable-line class-methods-use-this
        return (
            <div id={this.props.appDivId} />
        );
    }

}

GameComponent.propTypes = {
    appDivId: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
};

GameComponent.defaultProps = {
    appDivId: 'game-main',
    width: GameProperties.screenWidth,
    height: GameProperties.screenHeight,
};

module.exports = GameComponent;
