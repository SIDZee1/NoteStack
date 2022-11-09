const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
    try {
        
        // const errors = validationResult(req);
        
        // if (!errors.isEmpty()) {
        //     console.log("hello");
        //     return res.status(400).json({ errors: errors.array() });
        // }
        const { name, email, phone, message} = req.body;
        
        //  Adding the ttile, description, tag and values.
        const response = new Contact({
            name, email, phone, message
        })
        // Saving Values
        const saveResponse = await response.save()
        res.json(saveResponse);

    } catch (error) {
        // In any case any error come up then catch will return the error.
        console.error(error.message);
        res.status(500).send("Internal Server Error! Please try again.");
    }
});

module.exports = router;