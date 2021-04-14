const status = {
  OK: 200,
  SUCCESS_CREATE: 201,
  NOT_FOUND: 404,
  GENERAL: 400
};

export const getOne = model => async (req, res) => {
  const id = req.params.id;
  const userId = (req.user || {})._id;

  const item = await model
    .findOne({
      _id: id,
      createdBy: userId
    })
    .exec();

  if (!item) {
    return res.status(status.NOT_FOUND).end();
  }

  return res.status(200).json({ data: item });
};

export const getMany = model => async (req, res) => {
  try {
    const userId = (req.user || {})._id;
    const items = await model
      .find({
        createdBy: userId
      })
      .exec();
    if (!items) {
      return res.status(status.NOT_FOUND).end();
    }
    return res.status(status.OK).json({ data: items });
  } catch (ex) {
    return res.status(status.GENERAL).send({ error: ex.message });
  }
};

export const createOne = model => async (req, res) => {
  const newItem = await model.create({
    ...req.body,
    createdBy: (req.user || {})._id
  });

  return res.status(status.SUCCESS_CREATE).json({ data: newItem });
};

export const updateOne = model => async (req, res) => {
  try {
    const newItem = await model
      .findOneAndUpdate(
        { _id: req.params.id, createdBy: (req.user || {})._id },
        {
          ...req.body,
          _id: req.params.id,
          createdBy: (req.user || {})._id
        },
        { new: true }
      )
      .exec();

    if (!newItem) {
      return res.status(status.GENERAL).end();
    }
    return res.status(status.OK).json({ data: newItem });
  } catch (ex) {
    return res.status(status.GENERAL).end();
  }
};

export const removeOne = model => async (req, res) => {
  try {
    const deletedItem = await model
      .findOneAndRemove({
        _id: req.params.id,
        createdBy: (req.user || {})._id
      })
      .exec();

    console.log(deletedItem);
    if (!deletedItem) {
      return res.status(status.GENERAL).end();
    }
    return res.status(status.OK).json({ data: deletedItem });
  } catch (ex) {
    return res.status(status.GENERAL).end();
  }
};

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
});
