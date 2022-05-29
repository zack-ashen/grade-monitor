import express from 'express';

const router = express.Router()

router.get('/:id', (req, res) => {
  res.send("get user");
})

export default router;