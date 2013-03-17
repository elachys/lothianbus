app.livebustimes = {
    searchingFor: null,
    init: function(){
        app.livebustimes.loaded();
    },
    loaded: function(){
        /*
            var val = $(this).val();
            if(val.length < 4){
                return;
            }
            if(app.validate.stopcode(val)){
                app.livebustimes.searchBusStop(val);
            } else {
                app.maputils.autocomplete();
            }
        */
        app.maputils.initFullScreenMap('#livebus_map_canvas').bind('init', function(ev, map) {
            app.livebustimes.mapReady();
        });

    },
    displayStopsAround: function (lat, lng){
        $.getJSON(app.pipes.closestops + "&lat=" + lat + '&lng=' + lng + "&_callback=?", null, function(data) {
            var data = app.removePipes(data);
            if(data){
                app.maputils.addStopMarkers('#livebus_map_canvas', data.stops);
            }
        });
    },
    mapReady: function(){
        var $map = $('#livebus_map_canvas');
        app.maputils.addGpsMarker($map);
        app.livebustimes.displayStopsAround(user.lat, user.lng);
        
        $('#livebus_map_canvas').gmap('autocomplete', $('.search'), function(ui){
            var map = $('#livebus_map_canvas');
            map.gmap('clear','markers');
            map.gmap('clear', 'overlays');
            app.livebustimes.displayStopsAround(ui.item.position.mb, ui.item.position.nb);
            app.maputils.centerTo(map, ui.item.position.mb, ui.item.position.nb);
        });

    },
    byStop: function(code, callback){
        $.getJSON(app.pipes.bustimes + "&stopcode=" + code + "&_callback=?", null, callback);
    },
    searchBusStop: function(text){
        if(app.livebustimes.searchingFor == text){
            return false;
        }
        app.livebustimes.searchingFor = text;
        app.livebustimes.searchByCode(text);
    },
    searchByCode: function(code){
        app.livebustimes.clearTable();
        app.livebustimes.clearError();
        $.mobile.loading('show');
        app.livebustimes.byStop(code, function(data) {

            var data = app.removePipes(data);
            if(!data){
                app.livebustimes.displayError('invalid stop code');
                return false;
            }
            var table = $('#livebus_table tbody');
            for(i in data.services){
                var service = data.services[i];
                var tr = $('<tr />');
                var serviceName = $('<td />').text(service.service_name);
                var serviceDestination = $('<td />').text(service.times[0].destination);
                var serviceTime = $('<td />').text(service.times[0].mins + ' mins');

                tr.append(serviceName);
                tr.append(serviceDestination);
                tr.append(serviceTime);
                table.append(tr);
            }
            $.mobile.loading('hide');
        });
    },
    displayError: function(text){
        $('#livebustimes .error').text(text);
    },
    clearError: function(){
        $('#livebustimes .error').text('');
    },
    clearTable: function(){
        $('#livebus_table tbody').empty();
    }
}

$(document).bind('pageshow', function(){
    if($.mobile.activePage.attr("id") == 'livebustimes'){
        app.livebustimes.init();
    }
});
