/****************************************
 *    corners.js                        *
 *                                      *
 *    Corner info for Google Maps       *
 * Look REGIONXYZ/LOG/ncl.out.* for corners
 ****************************************/ 

var corners = [];

corners["Bounds"]  = [];
corners["Centre"] = [];

corners.Bounds = new Array();
corners.Centre = new Array();

corners.Bounds[2] = new google.maps.LatLngBounds(
        new google.maps.LatLng(37.1399994, -122.3163147), // SW
        new google.maps.LatLng(41.6664276, -117.1718292)  // NE
);
corners.Centre[2] = new google.maps.LatLng(39.4032135, -119.7440720);

/*corners.Bounds[2] = new google.maps.LatLngBounds(
        new google.maps.LatLng(37.1399994, -122.3163147), // SW
        new google.maps.LatLng(41.6664276, -117.1718292)  // NE
    );
corners.Centre[2] = new google.maps.LatLng(39.4032135, -119.7440720);
*/

var ImageBucket = 'https://storage.googleapis.com/bucket-blipmap-tahoe/'
var NumDays = 3

var dayName   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var forecasts = [];

var Now = new Date().getTime();
var T = new Date();
T.setTime(Now);
var mS_Day = 24 * 60 * 60 * 1000;

for(i = 0; i < NumDays; i++){
    var f = {
        'name': dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()],
        'latlon_file': 'latlon2d.json',
        'date': T.getTime(),
        'default_t': '1400',
        'dir': ImageBucket + 'OUT%2B' + i + '/FCST/',
        'bounds': corners.Bounds[2],
        'centre': corners.Centre[2],
    }
    if (i == 0) {
        f['name'] += ' - Today'
    }

    forecasts.push(f)

    T.setTime(T.getTime() + mS_Day);
}
/*
var f = {
    'name': dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()],
    'latlon_file': 'latlon2d.json',
    'date': T.getTime(),
    'default_t': '1400',
    'dir': 'https://storage.googleapis.com/bucket-blipmap-tahoe/OUT%2B1/FCST/',
    'bounds': corners.Bounds[4],
    'centre': corners.Centre[4],
}
forecasts.push(f)

T.setTime(Now + mS_Day * 2);
var f = {
    'name': dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()],
    'latlon_file': 'latlon2d.json',
    'date': T.getTime(),
    'default_t': '1400',
    'dir': 'OUT+2/FCST/',
    'bounds': corners.Bounds[4],
    'centre': corners.Centre[4],
}
forecasts.push(f)

T.setTime(Now + mS_Day * 3);
var f = {
    'name': dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()],
    'latlon_file': 'latlon2d.json',
    'date': T.getTime(),
    'default_t': '1400',
    'dir': 'OUT+3/FCST/',
    'bounds': corners.Bounds[4],
    'centre': corners.Centre[4],
}
forecasts.push(f)

T.setTime(Now + mS_Day * 4);
var f = {
    'name': dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()],
    'latlon_file': 'latlon2d.json',
    'date': T.getTime(),
    'default_t': '1400',
    'dir': 'OUT+4/FCST/',
    'bounds': corners.Bounds[4],
    'centre': corners.Centre[4],
}
forecasts.push(f)

T.setTime(Now + mS_Day * 5);
var f = {
    'name': dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()],
    'latlon_file': 'latlon2d.json',
    'date': T.getTime(),
    'default_t': '1400',
    'dir': 'OUT+5/FCST/',
    'bounds': corners.Bounds[4],
    'centre': corners.Centre[4],
}
forecasts.push(f)

T.setTime(Now + mS_Day * 6);
var f = {
    'name': dayName[T.getDay()] + ' ' + T.getDate() + ' ' + monthName[T.getMonth()],
    'latlon_file': 'latlon2d.json',
    'date': T.getTime(),
    'default_t': '1400',
    'dir': 'OUT+6/FCST/',
    'bounds': corners.Bounds[4],
    'centre': corners.Centre[4],
}
forecasts.push(f)
*/
