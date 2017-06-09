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


//Home
app.use('/api', router);
router.get('/', function(req, res) {
  res.json("MAILBOX API");
});

//Mailbox get and post
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
  
 //Fetch with username
 router.route('/mailbox/:name')
 .get(function(req,res){
   const name = req.params.name;
   const filterusername = mailbox.filter((username)=>{
    return username.name == name;
  });
  
     if(filterusername.length === 0)
      { res.status(404).send(); return; }
     res.status(200).json(filterusername[0]);
});


//Delete the mailbox with name
router.route('/mailbox/:name')
.delete(function(req,res){
  const name = req.params.name;
   const filterusername = mailbox.filter((username)=>{
    return username.name == name;
});

if (filterusername.length === 0){
  res.status(404).send("mailbox not found");return;
}
const index = mailbox.indexOf(filterusername[0]);
mailbox.splice(index, 1);
res.status(200).json("mailbox deleted");
});

app.listen(PORT);
console.log('Server listening on port ' + PORT);
