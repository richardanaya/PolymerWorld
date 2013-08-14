define(function(rqr) {


    var Actor = function() {
        this.emitter = LucidJS.emitter();
        this.id = guid();
        this.position = {x:0,y:0,z:0};
        this.rotation = {x:0,y:0,z:0};
        this.components = [];
    };

    Actor.prototype.init = function(){
        for(var i = 0 ; i < this.components.length; i++){
            this.components[i].init();
        }
    };

    Actor.prototype.addComponent = function(component) {
        this.components.push(component);
        component.actor = this;
    };

    Actor.prototype.setPosition = function(component){
        this.components.push(component);
    };

    Actor.prototype.setPosition = function(position){
        var oldValue = this.position;
        this.position = position;
        this.emitter.trigger("change",this,"position",position,oldValue);
    };

    Actor.prototype.setRotation = function(rotation){
        var oldValue = this.rotation;
        this.rotation = rotation;
        this.emitter.trigger("change",this,"rotation",rotation,oldValue);
    };

    Actor.prototype.rotate = function(rotation){
        this.setRotation({x:this.rotation.x+rotation.x,y:this.rotation.y+rotation.y,z:this.rotation.z+rotation.z})
    };

    Actor.prototype.move = function(distance){
        this.setPosition({x:this.position.x+distance.x,y:this.position.y+distance.y,z:this.position.z+distance.z})
    };

    Actor.prototype.run = function(){
        for(var i = 0 ; i < this.components.length; i++){
            this.components[i].run();
        }
    };

    return Actor;
});