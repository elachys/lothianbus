
app.livebustimes = {
    searchingFor: null,
    init: function(){
        app.livebustimes.loaded();
    },
    loaded: function(){
        $('.search').live('change', function(e) {
            app.livebustimes.displayError(e.type);
        });
            return;
        $('.search').bind('change', function(){
           app.livebustimes.displayError('key event fired');
            var val = $(this).val();
            if(app.validate.stopcode(val)){
                app.livebustimes.searchBusStop(val);
            }
        });
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

        $.getJSON(app.pipes.bustimes + "&stopcode=" + code + "&_callback=?", null, function(data) {

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
                var serviceDestination = $('<td />').text(service.times[0].destination).text(service.times[0].mins + ' mins');
                tr.append(serviceName);
                tr.append(serviceDestination);
                table.append(tr);
            }

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
