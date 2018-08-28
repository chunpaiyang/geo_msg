var to_meter = require('./degree_to_meter.js');

module.exports = function(longtitude, latitude) {
    var [longtitude_m, latitude_m] = to_meter(latitude, longtitude);

    console.log(`${longtitude_m}, ${latitude_m}`);

    const lines = [
                40000,
                20000,
                10000,
                 5000,
                 2000,
                 1000,
                  500,
                  200,
                  100,
                   50,
                   20,
                   10,
                    5,
                    2,
                    1];

    var ret = [];

    lines.forEach(line => {
        var x = 0;
        if (longtitude_m >= line) {
            x = 1;
            longtitude_m -= line;
        }
        var y = 0;
        if (latitude_m >= line) {
            y = 1;
            latitude_m -= line;
        }
        console.log(`${x}, ${y}`);
        ret.push(x*2+y);
    });

    ret = ret.join('');

    console.log(`${ret}`);

    return ret;
};
