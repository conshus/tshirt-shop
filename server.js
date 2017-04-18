let express = require('express');
let app = express();
let catalog = require('./catalog.json');
//let path = require('path');
app.use(express.static(__dirname))
//app.use("/", express.static(path.join(__dirname)));
app.get('/',function (request, response){
  //response.send('hello world');
  //response.sendFile(path.join(__dirname+'/index.html'));
  response.sendFile('./index.html', {root: __dirname });
})

app.get('/tshirt/:shirtId', function (request, response) {
  //response.send(request.params);
  let shirtId = request.params.shirtId;
  let color = request.params.color;
  let index = parseInt(shirtId);
  let shirt = catalog[index];
  response.send(shirt);
  response.send(color);
})
app.listen(3000, function(){
console.log('The express server is now listening at port 3000. To see it in action, open your broweser and enter localhost:3000/greeting in the address bar.');
})
