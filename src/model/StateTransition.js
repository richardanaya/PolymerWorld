define(function(rqr) {

    var StateTransition = function(name,source,destination){
        this.name = name;
        this.source= source;
        this.destination = destination;
    };

    return StateTransition;
});