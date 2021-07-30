const query = require("./query");
const config = require("./config");
var fs = require("fs").promises;
var formidable = require('formidable');
const cloudant = config.Cloudant;
const spots_dbname = 'c4c-water-spots';
let db = null;

module.exports = {
    getSpots: function (request,callback) {
        db = cloudant.db.use(spots_dbname);
        var dbquery =query.getSpots(request);        
        db.find(dbquery, function (err, data) {
            callback(err, data);
        });
    },
    
    preparePayload : (request) =>{
        var comment = "";
        var admin_id = "";
        var status = "Submitted";
        if(request.body.approval_stat && request.body.approval_stat.comment)
            comment = request.body.approval_stat.comment;

        if(request.body.approval_stat && request.body.approval_stat.admin_id)
            admin_id = request.body.approval_stat.admin_id;

        if(request.body.approval_stat && request.body.approval_stat.comment)
            status = request.body.approval_stat.status;

        var objectStatus = {
            "comment": comment,
            "admin_id":admin_id,
           "status": status,
           "last_updated":Date.now()
        }

        return { 
            modifiedDate: Date.now(),
            approval_stat: objectStatus,
            ...((request.body.name) && {name: request.body.name}),
            ...((request.body.vendor_id)&& {vendor_id:request.body.vendor_id}),
            ...((request.body.mobile)&& {mobile:request.body.mobile}),
            ...((request.body.email)&& {email:request.body.email}),
            ...((request.body.address)&& { address:request.body.address}),
            ...((request.body.pin)&& {pin:request.body.pin}),
            ...((request.body.lat)&& {lat:request.body.lat}),
            ...((request.body.long)&& {long:request.body.long}),
            ...((request.body.capacity)&& {capacity:request.body.capacity}),
            ...((request.body.status)&& {status:request.body.status}),
            ...((request.body.approval_stat)&& {approval_stat: request.body.approval_stat}),
            ...((request.body.source_type)&& { distance: request.body.source_type}),
            ...((request.body.quality_params)&& {quality: request.body.quality_params}),
            ...((request.body.feedback)&& {feedback: request.body.feedback})
        };
    },

    add:async function (req,res, callback) {
        var formfields = await new Promise(function (resolve, reject) {
            var form = new formidable.IncomingForm({multiples: true});
            form.parse(req, function (err, fields, files) {
                let details = {};
                if (err) {
                    reject(err);
                    return;
                }
                details.fields = fields;
                if(files){
                    details.files = files;
                }
                resolve(details);
            });
        });
        var dataForPayload = {};
        dataForPayload.body = formfields.fields;
        let latlong = {};
        let payloadData = {...this.preparePayload(dataForPayload), createdDate : Date.now()};
        if(!(payloadData.lat)){
            latlong = await(config.getAddressToLatLong(dataForPayload.body.address));
            payloadData.lat = latlong.lat;
            payloadData.long = latlong.long;
        }
//        if(formfields.fields.images){
        var combinedFileDetails = [];
        if(formfields.fields.images){
            const base64Content = formfields.fields.images;
            let base64ContentArray = base64Content.split(",")     
            var imagesPair = await this.sliceIntoChunks(base64ContentArray,2);
            
            for (const val of imagesPair) { 
                let fileExtension = val[0].match(/[^:/]\w+(?=;|,)/)[0];
                let filename =  "/uploads/"+Date.now()+"."+fileExtension;
                await fs.writeFile("./public/"+filename, val[1], 'base64', function(err) {
                    //console.log(filename);
                });
                combinedFileDetails.push(filename);
            }
            if(combinedFileDetails){
                payloadData.images = combinedFileDetails;
            }

        }
        db = cloudant.db.use(spots_dbname);
        db.insert(payloadData, function (error, data) {
            var responseData = {};
            if (data) {
                responseData.success = true;
                responseData.message = "Spot added successfully for verification process.";
            } else {
                responseData.success = false;
                responseData.message = error;
            }
            res(null,responseData); 
        });
        // }else{
        //     var responseData = {};
        //     responseData.message = "Please provide spot images";
        //     res(responseData);
        // }
    },

    update: async function (request, callback) {
        db = cloudant.db.use(spots_dbname);
        let existingData = await db.find({selector:{_id :request.body._id}});
        //Check if exist then update else inser new document
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

    delete: async function (request, callback) {
        db = cloudant.db.use(spots_dbname);
        let existingData = await db.find({selector:{_id :request.body._id}});
        //Check if exist then delete document
        if(existingData && existingData.docs && existingData.docs.length > 0){
            console.log(existingData.docs[0]);
            db.destroy({_id :request.body._id}, { _rev: existingData.docs[0]._rev }, function (error, data) {
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
    },

    readAndWriteFile: function(singleImg, newPath){
        fs.readFile(singleImg.path , function(err,data) {
            fs.writeFile(newPath,data, function(err) {
                if (err) console.log('ERRRRRR!! :'+err);
                //console.log('Fitxer: '+ newPath);
            })
        })
    },

    sliceIntoChunks : async function(arr, chunkSize) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }
};
