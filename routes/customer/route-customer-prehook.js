const express = require('express');
const router = express.Router();

function checkScope(req, res, next) {
  if (!req.authInfo.checkScope('$XSAPPNAME.customerhook')) {
    return res.status(403).json({ 
      error: 'Forbidden',
      message: 'Missing required scope: customerhook' 
    });
  }
  next();
}


//1. Get customer pre-hook logic
const getcustomer = require('../../code/customer/prehook/customer-prehook-get');
router.get('/', async (req, res) => {
  await getcustomer(req, res);
});

//2. Post customer pre-hook logic
const postcustomer = require('../../code/customer/prehook/customer-prehook-post');
router.post('/', async (req, res) => {
  await postcustomer(req, res);
});

router.put('/', (req, res) => {
  res.json({ message: 'Customer pre-hook PUT' });
});

router.delete('/', (req, res) => {
  res.json({ message: 'Customer pre-hook DELETE' });
});

module.exports = router;