const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const router = require('./router')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

io.on('connect', (socket) => {
    console.log('We have a new connection!!!')

    io.on('disconnect', () => {
        console.log('User had left!!!')
    })
})

app.use(router)

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))