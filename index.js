const PORT = process.env.PORT || 5000;
var http = require("http");
var fs  = require("fs");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//Body-parser
app.use(bodyParser.urlencoded({ extended: true}));
//Express
app.use(express.static(__dirname + '/views/pages'));
//Ejs
app.set('view engine' , 'ejs');


//ROUTES

//INDEX.GET
app.get('/', function (req, res) {
  res.render('pages/index', {
    new_paragraph: "Designed by VectorArt"
  });
});



app.get('/guestbook', function (req, res) {
  //Place json data into a variable and pass it to guestbook.ejs-template
  var jsonData = require('./views/pages/json_guestbook_data.json');
  res.render('pages/guestbook', {jsonData});
  
});


//NEWMESSAGE.GET
app.get('/newmessage', function (req, res) {
  res.render('pages/newmessage', {
    new_header: "/NEWMESSAGE PAGE"
  });
});


//NEWMESSAGE.POST
app.post('/newmessage', function (req, res) {

  var data = require("./views/pages/json_guestbook_data.json");

    //Push data
    data.push({
        "username": req.body.name,
        "country": req.body.country,
        "message": req.body.message,
        "date": new Date()
    });
    
    //Convet the JSON object
    var jsonStr = JSON.stringify(data);

    //Write the new information in the file
    fs.writeFile('./views/pages/json_guestbook_data.json', jsonStr, (err) => {
        if(err) throw err;
        console.log("Data saved");
    });
    res.send("Saved data to file json_guestbook_data.json type /guestbook to have a look")
  
  /*fs.readFile('./views/pages/json_guestbook_data.json', 'utf-8', function(err, data) {
    if (err) throw err
  
    var jsonArray = JSON.parse(data)
    console.log(jsonArray);

    jsonArray.push({
      "username": req.body.name,
      "country": req.body.country,
      "message": req.body.message,
      "date": new Date()
    });
    
    console.log(jsonArray);

    //Write the new information in the file
    fs.writeFile('./views/pages/json_guestbook_data.json', JSON.stringify(jsonArray), 'utf-8', function (err) {
      if(err) throw err;
      console.log("Data saved");
    });
    res.send("Saved data to file json_guestbook_data.json type /guestbook to have a look");Ä
  })*/
});


app.post('/ajaxmessage', function (req, res) {
  
  
  var name = req.body.name;
  var country = req.body.country;
  var message = req.body.message
  console.log(name, country, message);

  var data = require("./views/pages/json_guestbook_data.json");

  //Push data
  data.push({
      "username": req.body.name,
      "country": req.body.country,
      "message": req.body.message,
      "date": new Date()
  });
  
  //Convet the JSON object
  var jsonStr = JSON.stringify(data);

  //Write the new information in the file
  fs.writeFile('./views/pages/json_guestbook_data.json', jsonStr, (err) => {
      if(err) throw err;
      console.log("Data saved"); 
  });

  //Parse data
  var result = '<table border="1" align="center">';

  for (var i=0; i < data.length; i++) {
      result +=
      '<tr>' +
          '<td>'+ data[i].username +'</td>' +
          '<td>'+ data[i].country +'</td>' +
          '<td>'+ data[i].message +'</td>' +
          '<td>'+ data[i].date +'</td>' +
      '</tr>'
  }
  res.send(result);
});

app.get('/ajaxmessage', function (req, res) {
    res.render('pages/ajaxmessage', {
    new_header: "/AJAXMESSAGE PAGE",
    new_headerTwo: "SAVED DATA BELOW"
  });
});

app.listen(PORT);
//app.listen(8081);
console.log('8081 is the magic port');
