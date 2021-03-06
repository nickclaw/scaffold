angular.module('scaffold').directive('map', [
    'leaflet',
    function(leaflet) {
        return {
            restrict: "E",
            scope: {
                options: "="
            },
            link: function($scope, elem, attr) {
                var map = new leaflet.Map(elem[0], {
                    dragging: false,
                    touchZoom: false,
                    scrollWheelZoom: false,
                    doubleClickZoom: false,
                    boxZoom: false,
                    tap: false,
                    trackResize: false,
                    zoomControl: false
                });
                var osmUrl='http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
                var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
                var osm = new leaflet.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});
                map.addLayer(osm);

                var marker;
                $scope.$watch('options', function(options) {
                    var lat = options.center[1] || 0,
                        long = options.center[0] || 0,
                        zoom = options.zoom || 10;

                    if (marker) {
                        map.removeLayer(marker);
                        marker = null;
                    }
                    map.setView(new leaflet.LatLng(lat, long), zoom);
                    marker = leaflet.marker([lat, long]).addTo(map);
                });
            }
        };
    }
]);
