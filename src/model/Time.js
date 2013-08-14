define(function(rqr) {

    var Time = function() {

    };

    Time.start = function() {
        Time.timer = new Timer();
        Time.timer.start();
    };

    Time.tick = function(){
        var secondsSinceStart =  Time.timer.seconds();
        if(Time.current){
            Time.deltaTime = secondsSinceStart-Time.current;
        }
        else {
            Time.deltaTime = 1/60;
        }

        Time.current = secondsSinceStart;
    };

    return Time;
});