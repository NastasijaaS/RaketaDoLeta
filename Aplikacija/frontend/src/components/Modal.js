
import ReactDOM from "react-dom";

import '../styles/Modal.css'

const modalRoot = document.getElementById("forma");

const Modal = (props) => {
    return (
        ReactDOM.createPortal(
            <div className="modal">
                <button className="btnZatvori" onClick={props.onClose}>X</button>

                {props.children}
            </div>,
            modalRoot
        )
    )
}

export default Modal