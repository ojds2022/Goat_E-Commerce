const router = require('express').Router();
const { Items } = require('../models');
const { User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/',  async (req, res) => {
  try {
    const itemData = await Items.findAll({
      order: [['name', 'ASC']],
    });
    const Item = itemData.map((project) => project.get({ plain: true }));
    console.log(Item);
    res.render('homepage', {
      Item
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
