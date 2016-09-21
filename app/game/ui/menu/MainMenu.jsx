const GameProperties = require('../../main/GameProperties.jsx');

/**
 * Main Menu
 * @class MainMenu
 */
export class MainMenu {}

/**
 * @memberof MainMenu
 * @type {{preload: (function()), create: (function()), addMenuItem: (function(*=, *=))}}
 */
MainMenu.prototype = {

    preload() {
        this.optionCount = 1;
    },

    create() {
        const style = {
            font: '65px Arial',
            fill: '#fff',
            align: 'center',
        };

        const menu = this.game.add.text(this.game.world.centerX, 100, 'Picross Game', style);
        menu.anchor.setTo(0.5);

        this.addMenuItem('Start', () => {
            this.state.start(GameProperties.states.mainMenuStart);
        });
        this.addMenuItem('Options', () => {
            console.log('You clicked Options!');
        });
        this.addMenuItem('Quit', () => {
            console.log('You clicked Quit!');
        });
    },

    addMenuItem(text, callback) {
        const optionStyle = {
            font: '30pt Arial',
            fill: '#fff',
            align: 'right',
            stroke: 'rgba(0,0,0,0)',
            srokeThickness: 4,
        };

        const menuText
            = this.add.text(this.world.centerX, (this.optionCount * 80) + 200, text, optionStyle);

        const onOver = (target) => {
            target.fill = '#feffd5'; // eslint-disable-line no-param-reassign
            target.stroke = 'rgba(200,200,200,0.5)'; // eslint-disable-line no-param-reassign
        };

        const onOut = (target) => {
            target.fill = '#fff'; // eslint-disable-line no-param-reassign
            target.stroke = 'rgba(0,0,0,0)'; // eslint-disable-line no-param-reassign
        };

        menuText.anchor.setTo(0.5);
        menuText.stroke = 'rgba(0,0,0,0';
        menuText.strokeThickness = 4;
        menuText.inputEnabled = true;
        menuText.events.onInputUp.add(callback);
        menuText.events.onInputOver.add(onOver);
        menuText.events.onInputOut.add(onOut);

        this.optionCount = this.optionCount + 1;
    },
};

module.exports = MainMenu;
