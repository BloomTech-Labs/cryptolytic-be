const router = require("express").Router();
const Users = require("../users/user-model");
const isAuthenticated = require("./authenticate-middleware");

router.post("/register", isAuthenticated, (req, res) => {
  const user = req.user;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", isAuthenticated, (req, res) => {
  const { uid } = req.user;
  console.log(uid);
  Users.findByUid(uid)
    .first()
    .then(user => {
      if (user) {
        const { email, displayname, firstname, lastname } = user;
        res.status(200).json({ email, displayname, firstname, lastname });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// router.get("/logout", (req, res) => {
//   if (req.session) {
//     req.session.destroy(error => {
//       if (error) {
//         res
//           .status(500)
//           .json({
//             message:
//               "you can check out any time you like, but you can never leave..."
//           });
//       } else {
//         res.status(200).json({ message: "logged out successfully" });
//       }
//     });
//   } else {
//     res.status(200).json({ message: "sorry to see you go" });
//   }
// });

module.exports = router;
