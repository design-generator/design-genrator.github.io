var util = util || {};

util.STATIC_URL = '/static/';

if (typeof module !== 'undefined' && module.exports) {
  module.exports.util = util
}

util.bisect = function(a, b, fn, epsilon, target) {
    var a_T, b_T, midpoint, midpoint_T;
    while (Math.abs(b - a) > 2 * epsilon) {
        midpoint = (b + a) / 2;
        a_T = fn(a);
        b_T = fn(b);
        midpoint_T = fn(midpoint);
        if ((a_T - target) * (midpoint_T - target) < 0) b = midpoint;
        else if ((b_T - target) * (midpoint_T - target) < 0) a = midpoint;
        else return -999;
    }
    return midpoint;
}

util.secant = function(a, b, fn, epsilon) {
  // root-finding only
  var f1 = fn(a)
  if (Math.abs(f1) <= epsilon) return a
  var f2 = fn(b)
  if (Math.abs(f2) <= epsilon) return b
  var slope, c, f3
  for (var i = 0; i < 100; i++){
    slope = (f2 - f1) / (b - a)
    c = b - f2/slope
    f3 = fn(c)
    if (Math.abs(f3) < epsilon) return c
    a = b
    b = c
    f1 = f2
    f2 = f3
  }
  return NaN
}

util.getSensation = function(pmv) {
    if (pmv < -2.5) return 'Cold';
    else if (pmv < -1.5) return 'Cool';
    else if (pmv < -0.5) return 'Slightly Cool';
    else if (pmv < 0.5) return 'Neutral';
    else if (pmv < 1.5) return 'Slightly Warm';
    else if (pmv < 2.5) return 'Warm';
    else return 'Hot';
}

util.CtoF = function(x){
    return x * 9 / 5 + 32;
}

util.FtoC = function(x) {
    return (x - 32) * 5 / 9;
}

