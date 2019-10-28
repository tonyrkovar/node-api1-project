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
            console.log(error, 'There was an issue retreiving data')
        })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(users => {
            res.status(200).json(users)
        })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(() => res.status(200).json({ message: `user ${id} was deleted successfully.` }))
        .catch((error) => {
            res.status(500).json({ errorMessage: `could not delete user ${id}` })
        })
})


const port = 5000;

server.listen(port, () => console.log('running'))