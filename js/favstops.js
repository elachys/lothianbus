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
        for(i in stops){
            var tr = $('<tr />');
            var td = $('<td />').text(stops[i]);
            var btn = $('<a href="showstop.html?code='+ i + '" data-role="button" data-iconpos="notext" data-icon="arrow-r">go</a>').button();
            var td2 = $('<td />');
            btn.appendTo(td2);
            tr.append(td);
            tr.append(td2);
            $('.favorite_stops tbody').append(tr);
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
    if($.mobile.activePage.attr("id") == 'favstops'){
        app.favstops.init();
    }
});
