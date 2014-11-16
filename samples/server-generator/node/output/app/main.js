var express = require("express")
 , url = require("url")
 , cors = require("cors")
 , swagger = require("swagger-node-express")
 , db = false

var app = express();
app.use(express.bodyParser());

var corsOptions = {
  credentials: true,
  origin: function(origin,callback) {
    if(origin===undefined) {
      callback(null,false);
    } else {
      callback(null,true);
    }
  }
};

app.use(cors(corsOptions));

swagger.setAppHandler(app);  
swagger.configureSwaggerPaths("", "api-docs", "")

var models = require("./models.js");

var UserApi = require("./apis/UserApi.js");
var PetApi = require("./apis/PetApi.js");
var StoreApi = require("./apis/StoreApi.js");
swagger.addModels(models)
  .addPOST(UserApi.createUsersWithArrayInput)
.addPOST(UserApi.createUsersWithListInput)
.addPUT(UserApi.updateUser)
.addDELETE(UserApi.deleteUser)
.addGET(UserApi.getUserByName)
.addGET(UserApi.loginUser)
.addGET(UserApi.logoutUser)
.addPOST(UserApi.createUser)
.addPUT(PetApi.updatePet)
.addPOST(PetApi.addPet)
.addGET(PetApi.findPetsByStatus)
.addGET(PetApi.findPetsByTags)
.addPOST(PetApi.updatePetWithForm)
.addGET(PetApi.getPetById)
.addDELETE(PetApi.deletePet)
.addPATCH(PetApi.partialUpdate)
.addPOST(PetApi.uploadFile)
.addPOST(StoreApi.placeOrder)
.addDELETE(StoreApi.deleteOrder)
.addGET(StoreApi.getOrderById)
;
  // configures the app
swagger.configure("http://localhost:8002", "0.1");

//  start the server
app.listen(8002);

