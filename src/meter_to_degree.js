
module.exports = function(latitude_km, longtitude_km) {
    // latitude: 0.000000~90.000000
    // longtitude: 0.000000~180.000000
    // 赤道長度: 40076 KM
    // 子午線長度: 40009 KM
    // one latitude = 40009/360 = 111.136111111111111 KM
    // one longtitude = (40076/360)*cos(latitude)
    const N = 1000; // meter base
    if (latitude_km < 0 || latitude_km > 40009) {
        throw Error("latitude out of 0~40009 KM:" + latitude_km);
    }
    if (longtitude_km < 0 || longtitude_km > 400076) {
        throw Error("longtitude out of 0~400076 KM:" + longtitude_km);
    }
    const isNorth = latitude_km >= 0 ? 1 : -1;
    const latitude = latitude_km*360 / (isNorth * 40009 * N);
    const longtitude = longtitude_km*360 / (40076 * Math.cos((Math.PI/180)*latitude) * N) 
    return [latitude, longtitude];
};
