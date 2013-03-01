var user = {
    position: null,
    lat: null,
    lng: null
};

var app = {}



app.location = {
    listener: function(position){
        user.position = position;
        user.lat = position.coords.latitude;
        user.lng = position.coords.longitude;
    },
};

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(app.location.listener, app.location.failed, {enableHighAccuracy: true});
} else {
    alert("Geolocation is not supported by this browser.");
}
