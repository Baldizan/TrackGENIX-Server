import express from 'express';

const router = express.Router();
router
  .get('/')
  .get('/:id')
  .post('/')
  .delete('/:id')
  .put('/:id');

export default router;
