import express from 'express';

const router = express.Router()

router.route('/:id') 
    .get((req, res) => {
        res.send("Get course: " + req.params.id)
    })
    .delete((req, res) => {
        res.send("Delete course: " + req.params.id)
    })
    .put((req, res) => {
        res.send("Put course: " + req.params.id)
    })
    .post((req, res) => {
        res.send("Post course");
    })

export default router;