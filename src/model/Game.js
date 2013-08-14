define(function(rqr) {
    var Game = function() {
        this.emitter = LucidJS.emitter();
        this.scenes = [];
    };

    Game.prototype.init = function(){
        this.emitter.trigger("gameCreated",this);
        this.loadScene(this.scenes[0]);
    };

    Game.prototype.loadScene = function(scene){
        this.currentScene = scene;
        this.emitter.trigger("sceneLoading",scene);
        this.currentScene.init();
    };

    Game.prototype.run = function() {
        for(var i = 0 ; i < this.scenes.length; i++){
            this.scenes[i].run();
        }
    };

    Game.prototype.addScene = function(scene) {
        this.scenes.push(scene);
        scene.game = this;
    };

    return Game;
});