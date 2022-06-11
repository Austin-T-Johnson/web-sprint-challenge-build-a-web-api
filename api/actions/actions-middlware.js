// add middlewares here related to actions
const Actions = require(('./actions-model'));

async function validateId(req, res, next) {
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
            res.status(404).json({ message: "action not found"})
        } else {
            req.action = action
            next()
        }
    } catch (error) {
        res.status(500).json({ message: "problem finding action"})
    }
}



function validateAction( req, res, next) {
    const { project_id, description, notes, completed } = req.body
    if(!project_id) {
        res.status(400).json({ message: "missing required project_id"})
    }
    if(!description || !description.trim()) {
        res.status(400).json({ message: "missing required description"})
    } 
    if(!notes || !notes.trim()) {
        res.status(400).json({ message: "missing required notes"})
    }
    if(completed !== true) {
        res.status(400).json({ message: "missing required completed field"})
    }  else {
        req.project_id = project_id
        req.description = description.trim()
        req.notes = notes.trim()
        req.completed = completed
        next()
    }
}




module.exports = {
    validateId,
    validateAction,
   
}

