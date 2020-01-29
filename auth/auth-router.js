const router = require('express').Router();
const Users = require('../users/user-model')
const isAuthenticated = require('../auth/authenticate-middleware')

router.post('/register', isAuthenticated, (req, res) => {
  let user = req.user;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });   
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
