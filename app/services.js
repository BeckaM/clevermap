// SERVICES

worldMap.service('leftRightService', ['$resource', function ($resource) {
    
    this.getLeftRight = function () {
        
        var request = $resource("https://en.wikipedia.org/w/api.php?action=parse&page=Right-_and_left-hand_traffic&prop=text&section=3&format=json", {
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
