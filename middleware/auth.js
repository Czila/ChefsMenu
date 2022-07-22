// Import
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// Import Model
const Restaurateur = require("../db/models/Restaurateur");

// Fonction de lecture du token de connexion
function readToken(req) {
  let authorization = req.headers.authorization;
  if (!authorization) return null;
  let splitted = authorization.split(" ");
  let token = splitted[1];
  if (token) return token.replace(/"/g, '');
  else return null;
}

//  Liste du middleware et de ses fonctions
const Auth = {
  isUser(req, res, next) {
    let token = readToken(req, res);
    if (token === null)
      return res
        .status(401)
        .send({ success: false, message: "Vous n'avez pas d'autorisation" });

    jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
 
      if (error)
      {
        return res
          .status(403)
          .send({ success: false, message: "Erreur sur le token" });
        }
      let _id = decodedToken.userId;

      Restaurateur.findOne({ _id: _id }).then((responseWithDataUserInsinde) => {
        if (responseWithDataUserInsinde === null)
          return res
            .status(404)
            .send({ success: false, message: "Pas de restaurateur associé" });
        req.user = responseWithDataUserInsinde;
        req.token = decodedToken._id;
        next();
      });
    });
  },
};

module.exports = Auth;