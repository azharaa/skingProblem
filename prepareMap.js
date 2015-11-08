/**
 * Created by azharaga on 8/11/15.
 */

var map  = require('./map.txt'),
    rows = 10, col = 10;

var i, j;
var line = [];

for(i = 0; i <= (col * rows); i++) {

    if((i > 0) && ((i % col ) === 0)) {
        console.log('[' + line + '],');
        line.length = 0;
    }
    line.push(map[i]);
}



