const prisma = require('../prisma/client');

function withLinks(product) {
  return {
    ...product,
    _links: {
      self: { href: `/products/${product.id}`, method: 'GET' },
      update: { href: `/products/${product.id}`, method: 'PUT' },
      delete: { href: `/products/${product.id}`, method: 'DELETE' },
    },
  };
}

exports.list = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { userId: req.user.id },
    });
    return res.status(200).json(products.map(withLinks));
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.create = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        quantity: parseInt(quantity, 10),
        userId: req.user.id,
      },
    });
    return res.status(201).json(withLinks(product));
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.update = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id: req.product.id },
      data: { name, quantity: parseInt(quantity, 10) },
    });
    return res.status(200).json(withLinks(product));
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Produit introuvable' });
    }
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.remove = async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.product.id } });
    return res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ message: 'Produit introuvable' });
    }
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};
