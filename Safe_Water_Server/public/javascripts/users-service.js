// load the Cloudant library
const query = require("./query");
const config = require("./config");

const cloudant = config.Cloudant;
const user_dbname = 'c4c-users';
const chat_dbname ='watson-chat-details';
var db = null;

module.exports = {
    preparePayload : (request) =>{
        return { 
            modifiedDate: Date.now(),
            ...((request.body.name) && {name: request.body.name}),
            ...((request.body.comp_name)&& {comp_name:request.body.comp_name}),
            ...((request.body.regNo)&& {regNo:request.body.regNo}),
            ...((request.body.email)&& {email:request.body.email}),
            ...((request.body.mobile)&& {mobile:request.body.mobile}),
            ...((request.body.address)&& { address:request.body.address}),
            ...((request.body.role)&& { role:request.body.role}),
            ...((request.body.vendor_type)&& {vendor_type:request.body.vendor_type}),
            ...((request.body.loginStatus)&& { loginStatus:request.body.loginStatus})
        };
    },
        
    getUsers: function (req, callback) {
        console.log("Listing all users");
        db = cloudant.db.use(user_dbname);
        let dbquery = query.getUsers(req);
        db.find(dbquery, function (err, data) {
            callback(err, data);
        });
    },
    validateUser: function (request, callback) {
        db = cloudant.db.use(user_dbname);
        let dbquery = query.validateUser(request);
        db.find(dbquery, function (err, data) {
            callback(err, data);
        });
    },

    signup: async function (request, callback) {
        db = cloudant.db.use(user_dbname);
        let existingData = await db.find({selector:{mobile :request.body.mobile}});
        if(existingData && existingData.docs && existingData.docs.length > 0){
           return  callback({"message": "Mobile/User already registred"});
        }
        let payloadData = {...this.preparePayload(request), createdDate : Date.now()};
        console.log(payloadData);
        db.insert(payloadData, function (error, data) {
            var response = {};
            if (data) {
                response["success"] = true;
                response["data"] = data;
            } else {
                response["success"] = false;
            }
            callback(error, response);
        }); 
    },
    update: async function (request, callback) {
        db = cloudant.db.use(user_dbname);
        let existingData = await db.find({selector:{_id :request.body._id}});
        //Check if exist then update document
        if(existingData && existingData.docs && existingData.docs.length > 0){
            let payloadData = {...existingData.docs[0], ...this.preparePayload(request)};
            console.log(request.body);
            db.insert(payloadData, { _rev: existingData.docs[0]._rev }, function (error, data) {
                var response = {};
                if (data) {
                    response["success"] = true;
                    response["data"] = data;
                } else {
                    response["success"] = false;
                }
                callback(error, response);
            });    
        }else{
            callback({"message": "User not found"});
        }
    },
    validateMobile: async function (request, callback) {
        db = cloudant.db.use(user_dbname);
        let existingData = await db.find({selector:{mobile :request.body.mobile}});
        //Check if exist then update document
        if(existingData && existingData.docs && existingData.docs.length > 0){
            callback(null, {"isValidMobile": true, "message": "Mobile is registered!"});
        }else{
            callback({"message": "User not found"});
        }
    },
    chatdetails: async function (request, callback) {
        db = cloudant.db.use(chat_dbname);
        const mobileNo = request.query.mobile;
        if(mobileNo){
            const new_data = { 
                createdDate: Date.now(),
                ...((request.query.location) && {location: request.query.location}),
                ...((request.query.flow)&& { flow:request.query.flow}),
                ...((request.query.main_menu) && {main_menu: request.query.main_menu}),
                ...((request.query.category) && {category: request.query.category}),
                ...((request.query.feedback) && {feedback: request.query.feedback}),
                ...((request.query.user_info) && {user_info: request.query.user_info}),
                ...((request.query.user_detail)&& { user_detail:request.query.user_detail})                
            };

            let existingData = await db.find({selector:{mobile :mobileNo}});
            //Check if mobile exist then update document data
            if(existingData && existingData.docs && existingData.docs.length > 0){
                let data = existingData.docs[0].data;
                data.push(new_data);
                let payloadData = {...existingData.docs[0], data : data};
                console.log(request.body);
                db.insert(payloadData, { _rev: existingData.docs[0]._rev }, function (error, data) {
                    var response = {};
                    if (data) {
                        response["success"] = true;
                        response["data"] = data;
                    } else {
                        response["success"] = false;
                    }
                    callback(error, response);
                });    
            }else{
                //If mobile not exist create new document 
                let data = [new_data];
                db.insert({"mobile": mobileNo, "data" : data}, function (error, data) {
                    var response = {};
                    if (data) {
                        response["success"] = true;
                        response["data"] = data;
                    } else {
                        response["success"] = false;
                    }
                    callback(error, response);
                });  
            }
        }else{
            callback({"message": "Invalid request"});
        }       
        
    },
    getChats: function (req, callback) {
        console.log("Listing all chats");
        db = cloudant.db.use(chat_dbname);
        let dbquery = query.getChats(req);
        db.find(dbquery, function (err, data) {
            callback(err, data);
        });
    },
};
