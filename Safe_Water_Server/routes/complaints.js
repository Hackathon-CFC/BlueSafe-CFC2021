var express = require('express');
let service = require('../public/javascripts/complaints-service');
var router = express.Router();
var jwt = require('jsonwebtoken');
const config = require("../public/javascripts/config");

router.post('/', config.ensureToken, function(req, res, next) {
    jwt.verify(req.token, config.TOKEN_KEY, function(err){
        if(err){
            res.sendStatus(403);
        }else{
            service.getComplaints(req, function (err, data) {
                if(data) {
                    res.json(data.docs);
                    res.end();  
                } else {
                    res.statusCode = 500;
                    res.end("Error : No complaints found / Server error");
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
            service.add(req, function (err, data) {
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

router.post('/getStatus', config.ensureToken, function(req, res, next) {
    jwt.verify(req.token, config.TOKEN_KEY, function(err){
        if(err){
            res.sendStatus(403);
        }else{
            service.getComplaintStatus(req, function (err, data) {
                if(data) {
                    res.json(data.docs);
                    res.end();  
                } else {
                    res.statusCode = 500;
                    res.end("Error : Complaint not found / Server error");
                }
            });
        }
    });    
});

module.exports = router;
