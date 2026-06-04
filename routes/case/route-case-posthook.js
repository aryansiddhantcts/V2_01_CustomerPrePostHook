const express = require('express');
const router = express.Router();

//1. Get case post-hook logic
const getcase = require('../../code/case/posthook/case-posthook-get');
router.get('/', async (req, res) => {
  await getcase(req, res);
});

//2. Post case post-hook logic
const postcase = require('../../code/case/posthook/case-posthook-post');
router.post('/', async (req, res) => {
  await postcase(req, res);
});

router.put('/', (req, res) => {
  res.json({ message: 'Case post-hook PUT' });
});

router.delete('/', (req, res) => {
  res.json({ message: 'Case post-hook DELETE' });
});

module.exports = router;