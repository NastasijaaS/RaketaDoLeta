import { Paper, Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import ReactDOM from "react-dom";

import '../styles/Modal.css'

import { Modal as MuiModal } from "@mui/material"


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

    console.log(props)

    const t = sessionStorage.getItem('tema')

    const theme = t === 'light' ? darkTheme : lightTheme

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MuiModal open = {props.open}  onClose={props.onClose}
             sx={{ display: 'flex', justifyContent: 'center' }}
             >

                {/* <div className="pozadina" onClick={props.onClose} /> */}

                <Box className="cardCenter" sx={{backgroundColor:'white'}}>
                    <button className="btnZatvori" onClick={props.onClose}>X</button>
                    <Box className="cardCenter">
                        {props.children}
                    </Box>
                </Box>

            </MuiModal>

        </ThemeProvider >

        // ReactDOM.createPortal(
        //     <ThemeProvider theme={theme}>
        //         <CssBaseline />
        //         <Paper>
        //             <div className="pozadina" onClick={props.onClose} />

        //             <Box className="modal cardCenter">
        //                 <button className="btnZatvori" onClick={props.onClose}>X</button>
        //                 <Box className="modal-body cardCenter">
        //                     {props.children}
        //                 </Box>
        //             </Box>

        //         </Paper>
        //     </ThemeProvider >
        //     ,
        //     modalRoot
    )
//     )
 }

export default Modal