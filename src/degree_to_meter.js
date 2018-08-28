
module.exports = function(longtitude, latitude) {
    // latitude: 0.000000~90.000000
    // longtitude: 0.000000~180.000000
    // 赤道長度: 40076 KM
    // 子午線長度: 40009 KM
    // one latitude = 40009/360 = 111.136111111111111 KM
    // one longtitude = (40076/360)*cos(latitude)
    const N = 1; // meter base
    if (latitude <= -90 || latitude >= 90) {
        throw Error("latitude out of +-90 degress:" + latitude);
    }
    if (longtitude <= -180 || longtitude >= 180) {
        throw Error("longtitude out of +-180 degress:" + longtitude);
    }
    const isNorth = latitude >= 0 ? 1 : -1;
    if (0 > latitude) {
        isNorth = -1;
    }
    longtitude += 180;
    latitude = Math.abs(latitude);
    const latitude_hm = isNorth * (latitude/360) * 40009 * N;
    const longtitude_hm = (longtitude/360) * 40076 * Math.cos((Math.PI/180)*latitude) * N;
    return [Math.round(longtitude_hm), Math.round(latitude_hm)];
};
