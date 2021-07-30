var _Cloudant = require('@cloudant/cloudant');
const request = require("request-promise");
const cloudant_url = 'https://apikey-v2-1zma7f0cc528ugvyhcy9v2m7crqrepm0jqhc3b2nix6u:70334105cf25337057ba649408923de2@94249bbc-a689-425c-848b-d0ac7b9c30c6-bluemix.cloudantnosqldb.appdomain.cloud',
cloudant_key = '5t2X5tV3m0gQJS7lincCEF1ny6wWqob4188IVXU7RxTk';
var MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiamF5YW50c2hhcm1hLWpzIiwiYSI6ImNrcXRoeDczMTFrZnAydXBibnR3Zzhrc2QifQ.PadtdAuVrDmuRMUhiNGPMg';
var MAPBOX_BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

module.exports = {
    Cloudant : new _Cloudant({ url: cloudant_url, plugins: { iamauth: { iamApiKey: cloudant_key } } }),
    ensureToken: (req, res, next) =>{
        const headerAuth = req.headers['authorization'];
        if(typeof headerAuth != 'undefined'){
            const token = headerAuth.split(' ') [1];
            req.token = token;
            next();
        }else{
            res.sendStatus(403);
        }
    },
    TOKEN_KEY : "My_key",

    getAddressToLatLong :async (address) => {
        var locationObj = {long:'',lat:''};
        var url = MAPBOX_BASE_URL + encodeURIComponent(address) + '.json?access_token='+ MAPBOX_ACCESS_TOKEN + '&limit=1';
        //console.log(url);
        await request({ url: url, json: true }, function (error, response) {
            if (error) {
                console.log('Unable to connect to Geocode API');
                locationObj.long = '';
                locationObj.lat = '';
            } else if (response.body.features.length == 0) {
                console.log('Unable to find location. Try to ' + 'search another location.');
                locationObj.long = '';
                locationObj.lat = '';
            } else {
                //console.log("oneline no 36");
                var longitude = response.body.features[0].center[0];
                var latitude = response.body.features[0].center[1];
                locationObj.long = longitude;
                locationObj.lat = latitude;
            }
        }); 
       return locationObj;
    }
}