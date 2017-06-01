const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const { graphQLHandler } = require('./graphql')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

nextApp.prepare()
.then(() => {
    const server = express()

    server.get('/test', (req, res) => {
        res.send('Yep')
    })

    server.use('/graphql', bodyParser.json(), graphQLHandler)

    server.get('*', (req, res) => {
        nextHandler(req, res)
    })

    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})
