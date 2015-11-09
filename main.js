/**
 * Created by azharaga on 9/11/15.
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

function make2D() {
    return matrix = listToMatrix(map, 1000);
}

function scanPaths(map) {
    var i, j;

    var plot = new Plotter(map, 1000, 1000);

    plot.plotElevation();
    console.log('Computed 2D space');

    plot.elevations.forEach(function(value, index) {
        if(value.c == false) {
            plot.computePlausiblePaths(value, {distance: 1, gradient: 0, path: [value.v]});
        }
    });
    
    var id = plot.findOptimalPath();
    console.log('Maximum Distance: ' + id.distance + ' with Gradient: ' + id.gradient);
}

scanPaths(make2D(map));
