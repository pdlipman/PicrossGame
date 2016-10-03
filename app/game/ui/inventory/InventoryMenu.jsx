import GameProperties from '../../main/GameProperties.jsx';


export default class InventoryMenu {
    constructor(game) {
        this.game = game;
        this.closed = true;
    }
}

InventoryMenu.prototype.create = function create() {
    const INVENTORY_STRING = 'Inventory';
    const inventoryLabel = this.game.add.text(
        GameProperties.screenWidth - 100,
        20,
        INVENTORY_STRING,
        {
            font: '24px Arial',
            fill: '#fff',
        });
    inventoryLabel.inputEnabled = true;
    inventoryLabel.events.onInputUp.add(this.toggleInventoryMenu, this);
};

InventoryMenu.prototype.toggleInventoryMenu = function toggleInventoryMenu() {
    if (this.closed) {
        const backpack = this.game.add.sprite(
            200,
            GameProperties.screenHeight / 2,
            'block'
        );

        backpack.width = 250;
        backpack.height = 400;

        backpack.anchor.setTo(0.5, 0.5);
        this.backpack = backpack;

        const characterSheet = this.game.add.sprite(
            GameProperties.screenWidth - 150,
            GameProperties.screenHeight / 2,
            'block'
        );

        characterSheet.width = 200;
        characterSheet.height = 400;

        characterSheet.anchor.setTo(0.5, 0.5);
        this.characterSheet = characterSheet;

        this.closed = false;
    } else {
        this.backpack.destroy();
        this.characterSheet.destroy();
        this.closed = true;
    }
};

module.exports = InventoryMenu;
