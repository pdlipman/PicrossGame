const GameProperties = require('../../main/GameProperties.jsx');


export class InventoryMenu {
    constructor(game) {
        this.game = game;
        this.closed = true;
    }
}

InventoryMenu.prototype.create = function () {
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

InventoryMenu.prototype.toggleInventoryMenu = function () {
    if (this.closed) {
        const menu = this.game.add.sprite(
            GameProperties.screenWidth / 2,
            GameProperties.screenHeight / 2,
            'block'
        );

        menu.width = 300;
        menu.height = 100;

        menu.anchor.setTo(0.5, 0.5);
        this.menu = menu;
        this.closed = false;
    } else {
        this.menu.destroy();
        this.closed = true;
    }
    console.log("Inv: " + this.closed);

};

module.exports = InventoryMenu;