var express = require("express");
var http = require("http");
var path = require("path");
var nodemailer = require("nodemailer");

var app = express();
var server = http.Server(app);
var port = 500;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "static")));
app.use(express.static('public'));

// Routing
app.get("/", function(req, response){
    response.sendFile(path.join(__dirname, "static/index.html")); 
})

app.post("/send_email", function(req, response){
    var from = req.body.from;
    var to = req.body.to;
    var subject = req.body.subject;
    var message = req.body.message;

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "fba54f0b93edeb",
          pass: "3cba072db731dc"
        }
      }); 

      var mailOptions = {
        from: from,
        to: to,
        subject:subject,
        text:message,
      };
      transport.sendMail(mailOptions, function(error, info){
         if(error){
           console.log(error)
         } else{
            console.log("Email sent: " + info.response)
         }


      })
})
// Initialize web server

server.listen(port, function(){
    console.log("starting server on port " + port)
})
console.clear()