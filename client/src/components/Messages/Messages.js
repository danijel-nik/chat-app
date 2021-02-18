import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './Message/Message'
import "./Messages.css"

const Messages = ({ messages, name }) => {
    return (
        <ScrollToBottom className="messages">
            {messages.map((message, index) => (
                <Message key={index} message={message} name={name} />
            ))}
        </ScrollToBottom>
    )
}

export default Messages