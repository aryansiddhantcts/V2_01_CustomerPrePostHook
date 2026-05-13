const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Customer Pre Hook app is running and up');
});

router.post('/', (req, res) => {
  const body = req.body;
  const zcurrentImage = body?.currentImage;
  const identifications = zcurrentImage?.identifications || [];

  // customer pre-hook logic here

  res.json(body);
});

router.put('/', (req, res) => {
  res.json({ message: 'Customer pre-hook PUT' });
});

router.delete('/', (req, res) => {
  res.json({ message: 'Customer pre-hook DELETE' });
});

module.exports = router;