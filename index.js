const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const https = require("https");

const listid = "2628650517";
const api = "b66a05249adfe3abf7d103a9b31ce496-us8";


app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.post("/", function(req, res) {

      const firstName = req.body.fname;
      const lastName = req.body.lname;
      const email = req.body.email;

      const data = {
        members: [{
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }]
      };


      const jsonData = JSON.stringify(data);

      const url = "https://us8.api.mailchimp.com/3.0/lists/2628650517"

      const options = {
        method: "POST",
        auth: "terrillhilliard96@gmail.com:b66a05249adfe3abf7d103a9b31ce496-us8"
      }



      const request = https.request(url, options, function(response) {

        if(response.statusCode === 200) {
          res.sendFile(__dirname + "/success.html");
        } else {
          res.sendFile(__dirname + "/failure.html");
        }
        



        response.on("data", function(data) {
          console.log(JSON.parse(data));
        })
      });

      request.write(jsonData);
      request.end();


    });


    app.listen(3000, function() {
      console.log("Server on Port 3000");
    });
