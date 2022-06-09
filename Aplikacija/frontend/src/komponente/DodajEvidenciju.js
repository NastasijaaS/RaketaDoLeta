

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
            <TextField style={{ margin: '2%' }}
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

const DodajEvidenciju =  (props) => {
    const { user } = useContext(UserContext);
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState('')

    console.log(props)

    const brojTreninga = useRef()
    const tipTreninga = useRef()
    const nivo = useRef()

    const dodajEvidenciju = async () => {
        console.log(user.trenerId)

        const zahtev = {
            url: `http://localhost:8800/api/trener/dodajEvidenciju/${user.trenerId}`,
            body: {
                korisnikId: props.idKorisnika,
                brojTreninga:brojTreninga.current.value,
                tipTreninga:tipTreninga.current.value,
                nivo:nivo.current.value
            }
        }

        await PostMetoda(zahtev, setData, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')

        }
        else {
            alert('uspesno dodat napredak')
        }

        props.onClose()
    }

    return (
        <Box>

            <div style={{ margin: '3%' }}>
                <Info labela='brojTreninga' tip='number' reff={brojTreninga} />
                <Info labela='tipTreninga' tip='number' reff={tipTreninga} />
                <Info labela='nivo' tip='number' reff={nivo} />

            </div>


            <div>
                <Button style={{ margin: '1%' }} size='small' variant="outlined" className="btn" onClick={dodajEvidenciju} >Potvrdi</Button>
                <Button style={{ margin: '1%' }} size='small' variant="outlined" className="btn" onClick={props.onClose}>Otkazi</Button>
            </div>
        </Box>
    )
}
export default DodajEvidenciju