define(function(rqr) {

    var Game = rqr("model/Game");
    var Scene = rqr("model/Scene");
    var Actor = rqr("model/Actor");
    var FSM = rqr("model/FSM");
    var State = rqr("model/State");
    var StateTransition = rqr("model/StateTransition");
    var Time = rqr("model/Time");
    var Debug = rqr("model/action/Debug");
    var Rotate = rqr("model/action/Rotate");
    var Move = rqr("model/action/Move");
    var Transition = rqr("model/action/Transition");
    
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
            var currentScene = null;
            var objectCache = {};

            var gameCreated = function(game){

                Time.start();
                var stats = new Stats();
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.left = '0px';
                stats.domElement.style.top = '0px';

                var run = function(){
                    setImmediate(run);
                    Time.tick();
                    game.run();
                    stats.update();
                };

                run();

                document.body.appendChild(stats.domElement);

                _this.conn.send(JSON.stringify({type:"gameCreated"}));
            };

            var onObjectChange = function(obj,property,value,oldValue){
                if(property == "position"){
                    _this.conn.send(JSON.stringify({type:"objectChange", content:{
                        id: obj.id,
                        name: "position",
                        value: {x:obj.position.x,y:obj.position.y,z:obj.position.z}
                    }}));
                }
                if(property == "rotation"){
                    _this.conn.send(JSON.stringify({type:"objectChange", content:{
                        id: obj.id,
                        name: "rotation",
                        value: {x:obj.rotation.x,y:obj.rotation.y,z:obj.rotation.z}
                    }}));
                }
            };

            var objectLoading = function(obj){
                _this.conn.send(JSON.stringify({type:"objectLoading", content:{
                    id: obj.id,
                    position: {x:obj.position.x,y:obj.position.y,z:obj.position.z},
                    rotation: {x:obj.rotation.x,y:obj.rotation.y,z:obj.rotation.z}
                }}));
                obj.emitter.on("change",onObjectChange)
            };

            var sceneLoading = function(scene){
                _this.conn.send(JSON.stringify({type:"sceneLoading"}));
                scene.emitter.on("objectLoading",objectLoading)
            };

            var game = new Game();
            var s = new Scene();
            var a = new Actor();
            a.setPosition({x:0,y:100,z:0})

            var fsm = new FSM();

            var stateA = new State();

            stateA.addAction(new Debug({message: "state A"}));
            stateA.addAction(new Rotate({rotation:{x:1,y:1,z:0}}));
            stateA.addAction(new Move({distance:{x:0,y:100,z:0}}));
            stateA.addAction(new Transition({time:1, name:"switch"}));
            fsm.addState(stateA);

            var stateB = new State();
            stateB.addAction(new Debug({message: "state B"}));
            stateB.addAction(new Rotate({rotation:{x:-1,y:-1,z:0}}));
            stateB.addAction(new Move({distance:{x:0,y:-100,z:0}}));
            stateB.addAction(new Transition({time:1, name:"switch"}));
            fsm.addState(stateB);

            fsm.addTransition( new StateTransition("switch",stateA,stateB));
            fsm.addTransition( new StateTransition("switch",stateB,stateA));

            a.addComponent(fsm);
            s.addActor(a);
            a = new Actor();
            a.setPosition({x:0,y:-100,z:0})
            s.addActor(a);
            game.addScene(s);
            game.emitter.on("gameCreated", gameCreated);
            game.emitter.on("sceneLoading",sceneLoading)
            game.init();
        }
    }

    return Server;
});