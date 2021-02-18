const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const dotenv = require('dotenv')
const cors = require('cors')
const router = require('./router')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: process.env.CLIENT_URI
    }
})

app.use(cors())
app.use(router)

io.on('connect', (socket) => {
    // console.log('We have a new connection!!!')
    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room)

        const { error, user } = addUser({ id: socket.id, name, room })

        if (error) {
            return callback(error)
        }

        // welcome message
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })

        // will send message to everyone in the room about new user
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })

        // joins user into room
        socket.join(user.room)

        callback()
    })

    // emit listener
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        
        io.to(user.room).emit('message', { user: user.name, text: message })
        
        callback()
    })

    socket.on('disconnect', () => {
        console.log('User had left!!!')
    })
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))