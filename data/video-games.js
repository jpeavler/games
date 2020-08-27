const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

//Connection URL and Database Settings
const url = process.env.ATLAS_CONNECTION;
const settings = {useUnifiedTopology: true};

//Database and Collection Names
const dbName = 'games';
const colName = 'video_games';

//READ functions
const getGames = () => {
    const myPromise = new Promise((resolve, reject) =>{
        MongoClient.connect(url, settings, function(err, client) {
            if(err){
                reject(err);
            }else{
                console.log("Connected to DB server for READ");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.find({}).toArray(function(err, docs) {
                    if(err){
                        reject(err);
                    } else {
                        console.log("Found the following Video Games")
                        console.log(docs);
                        resolve(docs);
                        client.close();
                    }
                });
            }
        });
    });
    return myPromise;
};