const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const https = require("https");

const list_id = list_id;
const api = apikey;


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

      const url = "https://us8.api.mailchimp.com/3.0/lists/$list_id)"

      const options = {
        method: "POST",
        auth: "$(username):$(api)
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
