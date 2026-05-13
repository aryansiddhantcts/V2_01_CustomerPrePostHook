const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Customer Post Hook app is running and up');
});

router.post('/', (req, res) => {
  const body = req.body;
  const zcurrentImage = body?.currentImage;
  const identifications = zcurrentImage?.identifications || [];

  // customer post-hook logic here

  res.json(body);
});

router.put('/', (req, res) => {
  res.json({ message: 'Customer post-hook PUT' });
});

router.delete('/', (req, res) => {
  res.json({ message: 'Customer post-hook DELETE' });
});

module.exports = router;