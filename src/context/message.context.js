import React, { createContext, useState } from 'react'

const MessageContext = createContext()

function MessageProviderWrapper(props) {

    const [show, setShow] = useState(true)
    const [messageInfo, setMessageInfo] = useState({
        title: '',
        description: ''
    })

    const showMessage = (title, description) => {
        setShow(true)
        setMessageInfo({ title, description })
    }

    return (
        <MessageContext.Provider value={{ show, setShow, messageInfo, showMessage }}>
            {props.children}
        </MessageContext.Provider>
    )
}

export { MessageContext, MessageProviderWrapper }