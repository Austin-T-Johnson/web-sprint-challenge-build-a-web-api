// add middlewares here related to projects
const Projects = require(('./projects-model'));

async function validateId(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        if (!project) {
            res.status(404).json({ message: "project not found" })
        } else {
            req.project = project
            next()
        }
    } catch (error) {
        res.status(500).json({ message: "problem finding project" })
    }
}

async function validateId2(req, res, next) {
    try {
        const project = await Projects.get(req.params.id)
        console.log("this is the console log:", project)
        if (project == null )  {
            res.status(404).json({ message: "project not found" })
        }
        else {
            
            req.project = project.actions;
            
            next()
        }
    } catch (error) {
        res.status(500).json({ message: "problem finding project" })
    }
}



function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    if (name == null || description == null || completed == null ) {
        res.status(400).json({ message: "missing required name" })
    }  else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = true
        next()
    }
}










module.exports = {
    validateId,
    validateProject,
    validateId2

}
