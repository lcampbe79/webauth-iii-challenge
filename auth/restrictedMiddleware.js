const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

  const token = req.headers.authorization

  if (token) {
    const secret = process.env.JWT_SECRET || "secrets are fun"

    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        req.decodedToken = decodedToken  
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'No credentials provided' });
   }
};
