import { useState, useEffect } from 'react'
import io from 'socket.io-client'

import './Chat.css'

let socket

const Chat = ({ match }) => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const socketHost = process.env.REACT_APP_SOCKET_HOST

    useEffect(() => {
        const { name, room } = match.params

        socket = io(socketHost)

        setName(name)
        setRoom(room)

        console.log(socket)
    }, [socketHost])

    console.log(name, room)

    return (
        <h1>
            Chat
        </h1>
    )
}

export default Chat