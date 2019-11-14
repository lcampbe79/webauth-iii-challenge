const router = require('express').Router();

const Users = require('./usersModel');
const restricted = require('../auth/restrictedMiddleware')

router.get('/', restricted, checkDepartment(['dog', 'CTO']),(req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => res.send(error))
})

module.exports = router;

function checkDepartment(departments) {
  return function(req, res, next) {
    if(departments.includes(req.decodedToken.department)) {
      next()
    } else {
      res.status(403).json({ message: 'Unable to enter due to invalid information' });
    }
  }
}