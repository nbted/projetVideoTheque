var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
var urld = 'mongodb://localhost:27017/test';
exports.connexionMongo = function(callback) {
	MongoClient.connect(urld, function(err, db) {
		assert.equal(null, err);
		callback(err, db);
	});
}

exports.findVideos = function(page, pagesize,callback) {
    MongoClient.connect(urld, function(err, db) {

        if(!err){
            
            db.collection('videosMBDS')
			.find()
			.skip(page*pagesize)
			.limit(pagesize)
            .toArray()
            .then(arr => callback(arr));
        }
        else{
            callback(-1);
        }
    });
};
exports.addVideos = function(formData,callback){
    MongoClient.connect(urld,function(err,db){
        if(!err){
			
            let videoInsert = {
                nom : formData.nomEtudiant,
                url : formData.urlVideo,
                comments:formData.comments
            };
            db.collection('videosMBDS')
            .insertOne(videoInsert, function(err,result){
                let reponse;
                if(!err){
                    reponse={
                        succes : true,
                        result : result,
                        error : null,
                        msg : "Ajout réussi " + result
                    };
                }
                else{
                    reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à l'insertion"
		            };
                }
            })
        }
    })
}

exports.updateVideo = function(id, formData, callback) {

	MongoClient.connect(urld, function(err, db) {
		if(!err) {
			let myquery = { "_id": ObjectId(id)};
			let newvalues={}
			if(!formData.nom){
				newvalues= { 	comments:formData.comments }
			}
			else if (!formData.comments){
				newvalues={nom:formData.nom} 
			}
			else{
				newvalues=
				{
					nom:formData.nom,
					comments:formData.comments
				} 
			}
	          
			db.collection("videosMBDS")
			.updateOne(myquery,{$set: newvalues}, function(err, result) {
	         	if(!err){
					console.log(myquery.toArray)
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Modification réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la modification"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la modification, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}

exports.deleteVideo = function(id, callback) {
	MongoClient.connect(urld, function(err, db) {
		if(!err) {
            let myquery = { "_id": ObjectId(id)};
	        
			db.collection("videosMBDS")
			.deleteOne(myquery, function(err, result) {
	         	if(!err){
			    	reponse = {
		                succes : true,
		                result: result,
		                error : null,
		                msg: "Suppression réussie " + result
		            };
			   	} else {
		            reponse = {
		                succes : false,
		                error : err,
		                msg: "Problème à la suppression"
		            };
			    }
			    callback(reponse);
	        });
		} else{
			let reponse = reponse = {
                    	succes: false,
                        error : err,
                        msg:"Problème lors de la suppression, erreur de connexion."
                    };
            callback(reponse);
		}
	});
}