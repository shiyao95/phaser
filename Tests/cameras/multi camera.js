/// <reference path="../../Phaser/Game.ts" />
(function () {
    var game = new Phaser.Game(this, 'game', 800, 600, init, create, update, render);

    var zombieCamera;

    var zombie;
    var walkSpeed = 2,
        direction = 1;

    function init() {
        game.world.setSize(1280, 600, true);
        game.load.image('ground', 'assets/tests/ground-2x.png');
        game.load.image('river', 'assets/tests/river-2x.png');
        game.load.image('sky', 'assets/tests/sky-2x.png');

        game.load.spritesheet('zombie', 'assets/sprites/metalslug_monster39x40.png', 39, 40);

        game.load.start();
    }
    function create() {
        // background images
        game.add.sprite(0, 0, 'sky');
        game.add.sprite(0, 360, 'ground');
        game.add.sprite(0, 400, 'river');

        // zombie spirte
        zombie = game.add.sprite(480, 336, 'zombie');
        zombie.animations.add('walk', null, 30, true);
        zombie.animations.play('walk');

        // create a small camera which looks at the zombie
        zombieCamera = game.add.camera(0, 0, 800, 600);
        zombieCamera.x = 420;
        zombieCamera.y = 240;
        zombieCamera.setPosition(0, 0);
        zombieCamera.setSize(200, 200);
    }
    function update() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            zombieCamera.x -= 2;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            zombieCamera.x += 2;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            zombieCamera.y -= 2;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            zombieCamera.y += 2;
        }
        // zombie wandering update
        zombie.x += walkSpeed * direction;
        if (zombie.x > 540 || zombie.x < 440) {
            direction *= -1;
            zombie.transform.scale.setTo(direction, 1);
        }
    }
    function render() {
        game.camera.renderDebugInfo(32, 32);
        zombieCamera.renderDebugInfo(32, 128);
    }
})();
