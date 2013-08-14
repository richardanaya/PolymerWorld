define(function(rqr) {
    var Component = rqr('model/Component');

    var FSM = function() {
        this.states = [];
        this.stateCache = {};
        this.transitions = [];
    };
    FSM.prototype = Object.create(Component.prototype);

    FSM.prototype.init = function(){
        for(var i = 0 ; i < this.states.length; i++){
            this.states[i].init();
        }
    };

    FSM.prototype.run = function(){
        if(!this.currentState && this.startState){
            this.changeState(this.startState);
        }
        if(this.currentState){
            if(!this.currentState.entered){
                this.currentState.entry();
            }
            this.currentState.run();
        }
    };

    FSM.prototype.event = function(name,state){
        for(var i = 0 ; i < this.transitions.length; i++){
            var t = this.transitions[i];
            if(t.name == name && t.source == state){
                this.changeState(t.destination);
                return;
            }
        }
    };

    FSM.prototype.changeState = function(state){
        var previousState = this.currentState;
        this.currentState = state;
        this.currentState.reset();
        if(previousState){
            previousState.reset();
        }
    };


    FSM.prototype.addTransition = function(transition){
        this.transitions.push(transition);
    };

    FSM.prototype.addState = function(state){
        if(!this.startState){
            this.startState = state;
        }
        this.states.push(state);
        this.stateCache["STATE_"+state.id] = state;
        state.fsm = this;
    };

    return FSM;
});