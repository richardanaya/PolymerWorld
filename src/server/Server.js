define(function(rqr) {
    var Server = function(name){
        var _this = this;
        var peer = new Peer('oni9000', {key: 'lz6yk6yy4tg74x6r'});
        peer.on('connection', function(conn) {
            conn.on('data', function(data){
                _this.processData(conn,data);
            });
        });
    };

    Server.prototype.processData = function(conn,data){
        console.log(data);
        if(data == "join"){
            conn.send("bunny");
        }
    }

    return Server;
});