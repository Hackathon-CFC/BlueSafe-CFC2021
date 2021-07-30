var express = require('express');
var router = express.Router();
var configuration = require('../configuration/server');
console.log(configuration);
var https = require('https');

router.post('/sendOtp', function (req, res, next) {
    console.log(req.body.mobile);
    if (req && req.body && req.body.mobile) {

        const data = `grant_type=client_credentials&client_id=${configuration.mfaConfiguration.client_id}&client_secret=${configuration.mfaConfiguration.client_secret}&scope=openid`;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        let options = {
            hostname: configuration.mfaConfiguration.tenant,
            path: '/v1.0/endpoint/default/token',
            port: 443,
            method: 'POST',
            headers: headers,
            rejectUnauthorized: false
        }
        let request = https.request(options, function (response) {
            let chunks = [];
            response.on("data", function (chunk) {
                chunks.push(chunk);
            });
            response.on("end", function () {
                const body = Buffer.concat(chunks);
                console.log('mfa response', body.toString());
                sendMobileOtp(JSON.parse(body.toString()), req, res);
            });
        })
        request.write(data);
        request.end();
    } else {
        const data = { message: 'Bad Request'};
        res.json(data);
        res.end(); 
    }
})

router.post('/validateOtp', function (req, res, next) {
    const headers = {
        'Authorization': 'Bearer ' + global.mfaToken,
        'Content-type': 'application/json',
        'Accept': 'application/json',
    }
    const data = {
        "otp": req.body.otp
    }
    const requestData = JSON.stringify(data);
    let options = {
        hostname: configuration.mfaConfiguration.tenant,
        path: `/v1.0/authnmethods/smsotp/transient/verification/${req.body.id}`,
        port: 443,
        method: 'POST',
        headers: headers,
        rejectUnauthorized: false
    }
    let request = https.request(options, function (response) {
        let chunks = [];
        response.on("data", function (chunk) {
            chunks.push(chunk);
        });
        response.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log('mfa response', body.toString());
            res.json(JSON.parse(body.toString()));
            res.end(); 
        });
    })
    request.write(requestData);
    request.end();
})

function sendMobileOtp(tokenResponse, req, res) {
    global.mfaToken = tokenResponse['access_token'];
    const mobileRegex = /^[0-9]*$/;
    if (req && req.body.mobile && mobileRegex.test(req.body.mobile)) {
        const headers = {
            'Authorization': 'Bearer ' + global.mfaToken,
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
        const data = {
            "correlation": "1234",
            "otpDeliveryMobileNumber": req.body.mobile
        }
        console.log(configuration.mfaConfiguration.tenant);
        const requestData = JSON.stringify(data);
        console.log(requestData);
        let options = {
            hostname: configuration.mfaConfiguration.tenant,
            path: '/v1.0/authnmethods/smsotp/transient/verification',
            port: 443,
            method: 'POST',
            headers: headers,
            rejectUnauthorized: false
        }
        let request = https.request(options, function (response) {
            let chunks = [];
            response.on("data", function (chunk) {
                chunks.push(chunk);
            });
            response.on("end", function () {
                var body = Buffer.concat(chunks);
                console.log('mfa response', body.toString());
                res.json(JSON.parse(body.toString()));
                res.end(); 
            });
        })
        request.write(requestData);
        request.end();
    } else {
        const data = { message: 'Bad Request'};
        res.json(data);
        res.end(); 
    }

}

module.exports = router;
