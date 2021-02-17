const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const router = require('./router')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.use(router)

io.on('connect', (socket) => {
    console.log('We have a new connection!!!')

    io.on('disconnect', () => {
        console.log('User had left!!!')
    })
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))