const {getWatch, addWatch, deleteWatch} = require('../controllers/watchlistControllers');
const express = require('express');
const router = express.Router();

router.get('/',getWatch);
router.post('/',addWatch);
router.delete('/:id',deleteWatch);

module.exports = router;