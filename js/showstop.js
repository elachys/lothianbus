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
