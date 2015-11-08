/**
 * Created by azharaga on 7/11/15.
 */

function Plotter(map, rows, columns) {
    this.map = map;
    this.rows = rows;
    this.columns = columns;
    this.elevations = [];
    this.northPaths = [];
    this.southPaths = [];
    this.eastPaths = [];
    this.westPaths = [];
    this.skiMap = [];
}

Plotter.prototype.plotNorth = function( ) {
    var i, j;
    for(j = 0; j < this.columns; j++) {
        for(i = this.rows -1 ; i >= 1; i--) {
            if(this.map[i][j] > this.map[i-1][j]) {
                var path = {x: i, y: j, toX: i-1, toY: j, fromValue: this.map[i][j], toValue: this.map[i-1][j]};
                this.northPaths.push(path);
            }
        }
    }
};

Plotter.prototype.plotSouth = function( ) {
    var i, j;
    for(j = 0; j < this.columns; j++) {
        for(i = 0; i < this.rows-1; i++) {
            if(this.map[i][j] > this.map[i+1][j]) {
                var path = {x: i, y: j, toX: i+1, toY: j, fromValue: this.map[i][j], toValue: this.map[i+1][j]};
                this.southPaths.push(path);
            }
        }
    }
};

Plotter.prototype.plotEast = function( ) {
    for (i = 0; i < this.rows; i++) {
        for (j = 0; j < this.columns; j++) {
            if(this.map[i][j] > this.map[i][j+1]) {
                var path = {x: i, y: j, toX: i, toY: j+1, fromValue: this.map[i][j], toValue: this.map[i][j+1]};
                this.eastPaths.push(path);
            }
        }
    }
};

Plotter.prototype.plotWest = function( ) {
    for(i = 0; i < this.rows; i++) {
        for(j = (this.columns - 1) ; j >= 1; j--) {
            if(this.map[i][j] > this.map[i][j-1]) {
                var path = {x: i, y: j, toX: i, toY: j-1, fromValue: this.map[i][j], toValue:this.map[i][j-1] };
                this.westPaths.push(path);
            }
        }
    }
};

Plotter.prototype.plotElevation = function () {
    var i, j;
    for(i = 0; i < this.rows; i++) {
        for(j = 0; j < this.columns; j++) {
            var point = {x: i, y: j, v: this.map[i][j], e: false, w: false, n: false, s: false};

            if(((j+1 < this.columns) ) && (this.map[i][j] > this.map[i][j+1])) {
                point.e = true;
            }
            if((i-1 >= 0) && (this.map[i][j] > this.map[i-1][j])) {
                point.n = true;
            }
            if((i+1 < this.rows) && this.map[i][j] > this.map[i+1][j]){
                point.s = true;
            }
            if((j-1 >= 0) && (this.map[i][j] > this.map[i][j-1])) {
                point.w = true;
            }
            this.elevations.push(point);
        }
    }
    this.elevations.sort(function(a, b) {
        return b.v - a.v;
    });
};

