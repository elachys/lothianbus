app.livebustimes = {
    searchingFor: null,
    init: function(){
        app.livebustimes.loaded();
    },
    loaded: function(){
        $('.search').live('keyup', function(){
            var val = $(this).val();
            if(app.validate.stopcode(val)){
                app.livebustimes.searchBusStop(val);
            }
        });
        app.maputils.initFullScreenMap('#livebus_map_canvas').bind('init', function(ev, map) {
            app.livebustimes.mapReady();
        });

    },
    mapReady: function(){
        app.maputils.addGpsMarker('#livebus_map_canvas');
        $.getJSON(app.pipes.closestops + "&lat=" + user.lat + '&lng' + user.lng + "&_callback=?", null, function(data) {
            var data = app.removePipes(data);
            if(data){
                app.maputils.addStopMarkers('#livebus_map_canvas', data.stops);
            }

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
