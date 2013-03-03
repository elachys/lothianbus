app.maputils = {
    initFullScreenMap: function(selector, options){
        $(selector).height(($(document).height() - $(selector).position().top));
        return $(selector).gmap({'center': user.lat + ',' + user.lng,'zoom': 17});
    },
    addGpsMarker: function(selector){
        var centerPosition = new google.maps.LatLng(user.lat, user.lng);

        $(selector).gmap('addMarker', {
            'position': centerPosition,
            'bounds': false,
            'icon': 'http://google-maps-icons.googlecode.com/files/sailboat-tourism.png' 
        });


        $(selector).gmap('addMarker', {
            'position': centerPosition,
            'bounds': false,
            'icon': 'http://google-maps-icons.googlecode.com/files/sailboat-tourism.png' 
        });

        $(selector).gmap('addShape', 'Circle', {
            'strokeColor': "#0000FF",
            'strokeOpacity': 0.8,
            'strokeWeight': 2,
            'fillColor': "#0000FF",
            'fillOpacity': 0.5,
            'center': centerPosition,
            'radius': user.position.coords.accuracy
        });
    },
    addStopMarkers: function(selector, stops){
        for(i in stops){
            var s = stops[i];
            app.maputils.addStopMarker(selector, s.latitude, s.longitude, s.direction);
        }
    },
    addStopMarker: function(selector, lat, lng, direction){
        var pos = new google.maps.LatLng(lat, lng);
        $(selector).gmap('addMarker', {
            position: pos,
            'bounds': false,
            'icon': 'img/markers-small-' + direction.toUpperCase() + '.png'
        });
    }

};