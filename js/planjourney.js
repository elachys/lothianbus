function mapReady(){
//    alert('maploaded');
}


function planJourneyLoaded(){
    $('#plan_map_canvas').height(($(document).height() - $('#plan_map_canvas').position().top));
    var zoom = user.position.coords.accuracy;
    alert(zoom);
    console.log(zoom);
    $('#plan_map_canvas').gmap({'center': user.lat + ',' + user.lng,'zoom': zoom}).bind('init', function(ev, map) {
        app.planjourney.mapReady();
    });
}

app.planjourney = {
    init: function(){
        planJourneyLoaded();
    },
    mapReady: function(){
        mapReady();
    }
}