define(function(rqr) {
    var Server = function(name){
        var _this = this;
        var peer = new Peer('oni9000', {key: 'lz6yk6yy4tg74x6r'});
        peer.on('connection', function(conn) {
            _this.conn = conn;
            conn.on('data', function(data){
                _this.processData(data);
            });
        });
    };

    Server.prototype.processData = function(data){
        var _this = this;
        console.log(data);
        if(data == "join"){
            this.bunny = {id:guid(),texture:"bunny.png",x:Math.random()*400,y:Math.random()*300};
            this.conn.send(JSON.stringify({type:"addObject",content:this.bunny}));
            setInterval(function() {
                _this.conn.send(JSON.stringify({type:"updateObject",content:{id:_this.bunny.id,x:Math.random()*400,y:Math.random()*300}}));
            },1000);
        }
    }

    return Server;
});