
import { Paper, Box } from "@mui/material";
import { Fragment } from "react";
import ReactDOM from "react-dom";

import '../styles/Modal.css'

const modalRoot = document.getElementById("forma");

const Modal = (props) => {
    return (
        ReactDOM.createPortal(
            <Paper>
               
                    <div className="pozadina" onClick={props.onClose} />

                    <Box className="modal">
                        <button className="btnZatvori" onClick={props.onClose}>X</button>
                        <Box className="modal-body">
                            {props.children}
                        </Box>
                    </Box>
                
            </Paper>,
            modalRoot
        )
    )
}

export default Modal