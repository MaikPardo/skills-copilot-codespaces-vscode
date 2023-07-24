//create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./model/comments');

// connect to database
mongoose.connect('mongodb://localhost/comments', function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a new comment in the database
app.post('/comment', function (req, res) {
    var newComment = Comment({
        name: req.body.name,
        comment: req.body.comment
    });

    newComment.save(function (err) {
        if (err) throw err;
        res.send('Success');
    });
});

// Get a list of all comments in the database
app.get('/comments', function (req, res) {
    Comment.find({}, function (err, comments) {
        if (err) throw err;
        res.send(comments);
    });
});

// Get a single comment by id
app.get('/comment/:id', function (req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) throw err;
        res.send(comment);
    });
});

// Update a comment by id
app.put('/comment/:id', function (req, res) {
    Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, comment) {
        if (err) throw err;
        res.send('Comment successfully updated!');
    });
});

// Delete a comment by id
app.delete('/comment/:id', function (req, res) {
    Comment.findByIdAndRemove(req.params.id, function (err) {
        if (err) throw err;
        res.send('Comment successfully deleted!');
    });
});

// Start the server
app.listen(3000);
console.log('Listening on port 3000');