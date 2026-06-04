const express = require('express');
const router = express.Router();

//1. Get case pre-hook logic
const getcase = require('../../code/case/prehook/case-prehook-get');
router.get('/', async (req, res) => {
  await getcase(req, res);
});

//2. Post case pre-hook logic
const postcase = require('../../code/case/prehook/case-prehook-post');
router.post('/', async (req, res) => {
  await postcase(req, res);
});


router.put('/', (req, res) => {
  res.json({ message: 'Case pre-hook PUT' });
});

router.delete('/', (req, res) => {
  res.json({ message: 'Case pre-hook DELETE' });
});

module.exports = router;