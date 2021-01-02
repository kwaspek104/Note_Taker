const fs = require('fs');
const util = require('util');
const router = require('express').Router()

const path = require('path');
const readFileasync = util.promisify(fs.readFile);


router.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

    router.get("/api/notes", function (req, res) {
    readFileasync("../Develop/db/db.json", "utf8").then(data)
    });

    router.post("/api/notes", function(req, res) {
        // POST /api/notes - Should receive a new note to save 
        // on the request body, add it to the db.json file, 
        // and then return the new note to the client.
        data.push(req.body);
        res.json();
    });
    
    //then export it
    module.exports = router


   