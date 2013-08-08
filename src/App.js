rqr.config({
    baseUrl: 'src',
    paths: {
        text:'../lib/text'
    }
});

window.VirtualWorld = {
    loaded: false,
    onload: null
}

rqrjs(["Client","Server","text!test.html"], function(Client,Server,testWorld) {
    window.VirtualWorld = {
        Client: Client,
        Server: Server
    }
    $(document.body).append(testWorld);
    $(document.body).append('<vw-viewer world="test"></vw-viewer>');
});
