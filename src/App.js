var App = (function () {
    function App() {
        this.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio - 15, window.innerHeight * window.devicePixelRatio / 1.6, Phaser.AUTO, "content", {
            preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render
        });
    }
    App.prototype.preload = function () {
        console.log("== preload ==");
        this.game.load.crossOrigin = true;
        this.game.load.spritesheet("uniqueKey", "../images/spritesheets/boy1-idle.png", 132, 185);
        this.game.load.spritesheet("uniqueKey2", "../images/spritesheets/boy2-idle.png", 132, 185);
        this.game.load.spritesheet("uniqueKey3", "../images/spritesheets/zombie1-idle.png", 172, 182);
    };
    App.prototype.create = function () {
        console.log("== create ==");
        this.man1 = this.game.add.sprite(0, 0, "uniqueKey", 0);
        this.man1.animations.add("idle");
        this.man1.position.y = 200;
        this.man1.play("idle", 30, true);
        this.man2 = this.game.add.sprite(0, 0, "uniqueKey2", 0);
        this.man2.animations.add("idle");
        this.man2.position.x = 300;
        this.man2.position.y = 200;
        this.man2.play("idle", 30, true);
        this.zomb1 = this.game.add.sprite(0, 0, "uniqueKey3", 0);
        this.zomb1.animations.add("idle");
        this.zomb1.position.x = 120;
        this.zomb1.position.y = 200;
        this.zomb1.play("idle", 30, true);
    };
    App.prototype.update = function () {
    };
    App.prototype.render = function () {
    };
    return App;
}());
window.onload = function () {
    var game = new App();
};
//# sourceMappingURL=App.js.map