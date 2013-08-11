define(function(rqr) {
    var Viewer = rqr('client/Viewer');

    var Client = function(screenDom){
        this.viewer = new Viewer(screenDom);
    };

    Client.prototype.processData = function(data){
        console.log("processing data: " + data)
        var msg = JSON.parse(data);
        if(msg.type == "addObject"){
            this.viewer.addObject(msg.content);
        }
        if(msg.type == "updateObject"){
            this.viewer.updateObject(msg.content);
        }
    };

    Client.prototype.join = function(world){
        var _this = this;
        var peer = new Peer('samurai9000', {key: 'lz6yk6yy4tg74x6r'});
        var conn = peer.connect('oni9000');
        conn.on('open', function(){
            conn.send('join');
        });
        conn.on('data', function(data){
            _this.processData(data);
        });
    };

    return Client;
});