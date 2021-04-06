import { Router } from 'express';

const controller = (_req, res) => {
  res.send({ message: 'hello' });
};

const router = Router();

router
  .route('/')
  .get(controller)
  .post(controller);

router
  .route('/:id')
  .get(controller)
  .delete(controller)
  .put(controller);

export default router;
