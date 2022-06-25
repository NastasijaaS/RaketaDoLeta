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
import hrLocale from 'date-fns/locale/hr'
import useAxiosPrivate from '../api/useAxiosPrivate'

const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h"]


const DropDown = ({ labela, set, niz, value }) => {
    return (<FormControl sx={{ width: '100%' }}>
        <InputLabel>{labela}</InputLabel>
        <Select
            label={labela}
            value={value}
            size='small'
            onChange={(ev) => {
                set(ev.target.value)
            }}
        >
            {
                niz.map(n => (
                    <MenuItem key={n} value={n}>{n}</MenuItem>
                ))
            }

        </Select>
    </FormControl>)
}


const NapraviGrupni = (props) => {

    const axiosPrivate = useAxiosPrivate()

    let isOnline = false
    const [intenzitetTreninga, setIntenzitet] = useState('')
    const [trajanjeTreninga, setTrajanje] = useState('')
    const [error, setError] = useState(false)
    const [data, setData] = useState()
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const maxBrojClanova = useRef()
    const naziv = useRef()
    const [treninzi, setTreninzi] = useState([])
    const [date, setDate] = useState(new Date());
    const [vreme, setVreme] = useState(new Date(0, 0, 0, 8));
    const [usluga, setUsluga] = useState('');


    useEffect(() => {
        // GetData("http://localhost:8800/api/trening/vidiGrupneUsluge", setTreninzi, setGreska, setIsLoading) 
        const get = async () => {
            await axiosPrivate.get("http://localhost:8800/api/trening/vidiGrupneUsluge")
                .then(res => {
                    if (res.status === 200) {

                        if (res.data) {
                            setTreninzi(res.data)
                        }
                    }
                }).catch((error) => {
                    alert('Doslo je do greske')
                    console.log(error)
                });
        }
        get()
    }, [])

    const onlineTrening = (ev) => {
        isOnline = ev.target.checked
    }


    const zakaziGrupniTrening = async () => {

        if (maxBrojClanova.current.value <= 0) {
            alert('morate uneti broj clanova')
            return
        }

        if (intenzitetTreninga === '' || trajanjeTreninga === '') {
            setError('Morate uneti sve podatke')
            return
        }

        const datum = new Date(date.getFullYear(), date.getMonth(), date.getDate())

        const zahtev = {
            url: 'http://localhost:8800/api/trening/zakaziGrupniTrening/' + props.idTrenera + '/' + usluga,
            body: {
                naziv: naziv.current.value,
                datum: datum.toISOString(),
                vreme: vreme,
                intenzitet: intenzitetTreninga,
                trajanje: trajanjeTreninga,
                isOnline: isOnline,
                brojMaxClanova: maxBrojClanova.current.value,
                status: 'Odobreno'
            }
        }

        // await PostMetoda(zahtev, setData, setGreska, setIsLoading)

        try {
            await axiosPrivate.post(zahtev.url)
            alert('Uspesno dodat trening')
        } catch (err) {
            alert('Doslo je do greske')
        }

        // if (greska !== false) {
        //     alert('doslo je do greske')
        // }
        // else {
        //     alert('uspesno dodat trenig')
        // }

        props.onClose()
    }

    let datumDo = new Date();
    datumDo.setDate((new Date()).getDate() + 14)

    return (
        <Box className='cardCenter marginS' sx={{ gap: '1vh', padding: '0% 20%', alignItems: "stretch" }}>

            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>Grupni trening</Typography>

            <Greska open={Boolean(error)} onClose={() => setError(false)} greska={error} />

            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DatePicker
                    label="izaberite datum"
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                    minDate={new Date()}
                    maxDate={datumDo}
                    renderInput={(params) => <TextField size='small' {...params} />}
                    focused
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={hrLocale}>

                <Stack spacing={3}>
                    <TimePicker
                        renderInput={(params) => <TextField size='small' {...params} />}
                        size='small'
                        value={vreme}
                        minutesStep={15}
                        label="vreme treninga"
                        onChange={(newValue) => {
                            setVreme(newValue);
                        }}
                        minTime={new Date(0, 0, 0, 8)}
                        maxTime={new Date(0, 0, 0, 18, 45)}
                    />

                </Stack>
            </LocalizationProvider>


            <DropDown labela='Intenzitet treninga' set={setIntenzitet} niz={intenzitet} value={intenzitetTreninga} />
            <DropDown className='marginForm' labela='Trajanje treninga' set={setTrajanje} niz={trajanje} value={trajanjeTreninga} />

            <Box className="cardCenter" sx={{ gap: '1vh' }} >

                <TextField
                    sx={{ width: '100%' }}
                    inputRef={naziv}
                    label='naziv'
                    type='text'
                    size="small"
                    placeholder='naziv'
                />

                <TextField
                    sx={{ width: '100%' }}
                    inputRef={maxBrojClanova}
                    label='Max broj clanova'
                    type='number'
                    size="small"
                    placeholder='max broj clanova'
                />

                <FormControl sx={{ width: '100%' }}>
                    <InputLabel>Usluga</InputLabel>
                    <Select
                        label='usluga'
                        value={usluga}
                        size='small'
                        onChange={(ev) => {
                            setUsluga(ev.target.value);
                            console.log(ev.target)
                        }}
                    >
                        {
                            treninzi.map(n => (
                                <MenuItem key={n._id} name={n._id} value={n._id}>{n.naziv}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
            </Box>

            <Box display='flex' flexDirection='row' justifyContent={"flex-end"}>

                <Button size='small' variant="outlined" onClick={zakaziGrupniTrening}>Potvrdi</Button>
                <Button sx={{ marginLeft: '2%' }} size='small' variant="outlined" onClick={props.onClose}>Otkazi</Button>
            </Box>

        </Box>
    )
}

export default NapraviGrupni