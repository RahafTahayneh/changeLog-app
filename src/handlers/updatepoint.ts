import prisma from "../db";

// Get all update points
export const getAllUpdatePoints = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: { id: req.body.id },
    include: {
      updatePoints: true,
    },
  });

  res.json({ data: update.updatePoints });
};

// export const getProductById = async (req, res) => {
//   const product = await prisma.product.findFirst({
//     where: { id: req.params.id, belongsToId: req.user.id },
//   });

//   res.json({ data: product });
// };

// export const createProduct = async (req, res, next) => {
//   try {
//     const product = await prisma.product.create({
//       data: { name: req.body.name, belongsToId: req.user.id },
//     });

//     res.json({ data: product });
//   } catch (e) {
//     next(e);
//   }
// };

// export const updateProduct = async (req, res) => {
//   const updated = await prisma.product.update({
//     where: {
//       id_belongsToId: { id: req.params.id, belongsToId: req.user.id },
//     },
//     data: {
//       name: req.body.name,
//     },
//   });

//   res.json({ data: updated });
// };

// export const deleteProduct = async (req, res) => {
//   const deleted = await prisma.product.delete({
//     where: {
//       id_belongsToId: { id: req.params.id, belongsToId: req.user.id },
//     },
//   });

//   res.json({ data: deleted });
// };
