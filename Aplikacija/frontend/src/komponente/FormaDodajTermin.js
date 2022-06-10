import React, { useContext, useState, useRef, useEffect } from "react";
import '../styles/formaZakazi.css'
import '../styles/stil.css'
import { UserContext } from "../context/UserContext";
import Button from "@mui/material/Button";
import { Box, Grid, TextField, Typography } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select, FormControlLabel } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Checkbox } from "@mui/material";
import Greska from './Alert'
import { PostMetoda, GetData } from './Fetch'
import ruLocale from 'date-fns/locale/ru'

const FormaDodajTermin = (props) => {

    const [date, setDate] = useState(new Date());
    const [vreme, setVreme] = useState(
        [
            new Date(0, 0, 0, 8),
            new Date(0, 0, 0, 8),
            new Date(0, 0, 0, 8),
            new Date(0, 0, 0, 8),
            new Date(0, 0, 0, 8),
        ]);

    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState('')

    let niz = [0, 1, 2, 3, 4]

    const promeniVreme = (newValue, i) => {
        let noviNiz = [...vreme];
        noviNiz[i] = newValue
        setVreme(noviNiz);
    }

    const unesiTermin = async () => {
       // console.log(vreme)
        let uniqueArray = vreme.map(function (date) { return date.getTime() })
            .filter(function (date, i, array) {
                return array.indexOf(date) === i;
            })
            .map(function (time) { return new Date(time); });

      //  console.log(uniqueArray)
        if (uniqueArray.length === 0) {
            alert('morate uneti razlicita vremena')
            return
        }
        
        niz.forEach(async i => {
            const zahtev = {
                url: 'http://localhost:8800/api/termin/dodajTerminTreneru/' + props.idTrenera,
                body: {
                    datum: new Date(date.toDateString()).toISOString(),
                    vremePocetka: vreme[i]
                }
            }
            await PostMetoda(zahtev, setData, setGreska, setIsLoading)
            console.log(greska)
        })

        props.onClose()
    }

    return (
        <Box >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box spacing={3} sx={{ margin: '3%' }}>

                    <DatePicker
                        label="izaberite datum"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                        minDate={new Date()}
                        renderInput={(params) => <TextField size='small' {...params} />}
                        focused
                    />
                </Box>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}
                adapterLocale={ruLocale}>
                {
                    niz.map((i) => (
                        <Box key={i} spacing={3} sx={{ margin: '3%' }}>
                            <TimePicker
                                renderInput={(params) => <TextField size='small' {...params} />}
                                size='small'
                                value={vreme[i]}
                                minutesStep={15}
                                label="pocetak termina"
                                onChange={(newValue) => {
                                    promeniVreme(newValue, i)
                                }}
                                minTime={new Date(0, 0, 0, 8)}
                                maxTime={new Date(0, 0, 0, 18, 45)}
                            />
                        </Box>
                    ))
                }

            </LocalizationProvider>

            <Button onClick={unesiTermin}>unesi</Button>
        </Box>
    )
}

export default FormaDodajTermin