/**
 * Created by azharaga on 7/11/15.
 */

var Plotter = require("./plotter"),
    fs = require('fs'),
    map = require('./map.txt');

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

var inputMap =
    [
        [50,   201,   129   ,947   ,185   ,822   ,298   ,18    ,1027   ,260],
        [48   ,543   ,104   ,1112  ,1016  ,573   ,833   ,59    ,978    ,1483],
        [14   ,474   ,767   ,323   ,315   ,667   ,776   ,1398  ,1036   ,567],
        [103  ,580   ,1134  ,600   ,1161  ,20    ,1242  ,956   ,313    ,600],
        [317  ,1163  ,339   ,301   ,560   ,608   ,1441  ,285   ,744    ,589],
        [1266 ,798   ,395   ,78    ,1161  ,1210  ,1077  ,162   ,865    ,25],
        [78   ,702   ,617   ,889   ,318   ,555   ,1078  ,451   ,922    ,560],
        [144  ,184   ,4     ,1202  ,8     ,1122  ,1263  ,964   ,1333   ,548],
        [1094 ,860   ,698   ,374   ,621   ,988   ,347   ,75    ,692    ,1053],
        [121  ,1159  ,884   ,494   ,668   ,801   ,737   ,1436  ,253    ,757]
    ];

var rows = 10, columns = 10;
var input = [];

function readfile() {

    /*var data = fs.readFileSync('./map.txt');
    var asciiData = data.toString();
    var splitData = asciiData.split(',');

    var i;
    for(i = 0; i < splitData.length; i++) {
        input.push(parseInt(splitData[i]));
    }
    console.log(' Total Index ' + i);


    console.log(input.length);*/

    return matrix = listToMatrix(map, 1000);


}



function scanPaths(map) {
    var i, j;

    var plot = new Plotter(map, 1000, 1000);

    plot.plotNorth( );
    plot.plotSouth( );
    plot.plotEast( );
    plot.plotWest( );
    console.log('Computed 2D space');
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

    console.log('Total Elevation ' + plot.elevations.length);

    var i;
    for(i = 0; i < 1000; i++) {
        console.log('-- Computing path for ' + plot.elevations[i].v);
        plot.computePlausiblePaths(plot.elevations[i], {distance: 1, gradient: 0, path: [plot.elevations[i].v]});
    }

    /*plot.elevations.forEach(function(value, index) {

        console.log('-- Computing path for ' + value.v);
        plot.computePlausiblePaths(value, {distance: 1, gradient: 0, path: [value.v]});
    });*/
    
    var id = plot.findOptimalPath();

    console.log('Maximum Distance: ' + id.distance + ' with Gradient: ' + id.gradient);


    //plot.printSkiMap();

}


scanPaths(readfile(map));
//scanPaths(inputMap);

