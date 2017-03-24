// ROUTES

worldMap.config(function($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: '/app/pages/map.html',
        controller: 'mainController'
    })

});
