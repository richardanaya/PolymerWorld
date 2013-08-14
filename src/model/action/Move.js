define(function(rqr) {

    var Action = rqr('model/Action');
    var Time = rqr('model/Time');


    var Move = function(options) {
        this.distance = {x: 0, y:0, z:0};
        Action.call(this,options);
    };
    Move.prototype = Object.create(Action.prototype);

    Move.prototype.run = function(){
        var actor = this.state.fsm.actor;
        actor.move({x:Time.deltaTime*this.distance.x,y:Time.deltaTime*this.distance.y,z:Time.deltaTime*this.distance.z});
    };

    return Move;
});