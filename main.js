/**
 * Created by azharaga on 7/11/15.
 */

var Plotter = require("./plotter");

var inputMap =
    [
        [4, 8, 7, 3],
        [2, 5, 9, 3],
        [6, 3, 2, 5],
        [4, 4, 1, 6]
    ];
var rows = 4, columns = 4;

function scanPaths(inputMap) {
    var i, j;

    var plot = new Plotter(inputMap, rows, columns);

    plot.plotNorth( );
    plot.plotSouth( );
    plot.plotEast( );
    plot.plotWest( );
    plot.plotElevation();

    /*console.log('-------- North ------------');
    plot.printPaths(northBlock, northBlockValue);
    console.log('--------------------------');

    console.log('-------- South ------------');
    plot.printPaths(southBlock, southBlockValue);
    console.log('--------------------------');

    console.log('-------- East ------------');
    plot.printPaths(eastBlock, eastBlockValue);
    console.log('--------------------------');

    console.log('-------- West ------------');
    plot.printPaths(westBlock, westBlock);
    console.log('--------------------------');*/

    plot.elevations.forEach(function(value, index) {
        plot.computePlausiblePaths(value, {distance: 0, gradient: 0});

    });

    console.log('Maximum Distance: ' + plot.findOptimalPath().distance + ' with Gradient: ' + plot.findOptimalPath().gradient);


    //plot.printSkiMap();

}


scanPaths(inputMap);

