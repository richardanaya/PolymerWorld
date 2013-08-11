define(function(rqr) {
    var Viewer = function(screenDom){
        // create an new instance of a pixi stage
        var stage = new PIXI.Stage(0x66FF99);

        // create a renderer instance
        var renderer = PIXI.autoDetectRenderer(400, 300, screenDom);

        requestAnimFrame( animate );



        function animate() {

            requestAnimFrame( animate );

            // render the stage
            renderer.render(stage);
        }

        this.stage = stage;
        this.cache = {};
    };

    Viewer.prototype.updateObject = function(obj){
        var o = this.cache["obj_"+obj.id];
        o.position.x = obj.x;
        o.position.y = obj.y;
    }

    Viewer.prototype.addObject = function(obj){

        // create a texture from an image path
        var texture = PIXI.Texture.fromImage(obj.texture);
        // create a new Sprite using the texture
        var bunny = new PIXI.Sprite(texture);

        // center the sprites anchor point
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        // move the sprite t the center of the screen
        bunny.position.x = obj.x;
        bunny.position.y = obj.y;

        this.stage.addChild(bunny);
        this.cache["obj_"+obj.id] = bunny;
    };

    return Viewer;
});