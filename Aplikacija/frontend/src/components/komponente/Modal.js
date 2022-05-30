
import { Fragment } from "react";
import ReactDOM from "react-dom";

import '../../styles/Modal.css'

const modalRoot = document.getElementById("forma");

const Modal = (props) => {
    return (
        ReactDOM.createPortal(
            <Fragment>
                <div className="pozadina" />

                <div className="modal">

                    <button className="btnZatvori" onClick={props.onClose}>X</button>

                    {props.children}
                </div>
            </Fragment>,
            modalRoot
        )
    )
}

export default Modal