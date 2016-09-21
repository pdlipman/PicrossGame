const React = require('react');
const ReactDom = require('react-dom');

const GameComponent = require('./game/GameComponent.jsx');

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
                <GameComponent
                    width={640}
                    height={480}
                />
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

ReactDom.render((<App />), document.getElementById('react-app'));
