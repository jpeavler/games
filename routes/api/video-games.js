const express = require('express');
const router = express.Router();

const { getGames, getGameById } = require('../../data/video-games');

//Read:Get routes
router.get("/", async function(req, res) {
    try{
        const data = await getGames();
        res.send(data);
    }catch(err) {
        console.log(err);
        res.status(500).send("Internal server issue, check logs");
    }
});
router.get("/:id", async function(req, res) {
    try{
        const game = await getGameById(req.params.id);
        res.send(game);
    } catch(err) {
        if(err.error) { res.status(400).send(err); }
        else {
            console.log(err);
            res.status(500).send("Internal server issue, check logs")
        }
    }
});

module.exports = router;