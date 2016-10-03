import React from 'react';
import ReactDom from 'react-dom';

import GameComponent from './game/GameComponent.jsx';

/**
 * App Class
 */
export default class App extends React.Component {

    /**
     * constructor
     * @param {object} props - properties
     */
    constructor(props) {
        super(props);

        /**
         * @type {object}
         * @property {string} title - element title
         */
        this.state = {
            title: props.title,
        };
    }

    /**
     * render
     * @return {ReactElement} - generated markup
     */
    render() {
        return (
            <div>
                <GameComponent />
            </div>
        );
    }
}

App.propTypes = {
    title: React.PropTypes.string,
};

App.defaultProps = {
    title: 'Hello, World!',
};

ReactDom.render(
    (<App />),
    document.getElementById('react-app')
);
