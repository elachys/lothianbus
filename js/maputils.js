app.maputils = {
    initFullScreenMap: function(selector, options){
        $(selector).height(($(document).height() - $(selector).position().top));
        return $(selector).gmap({'center': user.lat + ',' + user.lng,'zoom': 17});
    },
    centerTo: function (map, lat, lng){
        var center = new google.maps.LatLng(lat, lng);
        $(map).gmap('get','map').setOptions({'center':center});
    },
    addGpsMarker: function(selector){
        var centerPosition = new google.maps.LatLng(user.lat, user.lng);

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
            app.maputils.addStopMarker(selector, s);
        }
    },
    fillLiveBuses: function(t, data){
        var data = app.removePipes(data);
        if(!data){
            app.livebustimes.displayError('unable to get times');
            return false;
        }

        var services = data.services;
        if(services == null){
            console.log('no services');
            return false;
        }
        if(services.service_name){
            services = [services];
        }
        for(i in services){
            var service = services[i];
            var time = $('td.service-' + service.service_name).siblings('td.time');
            $(time).text(service.times[0].time);
        }

    },
    stopInfoWindow: function(data){
        var wrapper = $('<div />').addClass('infowrapper');

        $('<a href="favstops.html?add=' + data.stop_code + '&stopname=' + encodeURIComponent(data.stop_name) + '" data-role="button" data-iconpos="notext" data-icon="star">fav</a>').button().appendTo(wrapper);
        function drawRow(t, service){
            var td = $('<td />').addClass('service-' + service).text(service);
            var time = $('<td />').addClass('time').text('-');
            t.append($('<tr />').append(td).append(time));
        }
        var t = $('<table />').addClass('info-table');
        if(typeof(data.service_list) == 'object'){
            for(i in data.service_list){
                drawRow(t, data.service_list[i]);
            }
        } else if(!isNaN(data.service_list) && data.service_list.length > 0) {
            drawRow(t, data.service_list);
        }

        app.livebustimes.byStop(data.stop_code, $.proxy(function(data) { app.maputils.fillLiveBuses(t, data); }));
        wrapper.append(t);
        return wrapper;
    },
    addStopMarker: function(selector, data){
        var pos = new google.maps.LatLng(data.latitude, data.longitude);
        $(selector).gmap('addMarker', {
            position: pos,
            'bounds': false,
            'icon': 'img/markers-small-' + data.direction.toUpperCase() + '.png'
        }).click(function(){

            $(selector).gmap('openInfoWindow', { 'content': app.maputils.stopInfoWindow(data).prop('outerHTML') }, this);
        });
    },
    autocomplete: function(ui){

        console.log(ui);
    }

};



( function($) {

    $.extend($.ui.gmap.prototype, {
        /**
         * Autocomplete using Google Geocoder
         * @param panel:string/node/jquery
         * @param callback:function(ui) called whenever something is selected
         */
        autocomplete: function(panel, callback) {
            var self = this;
            $(this._unwrap(panel)).autocomplete({
                messages: {
                    results: function(){ return ''; }
                },
                appendTo: $(panel).closest('form'),
                source: function( request, response ) {
                    self.search({
                        'address':request.term + ', edinburgh',
                        'region': 'gb' 
                }, function(results, status) {
                        if ( status === 'OK' ) {
                            results = results.slice(0,3);
                            response( $.map( results, function(item) {
                                return { label: item.formatted_address, value: item.formatted_address, position: item.geometry.location }
                            }));
                        }
                    });
                },
                minLength: 4,
                select: function(event, ui) { 
                    self._call(callback, ui);
                },
                open: function() {
                    $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top");
                    $('.ui-autocomplete, .autocomplete').removeClass('ui-autoocomplete ui-front ui-menu ui-widget ui-widget-content').addClass('autocomplete').data({
                        'role': 'listview',
                        'inset': 'true'
                    }).listview().listview('refresh').css('left','0'); },
                close: function() { $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
                 }
            });
        }

    });

} (jQuery) );