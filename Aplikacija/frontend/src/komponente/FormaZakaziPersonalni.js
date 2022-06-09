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


const tip = ["Gornji deo tela", "Donji deo tela", "Kardio"]
const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h", "1h30min", "2h"]

const FormaZakaziPersonalni = (props) => {

    const { user } = useContext(UserContext);

    let isOnline = false

    const [tipTreninga, setTip] = useState('')
    const [intenzitetTreninga, setIntenzitet] = useState('')
    const [trajanjeTreninga, setTrajanje] = useState('')

    const [error, setError] = useState(false)

    const [data, setData] = useState()
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const maxBrojClanova = useRef()
    const naziv = useRef()

    const [treninzi, setTreninzi] = useState([])
    const [uslugaId, setUslugaId] = useState(0)

    useEffect(() => {
        const get = () => { GetData("http://localhost:8800/api/korisnik/vidiGrupneUsluge", setTreninzi, setGreska, setIsLoading) }
        get()
    }, [])

    const zakaziTrening = async (ev) => {

        if (tipTreninga === '' || intenzitetTreninga === '' || trajanjeTreninga === '') {
            setError('Morate uneti sve podatke')
            return
        }

        const datum = new Date(date.getFullYear(), date.getMonth(), date.getDate(), vreme.getHours(), vreme.getMinutes())

        const zahtev = {
            url: 'http://localhost:8800/api/korisnik/zakaziPersonalniTrening/' + user.korisnikId + '/' + props.idTrenera,
            body: {
                // trenerId: props.idTrenera,
                datum: datum,
                tip: tipTreninga,
                intenzitet: intenzitetTreninga,
                trajanje: trajanjeTreninga,
                isOnline: isOnline
            }
        }

        await PostMetoda(zahtev, setData, setGreska, setIsLoading)

        if (greska !== false) {
            alert(greska)
            // setError('Morate uneti sve podatke')
        }
        else {
            alert('Uspesno zakazan trening')
        }

        props.onClose()
    }

    const onlineTrening = (ev) => {
        isOnline = ev.target.checked
    }

    const [startDate, setStartDate] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [vreme, setVreme] = useState(new Date(0, 0, 0, 8));
    const [usluga, setUsluga] = useState('');

    const DropDown = ({ labela, set, niz, value }) => {
        return (<FormControl sx={{width: '100%' }}>
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

        console.log(datum.toISOString())

        const zahtev = {
            url: 'http://localhost:8800/api/trener/zakaziGrupniTrening/' + props.idTrenera + '/' + usluga,
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

       await PostMetoda(zahtev, setData, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')
        }
        else {
            alert('uspesno dodat trenig')
        }
    }

    let datumDo = new Date();
    datumDo.setDate((new Date()).getDate() + 14)

    return (
        <Box className ='cardCenter marginS' sx = {{gap: '1vh', padding: '0% 20%', alignItems:"stretch"}} onSubmit={zakaziTrening}>

            {!props.grupni && <Typography gutterBottom variant = "h5" component="div" textAlign={"center"}>Personalni trening</Typography>}
            {props.grupni && <Typography gutterBottom variant = "h5" component="div" textAlign={"center"}>Grupni trening</Typography>}

            <Greska open={Boolean(error)} onClose={() => setError(false)} greska={error} />
<<<<<<< HEAD
            
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
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                
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
=======

            <LocalizationProvider dateAdapter={AdapterDateFns}>
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

            <LocalizationProvider dateAdapter={AdapterDateFns}>

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
                        focused
                    />

                </Stack>
            </LocalizationProvider>

            {!props.grupni && <DropDown labela='Tip treninga' set={setTip} niz={tip} value={tipTreninga} />}
            <DropDown labela='Intenzitet treninga' set={setIntenzitet} niz={intenzitet} value={intenzitetTreninga} />
            <DropDown labela='Trajanje treninga' set={setTrajanje} niz={trajanje} value={trajanjeTreninga} />
>>>>>>> 4b387d3491de67c84d0cfb2aec4fd5533a15d111

            {!props.grupni &&
                <DropDown  labela='Tip treninga' set={setTip} niz={tip} value={tipTreninga} />
            }
                <DropDown labela='Intenzitet treninga' set={setIntenzitet} niz={intenzitet} value={intenzitetTreninga} />
                <DropDown className = 'marginForm' labela='Trajanje treninga' set={setTrajanje} niz={trajanje} value={trajanjeTreninga} />
            
            {props.grupni &&
                <Box className="cardCenter" sx={{ gap: '1vh'}} >

                    <TextField
                        sx = {{width:'100%'}}
                        inputRef={naziv}
                        label='naziv'
                        type='text'
                        size="small"
                        placeholder='naziv'
                         />

                    <TextField
                        sx = {{width:'100%'}}
                        inputRef={maxBrojClanova}
                        label='Max broj clanova'
                        type='number'
                        size="small"
                        placeholder='max broj clanova'
                         />

                    <FormControl sx={{ width:'100%' }}>
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
            }

            {!props.grupni && <FormControlLabel
                sx = {{justifyContent:'center'}}
                value="online"
                onChange={onlineTrening}
                control={<Checkbox />}
                label="On-line trening"
                labelPlacement="end"
            />}

            <Box display = 'flex' flexDirection = 'row' justifyContent={"flex-end"}>
                {!props.grupni && <Button  size='small' variant="outlined" onClick={zakaziTrening}>Potvrdi</Button>}
                {props.grupni && <Button  size='small' variant="outlined" onClick={zakaziGrupniTrening}>Potvrdi</Button>}
                <Button sx={{marginLeft:'2%'}} size='small' variant="outlined" onClick={props.onClose}>Otkazi</Button>
            </Box>


        </Box>
    )
}



export default FormaZakaziPersonalni