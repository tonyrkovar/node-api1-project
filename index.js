const express = require('express')

const cors = require('cors')

const server = express();

server.use(express.json())
server.use(cors())

const db = require('./data/db')


server.post('/api/users', (req, res) => {
    const data = req.body;
    res.json(data)
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

const port = 5000;

server.listen(port, () => console.log('running'))