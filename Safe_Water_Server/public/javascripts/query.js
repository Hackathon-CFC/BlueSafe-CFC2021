'use strict';

module.exports = {
    SPOTS_FIELDS : [
        "_id",
        "vendor_id",
        "mobile",
        "email",
        "city",
        "address",
        "pin",
        "lat",
        "long",
        "capacity",
        "status",
        "approval_stat",
        "quality_params",
        "feedback",
        "createdDate",
        "modifiedDate"
    ],
    COMPLAINTS_FIELDS : [
        "_id",
        "phLevel",
        "tdsLevel",
        "salinityLevel",
        "reason",
        "address",
        "pin",
        "mobile",
        "status",
        "createdDate",
        "modifiedDate"
    ],
    USER_FIELDS :[
        "_id",
        "name",
        "comp_name",
        "regNo",
        "email",
        "mobile",
        "address",
        "role",
        "vendor_type",
        "loginStatus",
        "createdDate",
        "modifiedDate"
    ],
    validateUser: (request) =>{
        return {
            "selector": {
                user : request.body.user,
                password : request.body.password
            },
            "fields": this.USER_FIELDS
        };
    },
    getAllUser:  () => {
        return {
            "selector": {
            },
            "fields": this.USER_FIELDS
        };
    },
    getSpots:  (request) => {
        const select = {
            ...((request.body._id) && { _id: request.body._id}),
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
    
        return  {
            "selector": select,
            "fields" : this.SPOTS_FIELDS
         };
    },
    getComplaints:  (request) => {
        const select = {
            ...((request.body._id) && { _id: request.body._id}),
            ...((request.body.phLevel)&& {phLevel:request.body.phLevel}),
            ...((request.body.tdsLevel)&& { tdsLevel:request.body.tdsLevel}),
            ...((request.body.salinityLevel)&& {salinityLevel:request.body.salinityLevel}),
            ...((request.body.reason)&& {reason:request.body.reason}),
            ...((request.body.address)&& {address:request.body.address}),
            ...((request.body.pin)&& {pin:request.body.pin}),
            ...((request.body.mobile)&& {mobile:request.body.mobile}),
            ...((request.body.status)&& {status:request.body.status}),
            };
    
        return  {
            "selector": select,
            "fields" : this.COMPLAINTS_FIELDS
         };
    },
    getComplaintStatus: (request) => {
        const select = {
            ...((request.body._id) && { _id: request.body._id})
            };
        return {
            "selector": select,
            "fields" : [
                "_id","status"
            ]
        }
    } ,
    getUsers:  (request) => {
        const select = {
            ...((request.body._id) && { _id: request.body._id}),
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
    
        return  {
            "selector": select,
            "fields" : [
                "_id", "name", "comp_name", "regNo", "email", "mobile", "address","role" ,"vendor_type", "createdDate"
            ]
         };
    },
    getChats:  (request) => {
        const select = {
            ...((request.query.mobile) && { mobile: request.query.mobile})
            };
        return {
            "selector": select,
            "fields" : [
                "_id","mobile", "data"
            ]
        }
    } 
}