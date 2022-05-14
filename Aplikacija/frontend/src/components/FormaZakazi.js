import React from "react";
import ReactDOM from "react-dom";
import '../styles/formaZakazi.css'
import Input from './Input'

const modalRoot = document.getElementById("zakazi");

// kontext koji cuva podatke o prijavljenom korsniku

const Forma = () => {
    return (
        <div>
            <Input label='Ime: ' input={{ className: '', type: 'text', placeholder: 'ime' }} />
            <button>Potvrdi</button>
            <button>Otkazi</button>
        </div>
    )
}

const FormaZakazi = (props) => {
    return (
        ReactDOM.createPortal(
            <div className="modal">
                {props.children}
                <Forma/>
            </div>,
            modalRoot
        )
    )
}

export default FormaZakazi