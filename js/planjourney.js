app.planjourney = {
    init: function(){
        app.maputils.initFullScreenMap('#plan_map_canvas').bind('init', function(ev, map) {
            app.planjourney.mapReady();
        });
    },
    mapReady: function(){
        app.maputils.addGpsMarker('#plan_map_canvas');
    }
}

$(document).bind('pageshow', function(){
    if($.mobile.activePage.attr("id") == 'planjourney'){
        app.planjourney.init();
    }
});
