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
app.get('/', function (req, res) {
  res.render('pages/index', {
    new_paragraph: "Designed by VectorArt"
  });
});

//Place json data into a variable and pass it to ejs-template
var jsonData = require('./views/pages/json_guestbook_data.json');

app.get('/guestbook', function (req, res) {
  res.render('pages/guestbook', {jsonData});
  
  });


app.get('/newmessage', function (req, res) {
  res.render('pages/newmessage', {
    new_header: "/NEWMESSAGE PAGE"
  });
});


app.post('/newmessage', function (req, res) {
  
  fs.readFile('./views/pages/json_guestbook_data.json', 'utf-8', function(err, data) {
    if (err) throw err
  
    var jsonArray = JSON.parse(data)
    console.log(jsonArray);

    jsonArray.push({
      "username": req.body.name,
      "country": req.body.country,
      "message": req.body.message,
      "date": new Date()
    })
    
    console.log(jsonArray);

    //Write the new information in the file
    fs.writeFile('./views/pages/json_guestbook_data.json', JSON.stringify(jsonArray), 'utf-8', function (err) {
      if(err) throw err;
      console.log("Data saved");
    });
    res.send("Saved data to file json_guestbook_data.json type /guestbook to have a look");

  })
});


app.get('/ajaxmessage', function (req, res) {
  res.render('pages/ajaxmessage', {
    new_header: "/AJAXMESSAGE PAGE",
    new_headerTwo: "SAVED DATA BELOW",
  });
});

app.listen(PORT);
//app.listen(8081);
console.log('8081 is the magic port');

/*
//create a server object:
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World!\n"); //write a response to the client
    response.write("<a href='index'>To Index Page<a/><br>");
    response.end("This is the end"); //end the response
  })
  
  .listen(PORT); //the server object listens on port 8080
*/