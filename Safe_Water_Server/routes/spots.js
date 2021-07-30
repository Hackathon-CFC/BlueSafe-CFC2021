var express = require('express');
let service = require('../public/javascripts/spots-service');
var router = express.Router();
var jwt = require('jsonwebtoken');
const config = require("../public/javascripts/config");


router.post('/', config.ensureToken, function(req, res, next) {
    jwt.verify(req.token, config.TOKEN_KEY, function(err){
        if(err){
            res.sendStatus(403);
        }else{
            service.getSpots(req, function (err, data) {
                if(data) {
                    res.json(data.docs);
                    res.end();  
                } else {
                    res.statusCode = 500;
                    res.end("Error : No spots found / Server error");
                }
            });
        }
    });    
});


router.post('/add', config.ensureToken, function(req, res, next) {
    jwt.verify(req.token, config.TOKEN_KEY, function(err){
        if(err){
            res.sendStatus(403);
        }else{
            service.add(req, function (err, data, callback) {
                if(data) {
                    res.json(data);
                    res.end();  
                } else {
                    res.statusCode = 400;
                    res.responseCode = 'ERROR';
                    error = {
                        "error" : err.message,
                        "responseCode":"ERROR",
                        "statusCode" : 400
                    }
                    res.end(JSON.stringify(error));
                }
            });
        }
    });    
    
});

router.post('/update', config.ensureToken, function(req, res, next) {
    jwt.verify(req.token, config.TOKEN_KEY, function(err){
        if(err){
            res.sendStatus(403);
        }else{
            service.update(req, function (err, data) {
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


router.post('/delete', config.ensureToken, function(req, res, next) {
    jwt.verify(req.token, config.TOKEN_KEY, function(err){
        if(err){
            res.sendStatus(403);
        }else{
            service.delete(req, function (err, data) {
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
