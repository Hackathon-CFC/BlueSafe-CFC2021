# CFC-2021-Safe-Water-master

# Prerequisite:-

1. Setup Docker based on your machine https://docs.docker.com/engine/install/
2. Create a K8s cluster in IBM Cloud https://cloud.ibm.com/kubernetes/clusters
3. Setup a container registry in IBM Cloud https://cloud.ibm.com/registry/start

# Steps to run the application locally:

1. Clone the source code repo https://github.com/deepakb2410/CFC-2021  using command  : git clone https://github.com/deepakb2410/CFC-2021
2. Go to directory CFC-2021/Safe_Water_Server
3. Run command : npm install
4. Start the application server : npm app.js 
5. Application listens on Ports , HTTPS: 3000 and HTTP: 4000 
6. Use local browser to verify the behaviour https://localhost:3000/server Or http://localhost:4000/server

# Steps to run application on K8s cluster in IBM Cloud:

1. Set the context for created K8s Cluster using below commands:

       ibmcloud login -a cloud.ibm.com -r us-south -g <resource-group> -u <user-name> -p  <password>

       ibmcloud ks cluster config --cluster <cluster-id>

       kubectl config current-context

2.  Build Docker image by going into directory CFC-2021/Safe_Water_Server and and push it to registry:

         cd CFC-2021/Safe_Water_Server
   
         docker build -t cfc2021-image:v0.1  .

         docker tag cfc2021-image:v0.1 icr.io/<created-namespace>/cfc2k21:v0.1

         docker push icr.io/dtiwarins/cfc2k21:v0.1

 3. Deploy application using command : kubectl apply -f cfc2021app-deployment/service.yaml for all 4 files starting with  cfc2021app- . 

 4.  Get pubic IP to access the application using command : ibmcloud ks worker ls --cluster <cluster-id>

 5. Access the application in browser using https://169.51.206.234:31110/server Or http://169.51.206.234:31111/server 

## Backend API's:

###### User Registration:

       URL:  http://169.51.206.234:31111/users/signup 
       Request Type: POST 
       Header: Bearer <TOKEN> 
       Body: must be RAW Json 
       { "name": "Jayant Sharma", "mobile" : "XXXXXXXXXX", "password": "XXXXXXXXXX", "address" : "Chattarpur Enclave, Phase 2, Delhi-110074"} 
       On Success (Json Response) (returns User ID) 
       {"success": true,"data": {"ok": true,"id": "5ed79f4ff8f1b6314907f4b908683345","rev": "1-d1b53a1a4ddd3e509f0bacb7840d0b34"}} 

###### Get All Users 

       URL: http://169.51.206.234:31111/users/ 
       Request Type: POST 
       Header: Bearer <TOKEN> 
       On Success (Json Response) (returns Users Details) 

###### Search User’s with filter 

       URL: http://169.51.206.234:31111/users/ 
       Request Type: POST 
       Header: Bearer <TOKEN> 
       Body: must be RAW Json (have any user’s profile field like (_id/mobile/name/address) will must be exact match) 
       {"mobile": "XXXXXXXXXX"} 
       On Success (Json Response) (returns Users Details)
       [{"_id": "5ed79f4ff8f1b6314907f4b908683234","name": "Jayant Sharma","mobile": "XXXXXXXXXX","address": "Chattarpur Enclave, 
       Phase 2, Delhi-110074","createdDate": 1626792278050}] 

###### Add a new spot: 

       URL:  http://169.51.206.234:31111/spots/add  
       Request Type: POST  
       Header: Bearer <TOKEN> 
       Body: Form-data 
       {"name": "Agrawal Water Supply","city": "gurgaon","address": "123 Main St, Boston, Massachusetts 02129, United States",
       "pin": "122001","capacity": "15000L","source_type": "portable", images😟'base64 encode’} 
       Response: after successful (Json Response)

Note: at time of add a new spot, that have by default status is “Submitted” will be 'Approved' or 'Rejected' by admin after review spots details. 

###### Get All Spots 

       URL: http://169.51.206.234:31111/spots/ 
       Request Type: POST 
       Header: Bearer <TOKEN> 
       On Success (Json Response) (returns Spots Details) 

###### Search specific spot’s with filter 

       URL: http://169.51.206.234:31111/spots/ 
       Request Type: POST 
       Header: Bearer <TOKEN> 
       Body: must be RAW Json (have any user’s profile field like (_id/mobile/name/address) will must be exact match) 
       {"pin": "122001"} 
       On Success (Json Response) (returns Users Details) 

###### Spots 'Approved' or 'Rejected' by admin 

       URL: http://169.51.206.234:31111/admin/updateSpotState/<SPOT ID> 
       Request Type: PUT 
       Header: Bearer <TOKEN> 
       Body: must be RAW Json  
       { 
       "approval_stat":{ 
               "status": "Approved", 
               "comment": "Verified online, on-site verification initiated.", 
               "admin_id": "4429bbfadcf2a3ba34e657bdb709cb86" 
           } 
       } 
       Response: after success (Json Response)

Note: spot id must be a valid otherwise API will return response like ‘please provide a valid spot id’  

###### Watson API for store and get user chat details

       URL: https://169.51.206.234:31110/users/chats?mobile=9999999999
       Request Type: GET 
       Response: after success (Json Response)
       
       URL: https://169.51.206.234:31110/users/storechatdetails?mobile=<Mobile_no>&location=<Location>&flow=<flow>&main_menu=<menu>&category=<water_quality>&feedback=<feedback>&user_info=<info>&user_detail=<details>
       Request Type: GET 
       Response: after success (Json Response)
       
###### Add a new Complaint: 

       URL:  http://169.51.206.234:31111/complaints/add  
       Request Type: POST  
       Header: Bearer <TOKEN> 
       Body: Form-data 
       { "phLevel":"15","tdsLevel":"125","salinityLevel":"13","reason": "testing final api","address":"Saket, New Delhi",
       "pin":"110074","mobile":"8882165739","status":"New" }
       Response: after successful (Json Response)

###### Get All Complaints 

       URL: http://169.51.206.234:31111/complaints/ 
       Request Type: POST 
       Header: Bearer <TOKEN> 
       On Success (Json Response) (returns Complaints Details) 
