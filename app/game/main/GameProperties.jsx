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
        beginState: 'main-menu', // for testing
        mainMenuStart: 'world', // where does the main menu start option go
        mainMenuOptions: '',  // where does the main menu start option go
    },
    board: {
        currentCorrectAnswer: 0,
        currentCorrectEmpty: 0,
        currentWrong: 0,
        correctAnswer: 0,
        correctEmpty: 0,
        win: false,
    }
};

module.exports = GameProperties;
