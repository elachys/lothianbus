app.showstop = {

    init: function(){
        app.showstop.loaded();
    },
    loaded: function(){
        var stop = qs('code');
        app.livebustimes.byStop(stop, app.showstop.fillLiveBuses);
    },
    fillLiveBuses: function(data){
            var data = app.removePipes(data);
            if(!data){
                app.livebustimes.displayError('invalid stop code');
                return false;
            }
            var container = $('<ul />').data({'role': 'listview', 'inset': 'true'}).attr('id', 'showstopcontent');

            for(i in data.services){
                var service = data.services[i];
                var serviceHeader = $('<li />').data({'role': 'list-divider'}).text(service.service_name);
                serviceHeader.append($('<span />').addClass('ui-li-count').text('' + service.times.length));
                container.append(serviceHeader);

                if(service.times){
                    for(x in service.times){

                        var row = $('<li />');
                        $('<h2 />').text(service.times[x].destination).appendTo(row);

                        var right = $('<div />').addClass('ui-li-aside');
                        $('<p />').text(service.times[x].time).appendTo(right);
                        $('<p />').text(service.times[x].mins + ' mins').appendTo(right);

                        right.appendTo(row);
                        container.append(row);
                    }
                }

            }
            container.appendTo('.wrapper').listview();

    },
    displayError: function(text){
        $('#favstops .error').text(text);
    },
    clearError: function(){
        $('#favstops .error').text('');
    },
    clearTable: function(){
        $('#showstopcontent').remove();
    }
}

$(document).bind('pageshow', function(){
    if($.mobile.activePage.attr("id") == 'showstop'){
        app.showstop.init();
    }
});
