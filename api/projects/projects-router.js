const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();

const { validateId, validateProject, validateUpdatedProject } = require('./projects-middleware');

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
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', validateId, validateUpdatedProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(200).json(
                {
                    name: updatedProject.name,
                    description: updatedProject.description,
                    completed: updatedProject.completed
                })
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