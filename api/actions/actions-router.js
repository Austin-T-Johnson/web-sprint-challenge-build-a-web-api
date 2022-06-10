const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get().then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})



router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        customMessage: 'Uh oh, seems like there was an error!',
        message: err.message
    })
})

module.exports = router;