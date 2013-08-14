
define(function(rqr) {

    var Action = rqr('model/Action');
    var Time = rqr('model/Time');

    var Rotate = function(options) {
        this.rotation = {x: 0, y:0, z:0};
        Action.call(this,options);
    };
    Rotate.prototype = Object.create(Action.prototype);

    Rotate.prototype.run = function(){
        var actor = this.state.fsm.actor;
        actor.rotate({x:Time.deltaTime*this.rotation.x,y:Time.deltaTime*this.rotation.y,z:Time.deltaTime*this.rotation.z});
    };

    return Rotate;
});