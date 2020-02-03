const admin = require("firebase-admin");

const serviceAccount = require("../cryptolytic-auth-firebase-adminsdk-ayd4n-acd0c1c45c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cryptolytic-auth.firebaseio.com"
});

module.exports = (req, res, next) => {
  console.log("middleware");
  const idToken = req.headers.authorization;
  console.log(">>>>>>>>idtoken", idToken);

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      const { uid, email } = decodedToken;
      console.log(">>>>>uidEmail", uid, email);
      req.user = { uid, email };
      next();
    })
    .catch(err => {
      res.status(401).json(err);
    });
};
