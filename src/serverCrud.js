const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8080;
const server   = require('http').Server(app);
const mongoDBModule = require('./crud-mongo');

const bodyParser = require('body-parser');

var multer = require('multer');
var multerData = multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "POST,DELETE,PUT,GET")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });
  


server.listen(port);

console.log("Serveur lancé sur le port : " + port);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/app/app.component.html');
});


app.get('/api/connection', function(req, res) {
	
   mongoDBModule.connexionMongo(function(err, db) {
   	let reponse;

   	if(err) {
   		console.log("erreur connexion");
   		reponse = {
   			msg: "erreur de connexion err=" + err
   		}
   	} else {
   		reponse = {
   			msg: "connexion établie"
   		}
   	}
   	res.send(JSON.stringify(reponse));

   });
});

app.get('/api/videos', function(req, res) { 
	 
	// Si présent on prend la valeur du param, sinon 1
    let page = parseInt(req.query.page || 0);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 6);

	mongoDBModule.findVideos(page, pagesize,function(data) {
 		var objdData = {
 			msg:"videos recherchés avec succès",
 			data: data
 		}
 		res.send(JSON.stringify(objdData)); 
 	}); 
}); 

app.post('/api/videos', multerData.fields([]), function(req, res) {
 	mongoDBModule.addVideos(req.body, function(data) {
		 res.send(JSON.stringify(data)); 
		console.log(req.body)
 	});
});

app.put('/api/videos/:id', multerData.fields([]), function(req, res) {
	var id = req.params.id;
	console.log("teddy"+  req.body)
 	mongoDBModule.updateVideo(id, req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

app.delete('/api/videos/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.deleteVideo(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
})