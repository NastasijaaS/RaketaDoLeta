
import { Fragment } from "react";
import ReactDOM from "react-dom";

import '../styles/Modal.css'

const modalRoot = document.getElementById("forma");

const Modal = (props) => {
    return (
        ReactDOM.createPortal(
            <Fragment>
                <div className="pozadina" onClick={props.onClose} />
                <div className="modal">
                    <button className="btnZatvori" onClick={props.onClose}>X</button>
                    <div className="modal-body">
                    {props.children}
                    </div>
                </div>
            </Fragment>,
            modalRoot
        )
    )
}

export default Modal