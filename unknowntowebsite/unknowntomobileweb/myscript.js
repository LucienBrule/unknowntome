    function init() {
        initialize();
    }

    function initialize() {
        var latLng = new google.maps.LatLng(0, 0);
        var styles = [{
            stylers: [{
                hue: "#c0392b"
            }, {
                saturation: 5
            }]
        }, {
            featureType: "road",
            elementType: "geometry",
            stylers: [{
                lightness: 100
            }, {
                visibility: "simplified"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }];

        var styledMap = new google.maps.StyledMapType(styles, {
            name: "Styled Map"
        });

        var map = new google.maps.StyledMapType(document.getElementById("map"), myOptions);
        var myOptions = {
            center: latLng,
            zoom: 16,
            maxZoom: 20,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
        };
        var map = new google.maps.Map(document.getElementById('map'),
            myOptions);
        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        // Try W3C Geolocation (Preferred)
        if (navigator.geolocation) {
            browserSupportFlag = true;
            navigator.geolocation.getCurrentPosition(function(position) {
                initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.setCenter(initialLocation);
            }, function() {
                handleNoGeolocation(browserSupportFlag);
            });
        } else {
            // Browser doesn't support Geolocation
            alert("Please enable your location");
        }


        $.getJSON("https://unknownto.me/api/quirks/all", function(data) {
            putOnMap(data);
        });
        $.getJSON("https://unknownto.me/api/parkingspots/all", function(data) {
            putParkingOnMap(data);
        });
        $.getJSON("https://unknownto.me/api/bathrooms/all", function(data) {
            putOnMap(data);
        });
        $.getJSON("https://unknownto.me/api/waterfountains/all", function(data) {
            putOnMap(data);
        });
        $.getJSON("https://unknownto.me/api/meetinglocations/all", function(data) {
            putOnMap(data);
        });
    

        function putParkingOnMap(json) {
            for (i = 0; i < json.length; i++) {
                var location = json[i].start.toString().split(',')
                var latitude1 = +location[0].toString();
                var longitude1 = +location[1].toString();
                var location = json[i].stop.toString().split(',')
                var latitude2 = +location[0].toString();
                var longitude2 = +location[1].toString();
                var linepoints = [{
                    lat: latitude1,
                    lng: longitude1
                }, {
                    lat: latitude2,
                    lng: longitude2
                }];
                var parkingline = new google.maps.Polyline({
                    path: linepoints,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 3
                });
                parkingline.setMap(map)
            }
        }

        function putOnMap(json) {
            for (i = 0; i < json.length; i++) {
                var location = json[i].geoloc.toString().split(',');
                var latitude = +location[0].toString();
                var longitude = +location[1].toString();
                var c = "fillme";
                if (json[i].title != 'undefined') {
                    if (json[i].description != 'undefined') {
                        c = "<b>" + json[i].title.toString() + "</b><br><center><p style=\"width:12em;\">" + json[i].description.toString() + "</p><center>"
                    } else {
                        c = json[i].title.toString()

                    }
                } else {
                    c = "?";
                }
                var marker = new google.maps.Marker({
                    position: {
                        lat: latitude,
                        lng: longitude
                    },
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 5,
                        strokeWeight: 1,
                        fillColor: 'red',
                        fillOpacity: 0.2
                    },
                    map: map,
                    info: c,
                    animation: google.maps.Animation.DROP
                });

                marker.addListener('click', function() {
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                });
                google.maps.event.addListener(marker, 'click', function(marker) {
                        map.panTo(marker.latLng);
                });
            }
        }
    }