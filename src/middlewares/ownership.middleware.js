const prisma = require('../prisma/client');

module.exports = async (req, res, next) => {
  const productId = parseInt(req.params.id, 10);

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return res.status(404).json({ message: 'Produit introuvable' });
  }

  if (product.userId !== req.user.id) {
    return res.status(403).json({ message: 'Accès interdit à ce produit' });
  }

  req.product = product;
  next();
};
