import { Paper, Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import ReactDOM from "react-dom";

import '../styles/Modal.css'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#f8af00',
        },
        secondary: {
            main: '#004af8',
        },
        error: {
            main: '#f83200',
        },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#f8af00',
        },
        secondary: {
            main: '#004af8',
        },
        error: {
            main: '#f83200',
        },
    },
});


const modalRoot = document.getElementById("forma");

const Modal = (props) => {

    const t = sessionStorage.getItem('tema')

    const theme = t === 'light' ? darkTheme : lightTheme

    return (
        ReactDOM.createPortal(
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Paper>
                    <div className="pozadina" >

                        <Box className="modal">
                            <button className="btnZatvori" onClick={props.onClose}>X</button>
                            <Box className="modal-body">
                                {props.children}
                            </Box>
                        </Box>
                    </div>
                </Paper>
            </ThemeProvider >
            ,
            modalRoot
        )
    )
}

export default Modal