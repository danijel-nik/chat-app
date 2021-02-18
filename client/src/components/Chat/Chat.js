import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

import './Chat.css'

let socket

const Chat = ({ match }) => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState([])

    const socketHost = process.env.REACT_APP_SOCKET_HOST

    useEffect(() => {
        const { name, room } = match.params

        socket = io(socketHost)

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, () => {
            
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [socketHost, match.params])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users)
        })
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input 
                    message={message} 
                    setMessage={setMessage}
                    sendMessage={sendMessage} 
                />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat