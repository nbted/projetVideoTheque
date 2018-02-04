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
				img : "https://i.ytimg.com/vi/N4c6TT1CSkY/hqdefault.jpg",
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

exports.findVideoByUrl = function(url, callback) {
    MongoClient.connect(urld, function(err, db) {
        if(!err) {
        	// La requete mongoDB

            let myquery = { "url": url};

            db.collection("videosMBDS") 
            .findOne(myquery, function(err, data) {
            	let reponse;

                if(!err){
                    reponse = {
                    	succes: true,
                        video : data,
                        error : null,
                        msg:"Details du video envoyés"
                    };
                } else{
                    reponse = {
                    	succes: false,
                        video : null,
                        error : err,
                        msg: "erreur lors du find"

                    };
                }
                callback(reponse);
            });
        } else {
        	let reponse = reponse = {
                    	succes: false,
                        restaurant : null,
                        error : err,
                        msg: "erreur de connexion à la base"
                    };
            callback(reponse);
        }
    });
}