import express from 'express';
import { connect } from 'mongoose';
import bodyParser from 'body-parser';


const app = express();
connect('mongodb://localhost:27017/blog');

app.engine('html', require(ejs).rednerFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server Running.');
});