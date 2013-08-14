define(function(rqr) {

    var State = function(){
        this.actions = [];
        this.executed = false;
        this.entered = false;
        this.id = guid();
    };

    State.prototype.init = function(){
        for(var i = 0 ; i < this.actions.length; i++){
            this.actions[i].init();
        }
    };

    State.prototype.run = function(){
        var finished = true;
        if(!this.executed){
            for(var i = 0 ; i < this.actions.length; i++){
                if(!this.actions[i].finished){
                    this.actions[i].run();
                    if(!this.actions[i].finished){
                        finished = false;
                    }
                }
            }
            if(finished){
                this.executed = true;
                this.fsm.event("finish",this);
            }
        }
    };

    State.prototype.entry = function() {
        for(var i = 0 ; i < this.actions.length; i++){
            this.actions[i].entry();
        }
        this.entered = true;
    };

    State.prototype.reset = function() {
        this.executed = false;
        this.entered = false;
        for(var i = 0 ; i < this.actions.length; i++){
            this.actions[i].reset();
        }
    };

    State.prototype.addAction = function(action){
        this.actions.push(action);
        action.state = this;
    };
    return State;
});