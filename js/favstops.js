app.favstops = {

    stops: null,

    init: function(){
        app.favstops.loaded();
    },
    loaded: function(){
        app.favstops.loadStopsFromStorage();
    },
    addStop: function(scode, name){
        if(typeof(app.favstops.stops) != 'object'){
            app.favstops.stops = {};
        }
        app.favstops.stops.scode = name;
    },
    removeStop: function(scode){
        app.favstops.stops.scode = null;
        app.favstops.saveStopsInLocalStorage();
    }
    getStopsFromStorage: function(){
        app.favstops.stops = eval('(' + localStorage.getItem('favstops') + ')');
    },
    saveStopsInLocalStorage: function(){
        localStorage.setItem('favstops', JSON.stringify(app.favstops.stops));
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
