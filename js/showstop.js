app.showstop = {

    init: function(){
        app.showstop.loaded();
    },
    loaded: function(){
        var stop = qs('code');
        app.livebustimes.byStop(stop, app.showstop.fillLiveBuses);
    },
    fillLiveBuses: function(data){
        console.log(data);
            var data = app.removePipes(data);
            if(!data){
                app.livebustimes.displayError('invalid stop code');
                return false;
            }
            var table = $('#showstop_table tbody');
            for(i in data.services){
                var service = data.services[i];
                var tr = $('<tr />');
                var serviceName = $('<td />').text(service.service_name);
                var serviceTime = $('<td />');
                var serviceDestination = $('<td />');
                if(service.times){
                    serviceDestination.text(service.times[0].destination);
                    serviceTime.text(service.times[0].mins + ' mins');
                }
                tr.append(serviceName);
                tr.append(serviceDestination);
                tr.append(serviceTime);
                table.append(tr);
            }

    },
    displayError: function(text){
        $('#favstops .error').text(text);
    },
    clearError: function(){
        $('#favstops .error').text('');
    },
    clearTable: function(){
        $('#favstops_table tbody').empty();
    }
}

$(document).bind('pageshow', function(){
    if($.mobile.activePage.attr("id") == 'showstop'){
        app.showstop.init();
    }
});
