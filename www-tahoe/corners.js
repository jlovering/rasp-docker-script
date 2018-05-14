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
var FcstForwardDays = 2
var NumberOfRuns = 2

var dayName   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var mS_Day = 24 * 60 * 60 * 1000;

var forecasts = [];

var Now = new Date().getTime();
var RunDate = new Date();
var FCSTDate = new Date();

RunDate.setTime(Now);
FCSTDate.setTime(Now);

function ISODateFormatter(date, delim)
{
    var fixed_Month = date.getMonth() + 1;
    if (fixed_Month < 10) {
        fixed_Month = '0' + fixed_Month;
    }
    
    var fixed_Day = date.getDate();
    if (fixed_Day < 10) {
        fixed_Day = '0' + fixed_Day;
    }
    
    return date.getFullYear() + delim +
        fixed_Month + delim +
        fixed_Day;
}

for(i = 0; i < NumberOfRuns; i++) {

    for (j = 0; j < FcstForwardDays + 1; j++) {
        
        var f = {
            'name': FCSTDate.toDateString(),
            'oldname' : dayName[FCSTDate.getDay()] + ' ' + FCSTDate.getDate() + ' ' + monthName[FCSTDate.getMonth()],
            'latlon_file': 'latlon2d.json',
            'date': RunDate.getTime(),
            'default_t': '1400',
            'dir': ImageBucket +
                ISODateFormatter(RunDate, '') +
                '_' +
                ISODateFormatter(FCSTDate, '') +
                '/FCST/',
            'bounds': corners.Bounds[2],
            'centre': corners.Centre[2],
        }
        if (i == 0 && j == 0) {
            f['name'] += ' - Today';
        }
        if (i > 0) {
            f['name'] += ' - From ' + ISODateFormatter(RunDate, '-');
        }
        forecasts.push(f);
        FCSTDate.setTime(FCSTDate.getTime() + mS_Day);
    }

    RunDate.setTime(RunDate.getTime() - mS_Day);
    FCSTDate.setTime(RunDate.getTime());
}
