const config = require("./config");
const cloudant = config.Cloudant;
const spots_dbname = 'c4c-water-spots';
const user_dbname = 'c4c-users';
let db = null;

module.exports = {
    preapareSpotStatusData : (request) =>{
        return { 
            modifiedDate: Date.now(),
            ...((request.body.approval_stat)&& {approval_stat: request.body.approval_stat})
        };
    },
    updateSpotStatus: async function (request, callback) {
        db = cloudant.db.use(spots_dbname);
        let response = {};
        let existingData = await db.find({selector:{_id :request.params.spotId}});
        //Check if exist then update else inser new document
        if(existingData && existingData.docs && existingData.docs.length > 0){
            user_db = cloudant.db.use(user_dbname);
            var status = ["Approved", "Rejected", "Submitted"].includes(request.body.approval_stat.status);
            let existingUserData = await user_db.find({selector:{_id :request.body.approval_stat.admin_id,role: 'Admin'}});
            if(existingUserData.docs.length && status){
                let payloadData = {...existingData.docs[0], ...this.preapareSpotStatusData(request)};
                await db.insert(payloadData, { _rev: existingData.docs[0]._rev }, function (error, data) {
                    if (data) {
                        response["success"] = true;
                        response["data"] = data;
                    } else {
                        response["success"] = false;
                    }
                    callback(null, response);
                });
            }else{
                response["success"] = false;
                if(status == false){
                    response["data"] = "Wrong status, please provide 'Approved' or 'Rejected'";  
                }else{
                    response["data"] = "Wrong admin id or you don't have permission to update";  
                }
                callback(null, response);
            }
        }else{
            response["success"] = false;
            response["data"] = "Wrong Spot ID";
            callback(null, response);
        }
    }
};
