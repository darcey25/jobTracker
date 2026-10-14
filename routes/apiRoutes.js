const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();
const db = require('../models');
const mustBeLoggedIn = require('../shared/middleware/mustBeLoggedIn');

// Fields clients may change. Anything else in a request body (password,
// userId, _id, ...) is ignored.
const USER_FIELDS = ['primaryColor', 'accentColor', 'homeSet', 'position'];
const JOB_FIELDS = ['companyName', 'jobTitle', 'stage', 'cardColor', 'titleColor',
  'info', 'dateInfo', 'notes', 'contacts', 'position'];

function pick(source, fields) {
  const result = {};
  fields.forEach(field => {
    if (source && source[field] !== undefined) result[field] = source[field];
  });
  return result;
}

function getCurrentUser(req, res) {
  // I'm picking only the specific fields its OK for the audience to see publicly
  // never send the whole user object in the response, and only show things it's OK
  // for others to read (like ID, name, email address, etc.)
  const { id, username, primaryColor, accentColor, homeSet, position } = req.user;
  res.json({
    id, username, primaryColor, accentColor, homeSet, position
  });
}

// Only allow a logged-in user to act on their own account.
function mustBeSelf(param) {
  return (req, res, next) => {
    if (req.params[param] !== String(req.user._id)) {
      return res.status(403).json({ message: 'You can only access your own data.' });
    }
    next();
  };
}

// Load a job by :id and make sure it belongs to the logged-in user.
async function loadOwnJob(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: 'Job not found.' });
  }
  const job = await db.NewJob.findById(req.params.id);
  if (!job || job.userId !== String(req.user._id)) {
    return res.status(404).json({ message: 'Job not found.' });
  }
  req.job = job;
  next();
}

router.route('/auth')
  // GET to /api/auth will return current logged in user info
  .get((req, res) => {
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
  .delete((req, res, next) => {
    req.logout(err => {
      if (err) return next(err);
      req.session.destroy(() => {
        res.json({
          message: 'You have been logged out.'
        });
      });
    });
  });

router.route('/users')
  // POST to /api/users will create a new user
  .post(async (req, res, next) => {
    const { username, password } = req.body || {};
    if (typeof username !== 'string' || !username.trim() || typeof password !== 'string' || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
    try {
      const user = await db.User.create({ username: username.trim(), password });
      res.json({ id: user.id, username: user.username });
    } catch (err) {
      // if this error code is thrown, that means the username already exists.
      if (err.code === 11000) {
        return res.status(400).json({
          message: 'Username already in use.'
        });
      }
      // otherwise, it's some nasty unexpected error, so we'll just send it off to
      // to the next middleware to handle the error.
      next(err);
    }
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
  .all(mustBeLoggedIn(), mustBeSelf('id'))
  .get(async (req, res) => {
    const user = await db.User.findById(req.params.id).select('-password');
    res.json(user);
  })
  .patch(async (req, res) => {
    await db.User.updateOne({ _id: req.params.id }, { $set: pick(req.body, USER_FIELDS) }, { runValidators: true });
    res.json();
  });

router.route('/newjob')
  .all(mustBeLoggedIn())
  .post(async (req, res) => {
    try {
      const job = await db.NewJob.create({ ...pick(req.body, JOB_FIELDS), userId: String(req.user._id) });
      res.json(job);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  })
  // Only the current user's jobs
  .get(async (req, res) => {
    res.json(await db.NewJob.find({ userId: String(req.user._id) }));
  });

router.get('/job/:userId', mustBeLoggedIn(), mustBeSelf('userId'), async (req, res) => {
  res.json(await db.NewJob.find({ userId: req.params.userId }));
});

router.route('/newjob/:id')
  .all(mustBeLoggedIn(), loadOwnJob)
  .get((req, res) => {
    res.json(req.job);
  })
  .patch(async (req, res) => {
    try {
      req.job.set(pick(req.body, JOB_FIELDS));
      await req.job.save();
      res.json();
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    await req.job.deleteOne();
    res.json(req.job);
  });

router.get('/locations', mustBeLoggedIn(), async (req, res) => {
  res.json(await db.NewJob.find({ userId: String(req.user._id) }));
});

router.get('/locations/:userId', mustBeLoggedIn(), mustBeSelf('userId'), async (req, res) => {
  res.json(await db.NewJob.find({ userId: req.params.userId }));
});

module.exports = router;
