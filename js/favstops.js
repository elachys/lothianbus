app.favstops = {

    stops: null,

    init: function(){
        app.favstops.loaded();
    },
    loaded: function(){
        var stop = qs('add');
        var name = qs('stopname');
        if(stop){
            app.favstops.addStop(stop, name);
        }
        app.favstops.showFavStops();

    },
    addStop: function(scode, name){
        if(app.favstops.stops == null){
            app.favstops.stops = {};
        }
        app.favstops.stops[scode] = name;
        app.favstops.saveStopsInLocalStorage();
    },
    removeStop: function(scode){
        app.favstops.stops.scode = null;
        app.favstops.saveStopsInLocalStorage();
    },
    getStopsFromStorage: function(){
        app.favstops.stops = eval('(' + localStorage.getItem('favstops') + ')');
        return app.favstops.stops;
    },
    saveStopsInLocalStorage: function(){
        localStorage.setItem('favstops', JSON.stringify(app.favstops.stops));
    },
    showFavStops: function(){
        var stops = app.favstops.getStopsFromStorage();
        var container = $('<ul />').data({'role': 'listview', 'inset': 'true'}).attr('id', 'showfavcontent');

        for(i in stops){
            var row = $('<li />');
            $('<a />').attr('href', 'showstop.html?code='+ i).data({
                'inline': 'true'}).text(stops[i]).appendTo(row);

            container.append(row);
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
        $('.wrapper').empty();
    }
}

$(document).bind('pageshow', function(){
    if($.mobile.activePage.attr("id") == 'favstops'){
        app.favstops.init();
    }
});
