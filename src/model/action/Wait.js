define(function(rqr) {

    var Action = rqr('model/Action');
    var Time = rqr('model/Time');


    var Wait = function(options) {
        this.time = 0;
        Action.call(this,options);
    };
    Wait.prototype = Object.create(Action.prototype);

    Wait.prototype.entry = function(){
        var _this = this;
        setTimeout(function(){
            _this.finish();
        },this.time*1000);
    };

    return Wait;
});