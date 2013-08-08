define(function(rqr) {
    var Server = function(){

    };

    Server.worlds = {};

    Server.createWorld = function(name){
        console.log("world created");
    }

    Server.join = function(world, callback){
        console.log("joining world");
        callback();
    };

    return Server;
});