Plotter.prototype.computePlausiblePaths = function( start, trajectory ) {
    var isLeafNode = true;

    if(start.n === true) {
        var north = this.northPaths.containsPoint(start);
        if (north != -1) {
            var distance, gradient, idx;
            var path = new Array();
            isLeafNode = false;
            idx = this.elevations.containsPoint({x: this.northPaths[north].toX, y: this.northPaths[north].toY});

            distance = trajectory.distance;
            gradient = trajectory.gradient;
            path = trajectory.path.slice(0, trajectory.path.length);
            trajectory.distance++;
            trajectory.gradient += (this.northPaths[north].fromValue - this.northPaths[north].toValue);
            trajectory.path.push(this.northPaths[north].toValue);

            this.computePlausiblePaths(this.elevations[idx], trajectory);

            trajectory.distance = distance;
            trajectory.gradient = gradient;
            trajectory.path = path;
        }
    }
    if(start.s === true) {
        var south = this.southPaths.containsPoint(start);
        if (south != -1) {
            var distance, gradient, idx;
            var path = new Array();
            isLeafNode = false;
            idx = this.elevations.containsPoint({x: this.southPaths[south].toX, y: this.southPaths[south].toY});

            distance = trajectory.distance;
            gradient = trajectory.gradient;
            path = trajectory.path.slice(0, trajectory.path.length);
            trajectory.distance++;
            trajectory.gradient += (this.southPaths[south].fromValue - this.southPaths[south].toValue);
            trajectory.path.push(this.southPaths[south].toValue);

            this.computePlausiblePaths(this.elevations[idx], trajectory);

            trajectory.distance = distance;
            trajectory.gradient = gradient;
            trajectory.path = path;
        }
    }

    if(start.e === true) {
        var east = this.eastPaths.containsPoint(start);
        if (east != -1) {
            var distance, gradient, idx;
            var path = new Array();
            isLeafNode = false;
            idx = this.elevations.containsPoint({x: this.eastPaths[east].toX, y: this.eastPaths[east].toY})

            distance = trajectory.distance;
            gradient = trajectory.gradient;
            path = trajectory.path.slice(0, trajectory.path.length);
            trajectory.distance++;
            trajectory.gradient += (this.eastPaths[east].fromValue - this.eastPaths[east].toValue);
            trajectory.path.push(this.eastPaths[east].toValue);

            this.computePlausiblePaths(this.elevations[idx], trajectory);

            trajectory.distance = distance;
            trajectory.gradient = gradient;
            trajectory.path = path;
        }
    }

    if(start.w === true) {
        var west = this.westPaths.containsPoint(start);
        if (west != -1) {
            var distance, gradient, idx;
            var path = new Array();
            isLeafNode = false;
            idx = this.elevations.containsPoint( {x: this.westPaths[west].toX, y: this.westPaths[west].toY});

            distance = trajectory.distance;
            gradient = trajectory.gradient;
            path = trajectory.path.slice(0, trajectory.path.length);
            trajectory.distance++;
            trajectory.gradient += (this.westPaths[west].fromValue - this.westPaths[west].toValue);
            trajectory.path.push(this.westPaths[west].toValue);

            this.computePlausiblePaths(this.elevations[idx], trajectory);

            trajectory.distance = distance;
            trajectory.gradient = gradient;
            trajectory.path = path;
        }
    }

    if(isLeafNode === true) {
        var pushNode = new Object(), paths = new Array();

        pushNode.distance = trajectory.distance;
        pushNode.gradient = trajectory.gradient;
        pushNode.paths = trajectory.path.slice(0, trajectory.path.length);
        this.skiMap.push(pushNode);
        trajectory.path.length = 0;
    }
};

Plotter.prototype.findOptimalPath = function() {
  this.skiMap.sort(function(a, b) {
      return b.paths.length - a.paths.length;
  });
    this.skiMap.forEach(function(value, index) {
        var str = value.paths.toString(), len = (value.paths.length - 1).toString();
        str+=  ' (' + len + ')';
        console.log(str) ;
    });

  return this.skiMap.firstAmongEquals();

};

Plotter.prototype.printPaths = function(paths, pathsValue) {
    var i;
    for(i = 0; i < paths.length; i++) {
        console.log('Path ' + i + ') ' + paths[i].x + ':' + paths[i].y + '->' + paths[i].toX + ':' + paths[i].toY);
        console.log('From ' + pathsValue[i].fromValue + '->' + pathsValue[i].toValue);
    }
};

Plotter.prototype.printSkiMap = function() {
    var i;
    for(i = 0; i < this.skiMap.length; i++) {
        console.log(i+1 + ') Distance:' + this.skiMap[i].distance + ' Gradient: ' + this.skiMap[i].gradient);
    }
};

module.exports = Plotter;

if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement ) {
        'use strict';
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
            return false;
        }
        var n = parseInt(arguments[1]) || 0;
        var k = 0;

        var currentElement;
        while (k < len) {
            currentElement = O[k];
            if (searchElement === currentElement.v ||
                (searchElement !== searchElement && currentElement.v !== currentElement.v)) {
                return true;
            }
            k++;
        }
        return false;
    };
}

if (!Array.prototype.containsPoint) {
    Array.prototype.containsPoint = function( point ) {
        'use strict';
        var O = Object(this);
        var len = parseInt(O.length) || 0;
        if (len === 0) {
            return false;
        }

        var k = 0;
        var currentElement;
        while (k < len) {
            currentElement = O[k];
            if((point.x === currentElement.x) && (point.y == currentElement.y)) {
                return k;
            }
            k++;
        }
        return -1;
    };
}

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





