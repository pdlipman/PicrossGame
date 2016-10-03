import React from 'react';
import Boot from './main/Boot.jsx';

import GameProperties from './main/GameProperties.jsx';

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
        const game =
            new Phaser.Game(width, // eslint-disable-line no-undef
                height,
                Phaser.AUTO, // eslint-disable-line no-undef
                this.props.appDivId);

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
