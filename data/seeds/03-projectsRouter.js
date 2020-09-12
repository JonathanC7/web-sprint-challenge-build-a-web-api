const express = require('express');

const Projects = require('../helpers/projectModel.js');
const Actions = require('../helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({error: "There was an error retrieving projects data."})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Projects.get(id)
        .then(project => {
            if(project === null){
                res.status(404).json({message: "The project with the given ID does not exist."})
            } else {
                res.status(200).json(project);
            }
        })
        .catch(err => {
            res.status(500).json({error: "There was an issue retrieving the project."})
        })
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;

    Projects.getProjectActions(id)
        .then(projectActions => {
            if(projectActions.length === 0){
                res.status(404).json({message: "The project actions with the specified ID does not exist or is empty."});
            } else {
                res.status(200).json(projectActions);
            }
        })
        .catch(err => {
            res.status(500).json({error: "There was an issue retrieving project actions."});
        })
})

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(created => {
            res.status(200).json(created);
        })
        .catch(err => {
            res.status(500).json({error: "There was an issue attempting to add project."});
        })
})

router.post('/:id/actions', (req, res) => {
    Actions.insert(req.body)
        .then(created => {
            res.status(200).json(created);
        })
        .catch(err => {
            res.status(500).json({error: "There was an issue adding actions.(Check that the specifed ID and project_id match an existing project ID.)"})
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;

    Projects.update(id, req.body)
        .then(updated => {
            if(updated === null){
                res.status(404).json({message: "The project with the specified ID does no exist."});
            } else {
                res.status(202).json(updated);
            }
        })
        .catch(err => {
            res.status(500).json({error: "There was an issue when attempting to update project."})
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Projects.get(id)
        .then(project => {
            if(project === null){
                res.status(404).json({message: "The project with the given ID does not exist."})
            } else {
                res.status(200).json(project);
                    Projects.remove(id)
                        .then(response => {})
                        .catch(err => {
                            res.status(500).json({error: "There was an issue deleting the project."})
                        })
                    }
                })
        .catch(err => {
                res.status(500).json({error: "There was an issue retrieving the project."})
            })
})

module.exports = router;