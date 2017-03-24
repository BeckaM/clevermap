// FACTORIES

'use strict';

worldMap.factory('extractTableData', function () {

    return {

        getData: function () {
            // Parse safely
            // https://developer.mozilla.org/en-US/Add-ons/Code_snippets/HTML_to_DOM

            var elem = document.createElement('div');
            elem.classList.add('franceisbacon');
            elem.innerHTML = $scope.headOfStates.text["*"];
            console.log(elem);

            // Add result as html to the DOM
            document.body.appendChild(elem);

            // Get table data
            var container = document.querySelector('.franceisbacon');
            var table = container.querySelector('.wikitable');

            var headers = [];
            var headerRow = table.rows[0];

            // Headers        
            for (var i = 0; i < headerRow.cells.length; i++) {
                headers.push(headerRow.cells[i].querySelector('a').title);
            }

            console.log(headers);

            var countries = [];

            // map data       
            for (var i = 1, row; row = table.rows[i]; i++) {

                // get country
                var country = {};
                country.name = row.cells[0].querySelector('a').title;
                countries.push(country);

                // get head of state
                country.headOfState;
                country.headOfGoverment;
                country.common;

                if (row.cells.length == 2) {
                    // Common

                } else if (row.cells.length == 3) {
                    var headOfState;
                    var anchors = row.cells[1].querySelectorAll('a');
                    for (var i = 0; i < anchors.length; i++;) {
                        headOfState += anchors[i].title;
                    }

                    var headOfGoverment;
                    anchors = row.cells[2].querySelectorAll('a');
                    for (var i = 0; i < anchors.length; i++;) {
                        headOfState += anchors[i].title;
                    }

                } else {
                    // take care of us too.
                }
            }

            console.log(countries);
        }

    };

});
