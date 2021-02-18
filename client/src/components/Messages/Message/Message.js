import ReactEmoji from 'react-emoji'

import "./Message.css"

const Message = ({ message, name }) => {
    let isSentByCurrentUser = false
    const trimedName = name.trim().toLowerCase()

    const {user, text} = message

    if (user === trimedName) {
        isSentByCurrentUser = true
    }

    return (
        isSentByCurrentUser ? (
            <div className="messageContainer justifyEnd">
                <p className="sentText">{trimedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ) : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="sentText">{user}</p>
            </div>
        )
    )
}

export default Message
