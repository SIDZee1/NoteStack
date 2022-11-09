const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const jwtSecret = 'plotterjotter:plotyourthoughts';
const fetchuser = require("../middleware/fetchuser");

// Route 1 : 'api/auth/createuser'
router.post(
  "/createuser",
  [
    body("name", "Enter A valid name and must 3 characters!").isLength({
      min: 3,
    }),
    body("email", "Enter a valid e-mail!").isEmail(),
    body("password", "Password must contains 5 characters!").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    let success = false;
    // If errors: return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Find the required email in DB, if found return error 404 with message.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry, this email is already registered." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //  If it is new email make a entry of new user.
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: { id: user.id },
      };
      const authToken = jwt.sign(data, jwtSecret);

      // return the details
      success =true;
      res.json({success,  authToken });
    } catch (error) {
      // In any case any error come up then catch will return the error.
      console.error(error.message);
      res.status(500).send("Internal Server Error! Please try again.");
    }
  }
);

// Route 2:  api/auth/login
router.post(
  "/login",
  [
    body("email", "Enter a valid e-mail!").isEmail(),
    body("password", "Password cannot be blank!").exists(),
  ],
  
  async (req, res) => {
    let success = false
    // If errors: return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success, errors: "Please try to login with correct credentials." });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({success, errors: "Please try to login with correct credentials." });
      }
      const data = {
        user: { id: user.id },
      };
      const authToken = jwt.sign(data, jwtSecret);
      success = true
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error! Please try again.");
    }
  }
);

// Route 3 - Get user data by using POST request : api/auth/getuser

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error! Please try again.");
  }
});

module.exports = router;
