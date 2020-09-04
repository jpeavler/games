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
            if(err){ reject(err); }
            else {
                const collection = client.db(dbName).collection(colName);
                collection.find({}).toArray(function(err, docs) {
                    if(err){ reject(err); }
                    else {
                        console.log("Found Video Game Collection");
                        resolve(docs);
                        client.close();
                    }
                });
            }
        });
    });
    return myPromise;
};
getGameById = (id) => {
    const myPromise = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, async function(err, client) {
            if(err) { reject(err); }
            else {
                const collection = client.db(dbName).collection(colName);
                try {
                    const _id = new ObjectID(id);
                    const result = await collection.findOne({_id});
                    if(result) { resolve(result); }
                    else { reject({error: "ID not found in database"}); }
                    client.close();
                }catch(err) { reject({error: "ID must be in ObjectID format"}); }
            }
        });
    });
    return myPromise;
};

module.exports = {
    getGames,
    getGameById,
    // getGameByTitle,
    // addGame,
    // updateGame,
    // updateGameValues,
    // deleteGame
}