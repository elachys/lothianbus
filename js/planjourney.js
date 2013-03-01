function mapReady(){
var centerPosition = new google.maps.LatLng(user.lat, user.lng);

$('#plan_map_canvas').gmap('addMarker', {
    'position': centerPosition,
    'bounds': true,
    'icon': 'http://google-maps-icons.googlecode.com/files/sailboat-tourism.png' 
});




$('#plan_map_canvas').gmap('addMarker', {
    'position': centerPosition,
    'bounds': true,
    'icon': 'http://google-maps-icons.googlecode.com/files/sailboat-tourism.png' 
});

$('#plan_map_canvas').gmap('addShape', 'Circle', {
    'strokeColor': "#0000FF",
    'strokeOpacity': 0.8,
    'strokeWeight': 2,
    'fillColor': "#0000FF",
    'fillOpacity': 0.5,
    'center': centerPosition,
    'radius': user.position.coords.accuracy
});

}


function planJourneyLoaded(){
    $('#plan_map_canvas').height(($(document).height() - $('#plan_map_canvas').position().top));
    $('#plan_map_canvas').gmap({'center': user.lat + ',' + user.lng,'zoom': 12}).bind('init', function(ev, map) {

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

$(document).bind('pageshow', function(){
    if($.mobile.activePage.attr("id") == 'planjourney'){
        app.planjourney.init();
    }
});
