//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
var app = express();




app.listen(process.env.PORT || 3000, function() {
  console.log("Server is open at port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var name = req.body.name;
  var lastName = req.body.lastName;
  var mail = req.body.inputEmail;
  console.log(name + lastName + mail);

  var data = {
    members: [{
      "email_address": mail,
      "status": "subscribed",
      "merge_fields": {
        "FNAME": name,
        "LNAME": lastName
      }
    }]
  };
  var jsonData = JSON.stringify(data);
  console.log(jsonData);

  var options = {
    url: 'https://us16.api.mailchimp.com/3.0/lists/be8bb74540',
    method: 'POST',
    headers: {
      'Authorization': 'esentis ceaa00828a275ffef91bec169a0679c7-us16',
      'Content-Type': 'application/json'
    },
    body: jsonData
  };
  request(options, function(error, response, body) {
    if (response.statusCode==200) {
    res.sendFile(__dirname+"/success.html");
    } else if (response.statusCode>=400) {
      res.sendFile(__dirname+"/failure.html");
    }
  });

});
app.post("/failure",function(req,res){
  res.redirect("/");
});


//API KEY
// ceaa00828a275ffef91bec169a0679c7-us16
//LIST ID
// be8bb74540
