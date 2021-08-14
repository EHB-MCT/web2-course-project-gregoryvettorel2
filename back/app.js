let db, collection;

//Express
const express = require('express');
const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

//middleware vars
const bodyparser = require('body-parser');
const cors = require('cors');

//Mongoconfig
const MongoClient = require('mongodb').MongoClient;
const URI = 'mongodb+srv://admin:admin@cluster0.j7dmw.mongodb.net/Boeken?retryWrites=true&w=majority';
const DB_NAME = 'Boeken';
const client = new MongoClient(URI, {
  useNewUrlParser: true
});

//middleware
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
app.use(cors());

//routes
bookRouter.route('/books')
  //GET ROUTE (WORKS)
  .get((req, res) => {
    console.log(req);
    collection = db.collection("Boeken");
    collection.find({}).toArray((error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.json(result);
    });
  })
  //POST ROUTE (WORKSsssSS)
  .post((req, res) => {
    collection = db.collection("Boeken");
        
    collection.insertOne(req.body).then(result => {
        console.log(result);
    });
    
    res.send('Data is sent to Boeken');
});

//
app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my nodemon API');
});

//Localhost server
app.listen(port, () => {
  console.log(`running on port ${port}`);
  client.connect(err => {
    if (err) {
      throw err;
    }
    db = client.db(DB_NAME);
    console.log(`Connected to database: ${DB_NAME}!`);
  });
});