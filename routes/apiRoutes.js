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
      let newNote = req.body;
      let stringedData = JSON.parse(data)
      newNote.id = Math.floor((Math.random() * 10000) + 1);
      stringedData.push(newNote);
      res.json(newNote);
      console.log(newNote)

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

// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
router.delete("/notes/:id", function (req, res) {
  const filterId = req.params.id;
  console.log(`Poo:${filterId}`)
  readFileasync("./Develop/db/db.json", "utf8").then(
    function (data) {
      console.log(`Data:${data}`)
      let dataArray = JSON.parse(data)
      console.log(`DataArray:${dataArray}`)
      const updatedNotes = dataArray.filter(note => note.id !== filterId)
    ;
      fs.writeFile("./Develop/db/db.json", JSON.stringify(updatedNotes), (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
        }
      }
      )
    })
});
module.exports = router