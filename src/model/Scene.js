
define(function(rqr) {

    var Scene = function() {
        this.emitter = LucidJS.emitter();
        this.actors = [];
    };


    Scene.prototype.init = function() {
        for(var i = 0 ; i < this.actors.length; i++){
            this.emitter.trigger("objectLoading",this.actors[i]);
            this.actors[i].init();
        }
    }

    Scene.prototype.run = function() {
        for(var i = 0 ; i < this.actors.length; i++){
            this.actors[i].run();
        }
    };

    Scene.prototype.addActor = function(actor) {
        this.actors.push(actor);
        actor.scene = this;
    };

    return Scene;
});