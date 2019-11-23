var express = require('express');
var app = express();

var bodyParser = require('body-parser');
const fs = require('fs');
var convert = require('xml-js');
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

//metodos api-rest
app.get("/", function(req, res, next){
    fs.readFile('./tmp/datos.xml','utf-8',(err,data)=>{
    if(err){
      console.log('error: ', err);
    } else {
      //console.log(data);
      res.send(data);
    }
  });

});

app.post("/", function(req, res, next){
  console.log(req.body);
  var options = {compact: true, ignoreComment: true, spaces: 4};
  var result = convert.json2xml(req.body, options);
  console.log(result);
  fs.writeFileSync('./tmp/datos.xml', result);
  res.send(result);
});
/////////////////////////


//servidor en el puerto
app.listen(PORT, function () {
  console.log('Servidor en el puerto 3000');
});
