

import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select, FormControlLabel, Box } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Checkbox } from "@mui/material";
import Greska from './Alert'
import { PostMetoda } from './Fetch'


const Info = ({ labela, tip, reff }) => {
    return (
        <div>
            <TextField
                inputRef={reff}
                label={labela}
                type={tip}
                color="primary"
                size="small"
                placeholder={labela}
                focused />
        </div>
    )
}

const DodajEvidenciju = (props) => {

    const brojTreninga = useRef()
    const tipTreninga = useRef()
    const nivo = useRef()



    const dodajEvidenciju = () => {
        //post("/dodajEvidenciju/:idTrenera
        //"korisnikId": req.body.korisnikId,
        // "brojTreninga": req.body.brojTreninga,
        // "tipTreninga": req.body.tipTreninga,
        // "nivo": req.body.nivo
    }


    return (
        <Box>

            <div style={{ gap: '1%' }}>
                <Info labela='brojTreninga' tip='number' reff={brojTreninga} />
                <Info labela='tipTreninga' tip='number' reff={tipTreninga} />
                <Info labela='nivo' tip='number' reff={nivo} />

            </div>


            <div>
                <Button size='small' variant="outlined" className="btn" >Potvrdi</Button>
                <Button size='small' variant="outlined" className="btn" onClick={props.onClose}>Otkazi</Button>
            </div>
        </Box>
    )
}
export default DodajEvidenciju