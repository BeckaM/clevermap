// MODULES
  
var worldMap = angular.module('worldMap', [
    // Angular modules    
    'ngRoute',
    'ngResource'
    
]);
// CONTROLLERS

worldMap.controller('mainController', ['$scope', '$location', '$log', 'leftRightService', function ($scope, $location, $log, leftRightService) {
    $scope.countries = [];

    $scope.leftRight = leftRightService.getLeftRight();
    $scope.leftRight.$promise.then(function (data) {

        $scope.leftRight = data.parse;
        console.log($scope.leftRight);

        var elem = document.createElement('div');
        elem.classList.add('franceisbacon');
        elem.innerHTML = $scope.leftRight.text["*"];
        console.log(elem);

        // Add result as html to the DOM
        document.body.appendChild(elem);

        // Get table data
        var container = document.querySelector('.franceisbacon');
        var table = container.querySelector('.wikitable');

        // Ectract data in factory function.
        $scope.countries = [];
        for(var i = 1, row; row = table.rows[i]; i++) {
            
            var country = {};
            country.name = row.cells[0].querySelector('a').title;
            country.traffic = row.cells[1].textContent.substring(0, 3);
            $scope.countries.push(country);
            
        }
        
        console.log('countries');
        console.log($scope.countries);

    });

}]);

// DIRECTIVES

worldMap.directive('countriesLeft', function() {
   
    return {
        templateUrl: 'directives/countries.html',
        replace: true
    }
    
});

worldMap.directive('countriesRight', function() {
   
    return {
        templateUrl: 'directives/countries.html',
        replace: true
    }
    
});


worldMap.directive('mapWorld', function () {

    return {
        templateUrl: 'directives/worldmap.html',
        replace: true,
        link: function (scope, element, attrs) {

            console.log('link');
            // http://openlayersbook.github.io/ch06-styling-vector-layers/example-06.html

            var countryStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: [161, 204, 161, 1]
                }),
                stroke: new ol.style.Stroke({
                    color: [101, 95, 90, 1],
                    width: 1,
                    lineCap: 'round'
                }),
                zIndex: 2
            });

            var highlightStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: [194, 222, 194, 1]
                }),
                stroke: new ol.style.Stroke({
                    color: [101, 95, 90, 1],
                    width: 2
                }),
                zIndex: 1
            });

            var vectorSource = new ol.source.Vector({
                url: 'https://openlayers.org/en/v4.0.1/examples/data/geojson/countries.geojson',
                format: new ol.format.GeoJSON(),
                wrapX: false,
                noWrap: true
            });

            var vectorLayer = new ol.layer.Vector({
                source: vectorSource,
                style: [countryStyle]
            });
            
            var data = ol.proj.transform([0, 15.6215700], 'EPSG:4326', 'EPSG:3857');
                
            var map = new ol.Map({
                wrapX: false,
                noWrap: true,
                layers: [
                  new ol.layer.Tile({
                        source: new ol.source.OSM({
                            wrapX: false,
                            noWrap: true
                        })
                    }),
                  vectorLayer
                ],
                target: 'map',
                view: new ol.View({
                    center: data,
                    zoom: 2
                })
            });



            // a normal select interaction to handle click
            var select = new ol.interaction.Select({
                style: [highlightStyle],
                wrapX: false,
                noWrap: true
            });

            map.addInteraction(select);

            var starter = function () {
                console.log('sfdfd');
                
                var featureToSelect = vectorSource;

                var src = vectorLayer.getSource();
                var listenerKey = src.on('change', function (e) {
                    if (vectorSource.getState() == 'ready') {
                        var featureCount = vectorSource.getFeatures().length;
                        // ...
                        console.log(featureCount);
                        // use vectorSource.unByKey(listenerKey) instead
                        // if you do use the "master" branch of ol3
                        // http://stackoverflow.com/questions/27108522/how-to-get-the-number-of-vector-elements-inside-a-vector-layer-in-open-layers-3
                        
                        var f = vectorSource.getFeatureById('SWE');
                        select.getFeatures().push(f);
                        console.log('sfdfd');
                    }
                });

            }();

            var selectedFeatures = select.getFeatures();

            // a DragBox interaction used to select features by drawing boxes
            var dragBox = new ol.interaction.DragBox({
                condition: ol.events.condition.platformModifierKeyOnly
            });

            map.addInteraction(dragBox);

            dragBox.on('boxend', function () {
                // features that intersect the box are added to the collection of
                // selected features, and their names are displayed in the "info"
                // div
                var info = [];
                var extent = dragBox.getGeometry().getExtent();
                vectorSource.forEachFeatureIntersectingExtent(extent, function (feature) {
                    selectedFeatures.push(feature);
                    info.push(feature.get('name'));
                });
                if (info.length > 0) {
                    console.log(info.join(', '));
                }
            });

            // clear selection when drawing a new box and when clicking on the map
            dragBox.on('boxstart', function () {
                selectedFeatures.clear();
            });
            map.on('click', function () {
                selectedFeatures.clear();
            });
        }
    }

});

// ROUTES

worldMap.config(function($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: '/app/pages/map.html',
        controller: 'mainController'
    })

});

// SERVICES

worldMap.service('leftRightService', ['$resource', function ($resource) {
    
    this.getLeftRight = function () {
        
        var request = $resource("https://en.wikipedia.org/w/api.php?action=parse&page=Right-_and_left-hand_traffic&prop=text&section=11&format=json", {
            callback: "JSON_CALLBACK"
        }, {
            get: {
                method: "JSONP"
            }
        });

        return request.get();
        
    };
    
}]);

worldMap.service('headOfStatesService', ['$resource', function ($resource) {

    this.getHeadsOfState = function () {

        var request = $resource("https://en.wikipedia.org/w/api.php?action=parse&page=List_of_current_heads_of_state_and_government&prop=text&section=1&format=json", {
            callback: "JSON_CALLBACK"
        }, {
            get: {
                method: "JSONP"
            }
        });

        return request.get();

    };

}]);
