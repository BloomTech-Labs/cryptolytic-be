const admin = require("firebase-admin");

module.exports = (req, res, next) => {
 
  const idToken = req.headers.authorization;

  console.log(">>>>>>>>idtoken", idToken);

  admin.auth().verifyIdToken(idToken)
  .then(decodedToken => {
    const { uid, email } = decodedToken;
    console.log(">>>>>uidEmail", uid, email)
    req.user = { uid, email };
    next();
  })
  .catch(err => {
    res.status(401).json(err)
  })

};
