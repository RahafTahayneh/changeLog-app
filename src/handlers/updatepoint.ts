import prisma from "../db";

// Get all update points
export const getUpdatePoints = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

export const getUpdatePointById = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: { id: req.params.id, belongsToId: req.user.id },
  });

  res.json({ data: product });
};

export const createUpdatePoint = async (req, res) => {
  const product = await prisma.product.create({
    data: { name: req.body.name, belongsToId: req.user.id },
  });

  res.json({ data: product });
};

export const updateUpdatePoint = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id_belongsToId: { id: req.params.id, belongsToId: req.user.id },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updated });
};

export const deleteUpdatePoint = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: { id: req.params.id, belongsToId: req.user.id },
    },
  });

  res.json({ data: deleted });
};
