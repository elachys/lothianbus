function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var alertFallback = true;
   if (typeof console === "undefined" || typeof console.log === "undefined") {
     console = {};
     if (alertFallback) {
         console.log = function(msg) {
              alert(msg);
         };
     } else {
         console.log = function() {};
     }
   }
   
var user = {
    position: null,
    lat: null,
    lng: null
};

var app = {
    validate: {
        stopcode: function(code){
            return (code.length == 8 && isNumber(code));
        }
    },
    removePipes: function(data){
        return data.value.items[0];
    }
}

app.pipes = {
    bustimes: 'http://pipes.yahoo.com/pipes/pipe.run?_id=84213487dd2976daa76c23c43764b21d&_render=json'
}

app.location = {
    update: function(position){
        user.position = position;
        user.lat = position.coords.latitude;
        user.lng = position.coords.longitude;
    },
    listener: function(position){
        app.location.update(position);
        console.log(position);
    }
};

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(app.location.update, app.location.failed, {enableHighAccuracy: true});
    navigator.geolocation.watchPosition(app.location.listener, app.location.failed, {enableHighAccuracy: true});
} else {
    alert("Geolocation is not supported by this browser.");
}



