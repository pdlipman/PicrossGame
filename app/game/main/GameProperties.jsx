const GameProperties = {
    screenWidth: 640,
    screenHeight: 480,

    tiles: {
        targetTile: null,
        tileWidth: 32,
        tileHeight: 32,
        tilePadding: 4,
    },
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
        beginState: 'picross-board', // for testing
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
        pointerStartLocationX: 0,
        pointerStartLocationY: 0,
        selectedTiles: [],
        dragEvent: false,
    },
};

module.exports = GameProperties;
