var express = require('express');
let service = require('../public/javascripts/users-service');
var router = express.Router();
var jwt = require('jsonwebtoken');
const config = require('../public/javascripts/config');

/* GET users listing. */
router.post('/', config.ensureToken, function(req, res, next) {
    jwt.verify(req.token, config.TOKEN_KEY, function(err){
        if(err){
            res.sendStatus(403);
        }else{
            service.getUsers(req, function (err, data) {
                if(data) {
                    res.json(data.docs);
                    res.end();  
                } else {
                    res.statusCode = 500;
                    res.end("Error : No users found / Server error");
                }
            });
        }
    });    
    
});

router.post('/login', function (req, res){
    const user = {id :3, name: 'ravi'};
    const token = jwt.sign({user}, config.TOKEN_KEY);
    res.json({
        token : token
    });
});

router.post('/validateUser', function (req, res){
    if(req.body.name && req.body.password){
         const user = {name :req.body.name, password: req.body.password};
         service.validateUser(req, function (err, data) {
            if(data) {
                if(data.docs && data.docs.length  === 1){
                    const token = jwt.sign({user}, config.TOKEN_KEY);
                    res.json({
                        token : token
                    });                    
                }
                res.json(data.docs);
                res.end();  
            } else {
                res.statusCode = 500;
                res.end("Error : No spots found / Server error");
            }
        });
    }
 });

 router.post('/validateMobile', config.ensureToken, function(req, res, next) {
    jwt.verify(req.token, config.TOKEN_KEY, function(err){
        if(err){
            res.sendStatus(403);
        }else{
            service.validateMobile(req, function (err, data) {
                if(data) {
                    res.json(data);
                    res.end();  
                } else {
                    res.statusCode = 200;
                    res.responseCode = 'ERROR';
                    error = {
                        "error" : err.message,
                        "responseCode":"ERROR",
                        "statusCode" : 200
                    }
                    res.end(JSON.stringify(error));
                }
            });
        }
    });    
});

router.post('/signup', function(req, res, next) {
    service.signup(req, function (err, data) {
        if(data) {
            res.json(data);
            res.end();  
        } else {
            res.statusCode = 200;
            res.responseCode = 'ERROR';
            error = {
                "error" : err.message,
                "responseCode":"ERROR",
                "statusCode" : 200
            }
            res.end(JSON.stringify(error));
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
                    res.statusCode = 200;
                    res.responseCode = 'ERROR';
                    error = {
                        "error" : err.message,
                        "responseCode":"ERROR",
                        "statusCode" : 200
                    }
                    res.end(JSON.stringify(error));
                }
            });
        }
    });    
});

router.get('/storechatdetails', function(req, res, next) {
    service.chatdetails(req, function (err, data) {
        if(data) {
            res.json(data);
            res.end();  
        } else {
            res.statusCode = 200;
            res.responseCode = 'ERROR';
            error = {
                "error" : err.message,
                "responseCode":"ERROR",
                "statusCode" : 200
            }
            res.end(JSON.stringify(error));
        }
    });       
});

router.get('/chats',  function(req, res, next) {
    service.getChats(req, function (err, data) {
        if(data) {
            res.json(data.docs);
            res.end();  
        } else {
            res.statusCode = 500;
            res.end("Error : No users found / Server error");
        }
    });  
    
});

module.exports = router;
