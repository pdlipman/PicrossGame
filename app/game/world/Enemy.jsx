export class Enemy extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y, 'block');

        this.tint = 0xff0000;

        game.physics.arcade.enable(this);
        this.body.bounce.y = 0.0;
        this.body.gravity.y = 0;
        this.body.collidWorldBounds = true;
        this.anchor.setTo(0.5, 0.5);
        game.add.existing(this);

    }

    update() {

    }

}

module.exports = Enemy;