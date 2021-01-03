const fs = require('fs');
const util = require('util');
const router = require('express').Router()

const path = require('path');
const readFileasync = util.promisify(fs.readFile);


router.get("/notes", function (req, res) {
    readFileasync("./Develop/db/db.json", "utf8").then(
        data => {
            console.log(data)
            res.send(data)
        })
});

router.post("/notes", function (req, res) {
    console.log("POST-ROUTE HAS BEEN HIT")
    readFileasync("./Develop/db/db.json", "utf8").then(
        function (data) {
            console.log(data);
            var newBody = req.body;
            var stringedData = JSON.parse(data)

            stringedData.push(req.body);
            res.json(newBody);
            console.log(req.body)

            fs.writeFile("./Develop/db/db.json", JSON.stringify(stringedData), (err) => { 
                if (err) 
                  console.log(err); 
                else { 
                  console.log("File written successfully\n"); 
                  console.log("The written has the following contents:"); 
                  console.log(fs.readFileSync("./Develop/db/db.json", "utf8")); 
                } 
              }); 
        })
})

//then export it
module.exports = router


