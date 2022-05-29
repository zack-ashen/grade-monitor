

const express = require('express')
const router = express.Router()


router.post('/new', (req, res) => {


})


router.post('/update', (req, res) => {

})


router.route('/:id') 
    .get((req, res) => {
        res.send("Get course: " + req.params.id)
    })
    .delete((req, res) => {
        res.send("Delete course: " + req.params.id)
    })
    .put((req, res) => {
        res.send("Get course: " + req.params.id)
    })



export default router;