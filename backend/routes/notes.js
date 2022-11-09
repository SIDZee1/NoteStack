const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1 : 'api/notes/fetchallnotes' - Get all notes using GET request
router.get(
    "/fetchallnotes",
    fetchuser,
    async (req, res) => {
        try {
            const notes = await Notes.find({ user: req.user.id });
            res.json(notes);
        }
        catch (error) {
            // In any case any error come up then catch will return the error.
            console.error(error.message);
            res.status(500).send("Internal Server Error! Please try again.");
        }
    }

);

// Route 2 : 'api/notes/addnote' - Add note using POST request
router.post("/addnote", fetchuser, [
    body("title", "Enter minimum 1 character Title! !").isLength({
        min: 1,
    }),
    body("description", "Enter minimum 5 character Description!").isLength({
        min: 1,
    }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If errors: return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //  Adding the ttile, description, tag and values.
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        // Saving Values
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        // In any case any error come up then catch will return the error.
        console.error(error.message);
        res.status(500).send("Internal Server Error! Please try again.");
    }
});

// Route 3 : 'api/notes/updatenote' - Update an existing note using PUT request
router.put("/updatenote/:id", fetchuser,  async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // create a new obejct
        const newNote= {};

        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //  finding note to update
        let note = await Notes.findById(req.params.id);

        //  If Notes Id not found then return bad request
        if(!note){return res.status(404).send("Not Found!")};

        // If Notes User Id not found return bad request
        if(note.user.toString() !== req.user.id){return res.status(404).send("Not Allowed!")}

        // Now, finally update the note
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json(note)
    } catch (error) {

        // In any case any error come up then catch will return the error.
        console.error(error.message);
        res.status(500).send("Internal Server Error! Please try again.");        
    }

});

// Route 4 : 'api/notes/deletenote/:id' - Delete an existing note using DELETE request
router.delete("/deletenote/:id", fetchuser,  async (req, res) => {
    try {
        // Finding note to delete
        let note = await Notes.findById(req.params.id);

        // If Notes Id not found then return bad request
        if(!note){return res.status(404).send("Not Found!")};

        // If Notes User Id not found return bad request
        if(note.user.toString() !== req.user.id){return res.status(404).send("Not Allowed!")}

        // Now, finally delete the note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"success":"Note has been deleted", note:note})
    } catch (error) {

        // In any case any error come up then catch will return the error.
        console.error(error.message);
        res.status(500).send("Internal Server Error! Please try again.");        
    }
});

module.exports = router;