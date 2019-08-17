
var express = require("express");

var PORT = process.env.PORT || 8000;
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// First, tell the console what server2.js is doing
console.log("\n******************************************\n" +
            "Grabbing every article headline and link\n" +
            "from the website:" +
            "\n******************************************\n");


var routes = require("./controllers/news_controller.js");
app.use(routes);



app.listen(process.env.PORT || PORT, function() {
  console.log("Listening on port:%s", PORT);
});