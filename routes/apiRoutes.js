const fs = require('fs');
const util = require('util');

const readFileasync = util.promisify(fs.readFile);

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
    readFileasync("../Develop/db/db.json", "utf8").then(data)
    });

    app.post("/api/notes", function(req, res) {
        // POST /api/notes - Should receive a new note to save 
        // on the request body, add it to the db.json file, 
        // and then return the new note to the client.
        data.push(req.body);
        res.json();
    });
};
