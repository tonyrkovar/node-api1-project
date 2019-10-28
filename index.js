const express = require('express')

const cors = require('cors')

const server = express();

server.use(express.json())
server.use(cors())

const db = require('./data/db')


server.post('/api/users', (req, res) => {
    const user = req.body;
    console.log(user)
    if (user.name && user.bio) {
        db.insert(user)
            .then(user => res.status(201).json(user))
            .catch(err => {
                console.log(err)
                res.status(500).json({ errorMessage: "There was an error while saving the user to the bd" })
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    res.json(user)
})

server.get('/api/users', (req, res) => {
    db.find()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The user information could not be retrieved." })
        })

})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then(user => {
            if (user) {
                res.status(200).json({ message: `user ${id} was deleted successfully.` })
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch((error) => {
            res.status(500).json({ errorMessage: `could not delete user ${id}` })
        })
})

server.put('/api/users/:id', (req, res) => {
    const data = req.body;
    const id = req.params.id;
    if (data.name && data.bio) {
        db.update(id, data)
            .then(update => {
                if (update) {
                    res.status(200).json({ message: "User information has been updated." })
                } else {
                    res.status(404).json({ message: "The user with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res.status(400).json({ errorMessage: 'There was an error' })
            })
    } else {
        res.status(400).json({ errorMessage: 'Pease Provide name and bio for the user' })
    }
})


const port = 5000;

server.listen(port, () => console.log('running'))