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

export const getUpdatePointById = async (req, res) => {
  const updatePoint = await prisma.updatePoints.findUnique({
    where: { id: req.params.id },
  });

  res.json({ data: updatePoint });
};

export const createUpdatePoint = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: { id: req.body.updateId },
  });
  if (!update) {
    return res.json({ message: "nope" });
  }

  const updatePoint = await prisma.updatePoints.create({
    data: {
      name: req.body.name,
      description: req.body.description,

      update: { connect: { id: update.id } },
    },
  });

  res.json({ data: updatePoint });
};

export const updateUpdatePoint = async (req, res) => {
  const updatePoints = await prisma.updatePoints.findUnique({
    where: { id: req.params.id },
  });

  if (!updatePoints) {
    res.json({ message: "no update point exist" });
  }

  const updatedUpdatePoint = await prisma.updatePoints.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json({ data: updatedUpdatePoint });
};

export const deleteUpdatePoint = async (req, res) => {
  const updatePoints = await prisma.updatePoints.findUnique({
    where: { id: req.params.id },
  });

  if (!updatePoints) {
    res.json({ message: "no update point exist" });
  }

  const deleted = await prisma.updatePoints.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: deleted });
};
