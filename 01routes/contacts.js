const express = require('express');
// const { auth } = require('../00middleweres/jwtStrategy');

const {
  get,
  getById,
  postNew,
  putEditCont,
  patchFav,
  deleteCont,
} = require('../controlers/contacts');

const router = express.Router();

router.get('/', get);

router.get('/:contactId', getById);

router.post('/', postNew);

router.delete('/:contactId', deleteCont);

router.put('/:contactId', putEditCont);

router.patch('/:contactId/favorite', patchFav);

module.exports = router;
