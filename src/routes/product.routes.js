const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const ownershipMiddleware = require('../middlewares/ownership.middleware');
const validateProduct = require('../middlewares/validateProduct.middleware');

router.use(authMiddleware);

router.get('/', productController.list);
router.post('/', validateProduct, productController.create);
router.put(
  '/:id',
  ownershipMiddleware,
  validateProduct,
  productController.update
);
router.delete('/:id', ownershipMiddleware, productController.remove);

module.exports = router;
