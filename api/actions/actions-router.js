const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();
const { validateId, validateAction } = require('./actions-middlware');

router.get('/', (req, res, next) => {
    Actions.get().then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get('/:id', validateId, (req, res, next) => {
    res.json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
    })

    router.put('/:id', validateId, validateAction, (req, res, next) => {
       Actions.update(req.params.id, req.body)
            .then(updatedActions => {
                res.status(200).json(
                    {
                        project_id: updatedActions.project_id,
                        description: updatedActions.description,
                        notes: updatedActions.notes,
                        completed: updatedActions.completed,
                        id: updatedActions.id
                    })
            })
    
            .catch(next)
    })
    


router.delete('/:id', validateId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.json(req.action)
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

module.exports = router;