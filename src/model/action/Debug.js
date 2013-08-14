define(function(rqr) {

    var Action = rqr('model/Action');

    var Debug = function(options) {
        this.finished = false;
        this.message = ""
        Action.call(this,options);
    };
    Debug.prototype = Object.create(Action.prototype);

    Debug.prototype.entry = function(){
        console.log(this.message);
        this.finish();
    };

    Debug.prototype.run = function(){
    };

    return Debug;
});