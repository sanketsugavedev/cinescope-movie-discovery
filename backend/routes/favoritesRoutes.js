const {getFav, addFav, deleteFav} = require('../controllers/favoritesControllers');
const express = require('express');
const router = express.Router();

router.get('/',getFav);
router.post('/',addFav);
router.delete('/:id',deleteFav);

module.exports = router;