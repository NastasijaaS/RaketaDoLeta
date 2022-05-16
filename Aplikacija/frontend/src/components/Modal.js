
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("forma");

const Modal = (props) => {
    return (
        ReactDOM.createPortal(
            <div className="modal">
                {props.children}
            </div>,
            modalRoot
        )
    )
}

export default Modal