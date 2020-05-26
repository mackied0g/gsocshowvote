const express = require('express')
    const app = express()
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const Pusher = require('pusher')

    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    const port = process.env.PORT || 8080

    const pusher = new Pusher({
    app_id = "1007918",
    key = "a405c5b0b68fab561b42",
    secret = "d72fdb57ae082a3def2f",
    cluster = "mt1",
      encrypted: true
    })

    let dogs = 0
    let cats = 0
    let hamsters = 0

    const getPercentage = value => (value * 100) / (dogs + cats + hamsters)
    
    app.post('/vote', function (req, res) {
        const {vote} = req.body
        if (vote === 'dogs') {
          dogs++
        }
        if (vote === 'cats') {
          cats++
        }
        if (vote === 'hamsters') {
          hamsters++
        }
        pusher.trigger('pet-wars', 'new-votes', [getPercentage(dogs), getPercentage(cats), getPercentage(hamsters)])
        res.sendStatus(200)
      })

    app.listen(port, function () {
      console.log('Node app is running at localhost:' + port)
    })