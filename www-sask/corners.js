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

corners.Bounds[4] = new google.maps.LatLngBounds(
        new google.maps.LatLng(36.6842766, -123.2363739), // SW
        new google.maps.LatLng(38.7637024, -120.9433594)  // NE
    );
    corners.Centre[4] = new google.maps.LatLng(37.7239914, -122.0898666);

var ImageBucket = 'https://storage.googleapis.com/bucket-blipmap-bayarea-4k/'
var FcstForwardDays = 2
var NumberOfRuns = 2
var RunHour = 8

var dayName   = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var mS_Day = 24 * 60 * 60 * 1000;

var forecasts = [];

var Now = new Date();
var RunDate = new Date();
var FCSTDate = new Date();

if (Now.getHours() < RunHour) {
    Now.setTime(Now.getTime() - mS_Day);
}

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

function CheckForcastExists(RunDate, FCSTDate)
{
    var uri = ImageBucket + 'index/' +
              ISODateFormatter(RunDate, '') +
              '_' +
              ISODateFormatter(FCSTDate, '') +
              '.exists';
    var req = new XMLHttpRequest();
    req.open("HEAD", uri, false);
    req.send(); // This line fetches the file
    return req.status == 200;
}

for(i = 0; i < NumberOfRuns; i++) {
    for (j = 0; j < FcstForwardDays + 1; j++) {
        if (!CheckForcastExists(RunDate, FCSTDate)) {
            console.log("Forecast does not exist for: " + RunDate.toDateString() + " for " + FCSTDate.toDateString());
            break;
        }
        var f = {
            'name': FCSTDate.toDateString(),
            'oldname' : dayName[FCSTDate.getDay()] + ' ' + FCSTDate.getDate() + ' ' + monthName[FCSTDate.getMonth()],
            'latlon_file': 'latlon2d.json',
            'date': FCSTDate.getTime(),
            'default_t': '1400',
            'dir': ImageBucket +
                ISODateFormatter(RunDate, '') +
                '/' +
                ISODateFormatter(FCSTDate, '') +
                '/FCST/',
            'bounds': corners.Bounds[4],
            'centre': corners.Centre[4],
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
