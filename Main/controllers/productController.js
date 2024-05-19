const express = require('express');
const router = express.Router();

router.post('/updateCustomerId', (req, res) => {
  const { customerId } = req.body;
  global.customerId = customerId;
  res.json({ success: true, message: `Global customerId set to ${global.customerId}`, customerId: global.customerId });
});

router.get('/getCustomerId', (req, res) => {
  res.json({ customerId: global.customerId });
});

module.exports = router;
