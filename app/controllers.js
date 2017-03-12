// CONTROLLERS
   
worldMap.controller('mainController', ['$scope', '$location', '$log', 'headOfStatesService', function($scope, $location, $log, headOfStatesService) {
    $scope.countries = [];
    
    $scope.headOfStates = headOfStatesService.getHeadsOfState();
    $scope.headOfStates.$promise.then(function(data) {
       
        $scope.headOfStates = data.parse;
        console.log($scope.headOfStates);
        
        // Ectract data in factory function.
        
    });
    
}]);    
