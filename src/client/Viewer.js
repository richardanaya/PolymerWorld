define(function (rqr) {

    var currentScene = null;
    var objectCache = {};

    var Viewer = function (screenDom) {
    };

    Viewer.prototype.gameCreated = function (game) {
        var camera, scene, renderer;
        var geometry, material, mesh;

        var stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        init();
        animate();


        document.body.appendChild(stats.domElement);

        function init() {

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.z = 1000;

            renderer = new THREE.CanvasRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);

            document.body.appendChild(renderer.domElement);

        }


        function animate() {
            // note: three.js includes requestAnimationFrame shim
            requestAnimationFrame(animate);
            if (currentScene) {
                renderer.render(currentScene, camera);
            }
            stats.update();
        }
    };

    Viewer.prototype.objectChange = function (content) {
        var name = content.name;
        var value = content.value;
        var id = content.id;
        var cobj = objectCache["OBJ_" + id];
        if ( name == "position") {
            cobj.position.x = value.x;
            cobj.position.y = value.y;
            cobj.position.z = value.z;
        }
        if ( name == "rotation") {
            cobj.rotation.x = value.x;
            cobj.rotation.y = value.y;
            cobj.rotation.z = value.z;
        }
    };

    Viewer.prototype.objectLoading = function (content) {
        geometry = new THREE.CubeGeometry(200, 200, 200);
        material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

        mesh = new THREE.Mesh(geometry, material);
        currentScene.add(mesh);
        objectCache["OBJ_" + content.id] = mesh;
        mesh.position.x = content.position.x;
        mesh.position.y = content.position.y;
        mesh.position.z = content.position.z;
        mesh.rotation.x = content.rotation.x;
        mesh.rotation.y = content.rotation.y;
        mesh.rotation.z = content.rotation.z;
    };

    Viewer.prototype.sceneLoading = function (scene) {
        currentScene = new THREE.Scene();
    };

    return Viewer;
});