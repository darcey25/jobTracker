const express = require('express');
const passport = require('passport');
const router = express.Router();
const db = require('../models');
// const jobController = require("../controller/jobController");
const mustBeLoggedIn = require('../shared/middleware/mustBeLoggedIn');

function getCurrentUser(req, res) {
  // I'm picking only the specific fields its OK for the audience to see publicly
  // never send the whole user object in the response, and only show things it's OK
  // for others to read (like ID, name, email address, etc.)
  const { id, username, primaryColor, accentColor, homeSet, position } = req.user;
  res.json({
    id, username, primaryColor, accentColor, homeSet, position
  });
}

router.route('/auth')
  // GET to /api/auth will return current logged in user info
  .get((req, res) => {
    console.log(req.body)
    if (!req.user) {
      return res.status(401).json({
        message: 'You are not currently logged in.'
      })
    }

    getCurrentUser(req, res);
  })
  // POST to /api/auth with username and password will authenticate the user
  .post(passport.authenticate('local'), (req, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Invalid username or password.'
      })
    }

    getCurrentUser(req, res);
  })
  // DELETE to /api/auth will log the user out
  .delete((req, res) => {
    req.logout();
    req.session.destroy();
    res.json({
      message: 'You have been logged out.'
    });
  });

router.route('/users')
  // POST to /api/users will create a new user
  .post((req, res, next) => {
    db.User.create(req.body)
      .then(user => {
        const { id, username } = user;
        res.json({
          id, username
        });
      })
      .catch(err => {
        // if this error code is thrown, that means the username already exists.
        // let's handle that nicely by redirecting them back to the create screen
        // with that flash message
        if (err.code === 11000) {
          res.status(400).json({
            message: 'Username already in use.'
          })
        }

        // otherwise, it's some nasty unexpected error, so we'll just send it off to
        // to the next middleware to handle the error.
        next(err);
      });
  });

// this route is just returns an array of strings if the user is logged in
// to demonstrate that we can ensure a user must be logged in to use a route
router.route('/stuff')
  .get(mustBeLoggedIn(), (req, res) => {
    // at this point we can assume the user is logged in. if not, the mustBeLoggedIn middleware would have caught it
    res.json([
    ]);
  });

router.route('/user/:id')
  .get((req, res)=>{
    console.log(req.body)
    db.User.findOne({ _id: req.params.id }, function (err, data) {
    res.json(data);
  })
    .catch(err=> res.status(422).json(err));
  });

router.route('/user/:id')
  .patch((req, res)=>{
    console.log(req.body)
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, data) {
    res.json();
  })
    .catch(err=> res.status(422).json(err));
  });

router.route('/newjob')
  .post((req, res) =>{
    db.NewJob.create(req.body)
    .then(dbNewJob =>{
      res.json(dbNewJob);
    })
    .catch(err => res.status(422).json(err));
  });

  router.route('/newjob')
  .get((req, res)=>{
    db.NewJob.find()
    .then(dbNewJob=>{
      res.json(dbNewJob);
    })
    .catch(err=> res.status(422).json(err));
        // console.log(res);

  });

  router.route('/job/:userId')
  .get((req, res)=>{
    db.NewJob.find({ userId: req.params.userId })
    .then(dbNewJob=>{
      res.json(dbNewJob);
    })
    .catch(err=> res.status(422).json(err));
        // console.log(res);

  });

  router.route('/newjob/:id')

  .delete((req, res)=>{
    console.log("test");
    db.NewJob.findById({ _id: req.params.id })
    .then(dbNewJob => dbNewJob.remove())
    .then(dbNewJob=> res.json(dbNewJob))
    .catch(err=> res.status(422).json(err));
  });

router.route('/newjob/:id')
  .patch((req, res)=>{
    console.log(req.body)
    db.NewJob.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, data) {
    res.json();
  })
    // .catch(err=> res.status(422).json(err));
  });


  router.route('/newjob/:id')
    .get((req, res)=>{
      db.NewJob.findOne({ _id: req.params.id }, req.body, function (err, data) {
        console.log(data);
      res.json(data);
    })
      // .catch(err=> res.status(422).json(err));
    });

// router.route('/newjob')
//   .post(jobController.create);
//

router.route('/locations')
.get((req, res)=>{
  db.NewJob.find()
  .then(dbNewJob=>{
    res.json(dbNewJob);
  })
  .catch(err=> res.status(422).json(err));
      // console.log(res);

});

router.route('/locations/:userId')
.get((req, res)=>{
  db.NewJob.find({ userId: req.params.userId })
  .then(dbNewJob=>{
    res.json(dbNewJob);
  })
  .catch(err=> res.status(422).json(err));
      // console.log(res);

});

module.exports = router;
