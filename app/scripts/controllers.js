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
