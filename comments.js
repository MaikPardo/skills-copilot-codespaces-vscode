//create web server
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//set up body-parser
app.use(bodyParser.urlencoded({extended: true}));

//set up comments array
var comments = [
    {title: "Great place!", author: "Homer"},
    {title: "Bad place!", author: "Bart"},
    {title: "I don't know.", author: "Lisa"}
];

//set up ejs
app.set("view engine", "ejs");

//set up root route
app.get("/", function(req, res) {
    res.render("landing");
});

//set up comments route
app.get("/comments", function(req, res) {
    res.render("comments", {comments: comments});
});

//set up new route
app.get("/comments/new", function(req, res) {
    res.render("new");
});

//set up post route
app.post("/comments", function(req, res) {
    //get data from form and add to comments array
    var title = req.body.title;
    var author = req.body.author;
    var newComment = {title: title, author: author};
    comments.push(newComment);
    //redirect back to comments page
    res.redirect("/comments");
});

//set up server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started!");
});
