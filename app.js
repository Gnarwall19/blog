const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./models');
const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect('mongodb://localhost:27017/blog');

// Routes
app.get('/', (req, res) => {
  db.Post.find({}, (err, posts) => {
    res.render('index', {
      posts: posts
    })
  });
});

app.post('/addpost', (req, res) => {
  let postData = new db.Post(req.body);
  postData
    .save()
    .then(result => {
      res.redirect('/');
    }).catch(err => {
      res.status(400).send("Unable to sava data.");
    });
});

app.listen(3000, () => {
  console.log('Server Running.');
});