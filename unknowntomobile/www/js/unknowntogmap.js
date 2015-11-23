angular.module('ionic.example', ['ionic'])
.controller('MapCtrl', function($scope,$http, $ionicLoading, $compile) {
    $scope.currenttitle = "yo";
    $scope.currentcardcontent = 'you cant see me'
    function initialize() {
        console.log("initialize")
        var latLng = new google.maps.LatLng(42.7301729, -73.6875558);
        var styles = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#073642"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#002b36"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#002b36"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2b36c1"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#586e75"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#6c71c4"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#839496"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#586e75"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#686a2d"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": "-7"
            },
            {
                "color": "#856600"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#657b83"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#dc322f"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#b58900"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    }
];
        // var styles = [{
        //     stylers: [{
        //         hue: "#c0392b"
        //     }, {
        //         saturation: 5
        //     }]
        // }, {
        //     featureType: "road",
        //     elementType: "geometry",
        //     stylers: [{
        //         lightness: 100
        //     }, {
        //         visibility: "simplified"
        //     }]
        // }, {
        //     featureType: "road",
        //     elementType: "labels",
        //     stylers: [{
        //         visibility: "off"
        //     }]
        // }];

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
                globaluserlocation = position;
            }, function() {
                handleNoGeolocation(browserSupportFlag);
            });
        } else {
            // Browser doesn't support Geolocation
            alert("Please enable your location");
        }

        $http.get("https://unknownto.me/api/quirks/all")
            .success(function(data) {console.log("data",data);$scope.putOnMap(data);});
        $http.get("https://unknownto.me/api/parkingspots/all")
            .success(function(data) {console.log("data",data);$scope.putParkingOnMap(data);});
        $http.get("https://unknownto.me/api/bathrooms/all")
            .success(function(data) {console.log("data",data);$scope.putOnMap(data);});
        $http.get("https://unknownto.me/api/waterfountains/all")
            .success(function(data) {console.log("data",data);$scope.putOnMap(data);});
        $http.get("https://unknownto.me/api/meetinglocations/all")
            .success(function(data) {console.log("data",data);$scope.putOnMap(data);});

        $scope.map = map;
    }

    $scope.putParkingOnMap = function(json) {
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
                strokeColor: '#859900',
                strokeOpacity: 1.0,
                strokeWeight: 4
            });
            parkingline.setMap($scope.map)
        }
    }

    $scope.putOnMap = function(json) {
        /** FIX for Bootstrap and Google Maps Info window styes problem **/
        var css = document.createElement('style');
        css.type = 'text/css';
        var styles = 'img[src*="gstatic.com/"], img[src*="googleapis.com/"] { max-width: none; }';
        if (css.styleSheet) css.styleSheet.cssText = styles;
        else css.appendChild(document.createTextNode(styles));
        document.getElementsByTagName("head")[0].appendChild(css);
        //~fix

        for (i = 0; i < json.length; i++) {
            if (json[i] == 'undefined') {
                continue;
            }
            var location = json[i].geoloc.toString().split(',');
            var latitude = +location[0].toString();
            var longitude = +location[1].toString();
            var c = "fillme";
            if (typeof json[i].title !== 'undefined') {
                if (typeof json[i].description !== 'undefined') {
                    c = '<div style ="color = black"><b>"' + json[i].title.toString() + '"</b><br><center><p style=\"width:12em;\">"' + json[i].description.toString() + '"</p><center></div>'
                    infoWindow = new google.maps.InfoWindow({
                        content: c
                    });
                } else {
                    c = json[i].title.toString()
                    infoWindow = new google.maps.InfoWindow({
                        content: c
                    });

                }
            } else {
                c = "?";
                infoWindow = new google.maps.InfoWindow({
                    content: c
                });
            }
            var marker = new google.maps.Marker({
                position: {
                    lat: latitude,
                    lng: longitude
                },
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    strokeWeight: 0,
                    fillColor: '#d33682',
                    fillOpacity: 0.5
                },
                map: $scope.map,
                info: c,
                animation: google.maps.Animation.DROP
            });

            marker.addListener('click', function() {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function() {
                        marker.setAnimation(null);
                    }, 300);
                }
            });
            google.maps.event.addListener(marker, 'click', function(marker) {
                this.scale = new google.maps.Size(50, 50);
                // infoWindow.setContent(this.info);
                // $compile(infowindow.content)($scope);
                // infoWindow.open($scope.map, this);
                document.getElementById("infocontainer").innerHTML = "<div id='infocard' class='item item-text-wrap'>"+this.info+"</div>";
                $scope.carddisplay = 'visible'
                $scope.map.setCenter(marker.latLng);
            });
        }
    }
    google.maps.event.addDomListener(window, 'load', initialize);

    $scope.centerOnMe = function() {
        $scope.currentcardcontent = "Nigga we moving!";
        console.log("CenterOnMe")
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
}); //end of controller

