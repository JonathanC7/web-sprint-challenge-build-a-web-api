const express = require('express');

const Actions = require('../helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            if(actions.length === 0){
                res.status(500).json({message: "There was an issue retrieving actions."});
            } else {
                res.status(200).json(actions);
            }
        })
        .catch(err => {
            res.status(500).json({error: "There was an issue retrieving actions."})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Actions.get(id)
        .then(action => {
            if(action === null){
                res.status(404).json({message: "The actions with the specified ID don't exist."});
            } else {
                res.status(200).json(action)
            }
        })
        .catch(err => {
            res.status(500).json({error: "There was an issue retrieving actions."})
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params; 

    Actions.update(id, req.body)
        .then(updated => {
            if(updated === null){
                res.status(404).json({message: "The project with the specified ID does no exist."});
            } else {
                res.status(202).json(updated);
            }
        })
        .catch(err => {
            res.status(500).json({error: "There was an issue updating action."})
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Actions.get(id)
        .then(action => {
            if(action === null){
                res.status(404).json({message: "There's no actions with the specified ID."});
            } else {
                res.status(200).json(action)
                Actions.remove(id)
                    .then(removed => {})
                    .catch(err => {
                        res.status(500).json({error: "There was an issue removing actions"})
                    })
            }
        })
        .catch(err => {
            res.status(500).json({error: "There was an issue retrieving actions."})
        })
})

module.exports = router;