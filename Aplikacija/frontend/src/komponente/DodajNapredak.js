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

const DodajNapredak = (props) => {

    const bodyAge = useRef()
    const procenatVode = useRef()
    const kostanaMasa = useRef()
    const BMI = useRef()
    const procenatMasti = useRef()
    const procenatProteina = useRef()
    const tezinaMisica = useRef()
    const tezina = useRef()


    const dodajNapredak = () => {
        //.post("/dodajNapredak/:idTrenera"
        /** "korisnikId": req.body.korisnikId,
                            "kilaza": req.body.kilaza,
                            "tezina": req.body.tezina,
                            "tezinaMisica": req.body.tezinaMisica,
                            "procenatProteina": req.body.procenatProteina,
                            "procenatMasti": req.body.procenatMasti,
                            "BMI": req.body.BMI,
                            "kostanaMasa": req.body.kostanaMasa,
                            "procenatVode": req.body.procenatVode,
                            "bodyAge": req.body.bodyAge */
    }


    return (
        <Box>

            <div style={{ gap: '1%' }}>
                <Info labela='bodyAge' tip='number' reff={bodyAge} />
                <Info labela='procenatVode' tip='number' reff={procenatVode} />
                <Info labela='kostanaMasa' tip='number' reff={kostanaMasa} />
                <Info labela='BMI' tip='number' reff={BMI} />
                <Info labela='procenatMasti' tip='number' reff={procenatMasti} />
                <Info labela='procenatProteina' tip='number' reff={procenatProteina} />
                <Info labela='tezinaMisica' tip='number' reff={tezinaMisica} />
                <Info labela='tezina' tip='number' reff={tezina} />
            </div>


            <div>
                <Button size='small' variant="outlined" className="btn" >Potvrdi</Button>
                <Button size='small' variant="outlined" className="btn" onClick={props.onClose}>Otkazi</Button>
            </div>
        </Box>
    )
}
export default DodajNapredak