const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const router = require('express').Router();
const Users = require('../users/user-model');
const { validateUser } = require("../Users/users-helpers");

router.post('/register', (req, res) => {
  let user = req.body;
  const validateResult = validateUser(user);

  
  if (validateResult.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    Users.add(user)
      .then(saved => {
        
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
    } else {
      res.status(400).json({
        message: "Invalid information about the user, see errors for details",
        errors: validateResult.errors
      });
    }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwtToken(user.username);
        res.status(200).json({ message: `Welcome ${user.username}!and this token:`, token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function getJwtToken(username) {
  const payload = {
    username,
    role: "student" 
  };

  const secret = process.env.JWT_SECRET || "is it secret?";

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res
          .status(500)
          .json({
            message:
              "you can check out any time you like, but you can never leave..."
          });
      } else {
        res.status(200).json({ message: "logged out successfully" });
      }
    });
  } else {
    res.status(200).json({ message: "sorry to see you go" });
  }
});

module.exports = router;
