const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();

const { validateId, validateProject } = require('./projects-middleware');

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
           res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateId, (req, res) => {
    res.json(req.project)
})


router.post('/', validateProject, (req, res, next) => {
    Projects.insert({ name: req.name, description: req.description, completed: req.completed})
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
    })

router.put('/:id', validateId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, { name: req.name, description: req.description, completed: req.completed})
        .then(() => {
            return Projects.get(req.params.id)
        })
        .then(project => {
            res.json(project)
        })
        .catch(next)
})


router.delete('/:id', validateId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.json(req.project)
    } catch (error) {
        next(error)
    }
})



router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'Uh oh, seems like there was an error!',
        message: err.message
    })
})

module.exports = router