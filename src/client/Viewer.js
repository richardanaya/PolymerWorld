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
    };

    Viewer.prototype.addObject = function(){

        // create a texture from an image path
        var texture = PIXI.Texture.fromImage("bunny.png");
        // create a new Sprite using the texture
        var bunny = new PIXI.Sprite(texture);

        // center the sprites anchor point
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        // move the sprite t the center of the screen
        bunny.position.x = Math.random()*400;
        bunny.position.y = Math.random()*300;

        this.stage.addChild(bunny);
    };

    return Viewer;
});