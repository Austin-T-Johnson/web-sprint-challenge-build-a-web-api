const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();

router.get('/', (req,res,next) => {
    Projects.get()
        .then(projects => {
           res.json(projects)
        })
        .catch(next)
})



router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'Uh oh, seems like there was an error!',
        message: err.message
    })
})

module.exports = router