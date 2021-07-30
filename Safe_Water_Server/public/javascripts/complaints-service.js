const query = require("./query");
const config = require("./config");

const cloudant = config.Cloudant;
const complaints_dbname = 'c4c-complaints';
let db = null;

module.exports = {
    getComplaints: function (request,callback) {
        db = cloudant.db.use(complaints_dbname);
        var dbquery =query.getComplaints(request);        
        db.find(dbquery, function (err, data) {
            callback(err, data);
        });
    },
    
    preparePayload : (request) =>{
        return { 
            modifiedDate: Date.now(),
            ...((request.body.phLevel)&& {phLevel:request.body.phLevel}),
            ...((request.body.tdsLevel)&& {tdsLevel:request.body.tdsLevel}),
            ...((request.body.salinityLevel)&& {salinityLevel:request.body.salinityLevel}),
            ...((request.body.reason)&& {reason:request.body.reason}),
            ...((request.body.address)&& {address:request.body.address}),
            ...((request.body.pin)&& {pin:request.body.pin}),
            ...((request.body.mobile)&& {mobile:request.body.mobile}),
            ...((request.body.status)&& {status:request.body.status})
        };
    },

    add: function (request, callback) {
        db = cloudant.db.use(complaints_dbname);
        let payloadData = {...this.preparePayload(request), createdDate : Date.now()};
        console.log(payloadData);
        db.insert(payloadData, function (error, data) {
            var response = {};
            if (data) {
                response["success"] = true;
            } else {
                response["success"] = false;
            }
            callback(error, response);
        }); 
    },

    update: async function (request, callback) {
        db = cloudant.db.use(complaints_dbname);
        let existingData = await db.find({selector:{_id :request.body._id}});
        //Check if exist then update else insert new document
        if(existingData && existingData.docs && existingData.docs.length > 0){
            let payloadData = {...existingData.docs[0], ...this.preparePayload(request)};
            console.log(existingData.docs[0]);
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
            db.insert(payloadData, function (error, data) {
                var response = {};
                if (data) {
                    response["success"] = true;
                    response["data"] =data;
                } else {
                    response["success"] = false;
                }                
                callback(error, response);
            });
        }       
    },

    getComplaintStatus: async function (request,callback) {
        db = cloudant.db.use(complaints_dbname);
        let existingData = await db.find({selector:{_id :request.body._id}});
        if(existingData && existingData.docs && existingData.docs.length > 0){
            var dbquery =query.getComplaintStatus(request);        
            db.find(dbquery, function (err, data) {
                callback(err, data);
            });
        }else{
            callback({"message": "Complaint not found"});
        }
    },
};