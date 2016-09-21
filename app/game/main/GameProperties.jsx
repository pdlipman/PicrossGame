const GameProperties = {
    screenWidth: 640,
    screenHeight: 480,

    tileWidth: 32,
    tileHeight: 32,
    playerProps:
    {
        x: 0,
        y: 0,
        foughtTestEnemy: false,
    },
    states:
    {
        boot: 'boot',
        preloader: 'preloader',
        picrossBoard: 'picross-board',
        world: 'world',
        mainMenu: 'main-menu',
        beginState: 'world', // for testing
        mainMenuStart: 'world', // where does the main menu start option go
        mainMenuOptions: '',  // where does the main menu start option go
    },
};

module.exports = GameProperties;
