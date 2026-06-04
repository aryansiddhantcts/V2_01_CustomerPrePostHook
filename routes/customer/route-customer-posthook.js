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

//router.get('/', checkScope, async (req, res) => { --> checkscope for role level authorization
//1. Get customer post-hook logic
const getcustomer = require('../../code/customer/posthook/customer-posthook-get');
router.get('/', async (req, res) => {
  await getcustomer(req, res);
});

//2. Post customer post-hook logic
const postcustomer = require('../../code/customer/posthook/customer-posthook-post');
router.post('/', async (req, res) => {
  await postcustomer(req, res);
});


router.put('/', (req, res) => {
  res.json({ message: 'Customer post-hook PUT' });
});

router.delete('/', (req, res) => {
  res.json({ message: 'Customer post-hook DELETE' });
});

module.exports = router;