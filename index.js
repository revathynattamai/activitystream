let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let router = express.Router();
// const controller = require('./mail.controller');
const mailbox = [];
// let cassandra = require('cassandra-driver');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const PORT = 3000;

app.use('/api', router);
router.get('/', function(req, res) {
  res.json("MAILBOX API");
});


router.route('/mailbox')
  .post(function(req, res) {
    // var mail = new Mail(); // new instance of mail created
    const newMail = {
     name: req.body.name,
    id: req.body.id
  }
    mailbox.push(newMail);
    res.status(201).json(newMail);
  })

.get(function(req, res) {
    res.status(200).json(mailbox);
    });
 

  
;


app.listen(PORT);
console.log('Server listening on port ' + PORT);
