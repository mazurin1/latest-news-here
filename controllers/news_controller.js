var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");
var axios = require("axios");


// var burger = require("../models/burger.js");

// get route -> index
router.get("/", function(req, res) {
    res.render("index");
});

router.get("/all", function(req, res) {
 // Making a request via axios for `nhl.com`'s homepage
 var results = [];

 axios.get("http://www.justjaredjr.com/").then(function(response) {

    // Load the body of the HTML into cheerio
    var $ = cheerio.load(response.data);
  
    // Empty array to save our scraped data
  
    // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
    $(".post h2").each(function(i, element) {
      console.log(element);
  
      // Save the text of the h4-tag as "title"
      var title = $(element).text();
  
      // Find the h4 tag's parent a-tag, and save it's href value as "link"
      var link = $(element).children("a").attr("href");
  
      // Make an object with data we scraped for this h4 and push it to the results array
      results.push({
        title: title,
        link: link
      });
    });
  
  
  
    // After looping through each h4.headline-link, log the results
    console.log(results);

    res.send(results);
  });
  
 
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for burger.addBurger
  burger.insertOne(req.body.burger_name, function(result) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/burgers/:id", function(req, res) {
  burger.updateOne(req.params.id, function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});

module.exports = router;
