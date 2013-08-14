define(function(rqr) {

    var Action = rqr('model/Action');
    var Time = rqr('model/Time');


    var Transition = function(options) {
        this.time = 0;
        this.name = "";
        Action.call(this,options);
    };
    Transition.prototype = Object.create(Action.prototype);

    Transition.prototype.entry = function(){
        var _this = this;
        setTimeout(function(){
            _this.event(_this.name);
        },this.time*1000);
    };

    return Transition;
});