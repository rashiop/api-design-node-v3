export const getOne = model => async (req, res) => {
  res.send({ message: 'a' });
};

export const getMany = model => async (req, res) => {
  res.send({ message: 'a' });
};

export const createOne = model => async (req, res) => {
  res.send({ message: 'a' });
};

export const updateOne = model => async (req, res) => {
  res.send({ message: 'a' });
};

export const removeOne = model => async (req, res) => {
  res.send({ message: 'a' });
};

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
});
