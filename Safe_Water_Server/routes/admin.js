var express = require('express');
let admin = require('../public/javascripts/admin');
var router = express.Router();
var jwt = require('jsonwebtoken');
const config = require("../public/javascripts/config");

router.put('/updateSpotState/:spotId', config.ensureToken, function(req, res, next) {
    jwt.verify(req.token, config.TOKEN_KEY, function(err){
        if(err){
            res.sendStatus(403);
        }else{
            admin.updateSpotStatus(req, function (err, data) {
                if(data) {
                    res.json(data);
                    res.end();  
                } else {
                    res.statusCode = 400;
                    res.responseCode = 'ERROR';
                    error = {
                        "error" : "Failed",
                        "responseCode":"ERROR",
                        "statusCode" : 400
                    }
                    res.end(JSON.stringify(error));
                }
            });
        }
    });    
    
});
 
module.exports = router;
