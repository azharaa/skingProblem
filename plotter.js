/**
 * Created by azharaga on 9/11/15.
 */

function Plotter(map, rows, columns) {
    this.map = map;
    this.rows = rows;
    this.columns = columns;
    this.elevations = [];
    this.skiMap = [];
}

Plotter.prototype.plotElevation = function () {
    var i, j, a = [];
    for(i = 0; i < this.rows; i++) {
        for(j = 0; j < this.columns; j++) {
            var point = {x: i, y: j, v: this.map[i][j], e: false, w: false, n: false, s: false, c: false, i: i+j};

            if(((j+1 < this.columns) ) && (this.map[i][j] > this.map[i][j+1])) {
                point.e = true;
                var eP = {x: i, y: j+1, v: this.map[i][j+1], i: ((this.columns * i) + (j + 1))};
                point.eP = eP;
            }
            if((i-1 >= 0) && (this.map[i][j] > this.map[i-1][j])) {
                point.n = true;
                var nP = {x: i-1, y: j, v: this.map[i-1][j], i: ((this.columns * (i-1)) + j )}
                point.nP = nP;
            }
            if((i+1 < this.rows) && this.map[i][j] > this.map[i+1][j]){
                point.s = true;
                var sP = {x: i+1, y: j, v: this.map[i+1][j], i: ((this.columns * (i + 1)) + j) }
                point.sP = sP;
            }
            if((j-1 >= 0) && (this.map[i][j] > this.map[i][j-1])) {
                point.w = true;
                var wP = {x: i, y: j-1, v: this.map[i][j-1], i: ((this.columns * i) + (j - 1))}
                point.wP = wP;
            }

            this.elevations.push(point);
        }
    }
};

Plotter.prototype.computePlausiblePaths = function( start, trajectory ) {
    var isLeafNode = true;
    start.c = true;

    if(start.n === true) {
        var north = start.nP;
        if (north ) {
            var distance, gradient;
            isLeafNode = false;
            var point = this.elevations[north.i];

            distance = trajectory.distance;
            gradient = trajectory.gradient;
            trajectory.distance++;
            trajectory.gradient += (start.v - point.v);

            this.computePlausiblePaths(point, trajectory);

            trajectory.distance = distance;
            trajectory.gradient = gradient;
        }
    }
    if(start.s === true) {
        var south = start.sP;
        if (south != -1) {
            var distance, gradient;
            isLeafNode = false;
            var point  = this.elevations[south.i];

            distance = trajectory.distance;
            gradient = trajectory.gradient;

            trajectory.distance++;
            trajectory.gradient += (start.v - point.v);

            this.computePlausiblePaths(point, trajectory);

            trajectory.distance = distance;
            trajectory.gradient = gradient;
        }
    }

    if(start.e === true) {
        var east = start.eP;
        if (east != -1) {
            var distance, gradient;
            isLeafNode = false;
            var point = this.elevations[east.i];

            distance = trajectory.distance;
            gradient = trajectory.gradient;

            trajectory.distance++;
            trajectory.gradient += (start.v - point.v);

            this.computePlausiblePaths(point, trajectory);

            trajectory.distance = distance;
            trajectory.gradient = gradient;
        }
    }

    if(start.w === true) {
        var west = start.wP;
        if (west != -1) {
            var distance, gradient;
            isLeafNode = false;
            var point = this.elevations[west.i];

            distance = trajectory.distance;
            gradient = trajectory.gradient;

            trajectory.distance++;
            trajectory.gradient += (start.v - point.v);

            this.computePlausiblePaths(point, trajectory);

            trajectory.distance = distance;
            trajectory.gradient = gradient;
        }
    }

    if(isLeafNode === true) {
        var pushNode = new Object();
        pushNode.distance = trajectory.distance;
        pushNode.gradient = trajectory.gradient;

        this.skiMap.push(pushNode);
    }
};

Plotter.prototype.findOptimalPath = function() {
  this.skiMap.sort(function(a, b) {
      return b.distance - a.distance;
  });
  return this.skiMap.firstAmongEquals();
};

module.exports = Plotter;

if (!Array.prototype.firstAmongEquals) {
    Array.prototype.firstAmongEquals = function(  ) {
        'use strict';
        var O = Object(this);
        var P = [];
        var len = parseInt(O.length) || 0;
        if (len === 0) {
            return false;
        }
        if(O[0].distance != O[1].distance) {
            return O[0];
        } else {
            var k = 0;
            var currentElement;
            var maxDistance = O[0].distance;

            while ((O[k].distance === maxDistance)) {
                P.push(O[k]);
                k++;
            }
            P.sort(function(a, b) {
                return b.gradient - a.gradient;
            });
            return P[0];
        }
    };
}