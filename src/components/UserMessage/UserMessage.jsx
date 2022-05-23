import { useContext } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { MessageContext } from '../../context/message.context'

const UserMessage = () => {

    const { show, setShow, messageInfo } = useContext(MessageContext)

    return (
        <ToastContainer className="p-3" position={'bottom-end'}>
            <Toast show={show} autohide delay={6000} onClose={() => setShow(false)} >
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{messageInfo.title}</strong>
                </Toast.Header>
                <Toast.Body>{messageInfo.description}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default UserMessage