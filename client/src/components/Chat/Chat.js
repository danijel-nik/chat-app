import { useState, useEffect } from 'react'
import io from 'socket.io-client'

import './Chat.css'

let socket

const Chat = ({ match }) => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

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
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(message, messages)

    return (
        <div className="outerContainer">
            <div className="container">
                <input 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(e) } />
            </div>
        </div>
    )
}

export default Chat