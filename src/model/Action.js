define(function(rqr) {


    var Action = function(options) {
        this.finished = false;
        for(var i in options){
            this[i] = options[i];
        }
    }

    Action.prototype.finish = function(){
        this.finished = true;
    };

    Action.prototype.init = function(){

    };

    Action.prototype.entry = function(){

    };

    Action.prototype.run = function(){

    };

    Action.prototype.event = function(name){
        this.state.fsm.event(name,this.state);
    };

    Action.prototype.reset = function(){
        this.finished = false;
    };

    return Action;
});