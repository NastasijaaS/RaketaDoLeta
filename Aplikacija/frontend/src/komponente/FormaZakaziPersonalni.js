import React, { useContext, useState, useRef, useEffect } from "react";
import '../styles/stil.css'
import { UserContext } from "../context/UserContext";
import Button from "@mui/material/Button";
import { Box, Grid, TextField, Typography } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Greska from './Alert'
import { PostMetoda, GetData } from './Fetch'


const tip = ["Gornji deo tela", "Donji deo tela", "Kardio"]
const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h"]

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
    const [date, setDate] = useState(new Date());
    const [termin, setTermin] = useState({ vreme: "", idTermina: "" });
    const [termini, setTermini] = useState([1])

    useEffect(() => {

        setTermin({ vreme: "", idTermina: "" })
        setTermini([])

        const datum = new Date(date.toDateString())

        GetData(`http://localhost:8800/api/termin/vratiSlobodneTermineZaTreneraPoDatumu/${props.idTrenera}/${datum.toISOString()}`,
            setTermini, setGreska, setIsLoading)

    }, [date])

    const zakaziTrening = (ev) => {
        console.log(termin.vreme)


        if (tipTreninga === '' || intenzitetTreninga === '' || trajanjeTreninga === '' || termin.vreme === '') {
            setError('Morate uneti sve podatke')
            return
        }

        // console.log(new Date(date.getFullYear() + ' ' + date.getMonth() + ' ' + date.getDate() + ' ' + termin))

        // const datum = new Date(date.getFullYear(), date.getMonth(), date.getDate(), vreme.getHours(), vreme.getMinutes())

        const datum = (new Date(date.toDateString() + ' ' + termin.vreme.vreme))
        // console.log(date.toDateString()+termin)

        const zahtev = {
            url: 'http://localhost:8800/api/korisnik/zakaziPersonalniTrening/' + user.korisnikId + '/' + props.idTrenera + '/' + termin.vreme.idTermina,
            body: {
                // trenerId: props.idTrenera,
                datum: datum,
                tip: tipTreninga,
                intenzitet: intenzitetTreninga,
                trajanje: trajanjeTreninga,
                isOnline: isOnline
            }
        }



        PostMetoda(zahtev, setData, setGreska, setIsLoading)

        if (greska !== false) {
            alert(greska)
            // setError('Morate uneti sve podatke')
        }
        else {
            alert('Uspesno zakazan trening')
        }

        props.onClose()
    }

    
    const DropDown = ({ labela, set, niz, value }) => {

        return (
            <FormControl
                sx={{ width: '100%' }}
            // disabled={termini.length === 0}
            >
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


    // const nadjiTermin = (date) => {
    //     //   console.log(new Date(date.toDateString()))
    //     setTermin({ vreme: "", idTermina: "" })
    //     setTermini([])
    //     const datum = new Date(date.toDateString())

    //     GetData(`http://localhost:8800/api/termin/vratiSlobodneTermineZaTreneraPoDatumu/${props.idTrenera}/${datum.toISOString()}`,
    //         setTermini, setGreska, setIsLoading)
    // }

    let datumDo = new Date();
    datumDo.setDate((new Date()).getDate() + 14)

    return (
        <Box className='cardCenter marginS' sx={{ gap: '1vh', padding: '0% 20%', alignItems: "stretch" }} onSubmit={zakaziTrening}>

            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>Personalni trening</Typography>

            <Greska open={Boolean(error)} onClose={() => setError(false)} greska={error} />

            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DatePicker
                    label="izaberite datum"
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                        //   nadjiTermin(newValue);
                    }}
                    minDate={new Date()}
                    maxDate={datumDo}
                    renderInput={(params) => <TextField size='small' {...params} />}
                    focused
                />
            </LocalizationProvider>


            <FormControl sx={{ width: '100%' }}
                disabled={termini.length === 0}
            > 
                <InputLabel>{ termini.length === 0 ? 'nema slobodnih termina':'vreme'}</InputLabel>
                <Select
                    label='vreme'
                    value={termin.vreme}
                    size='small'
                    onChange={(ev) => {
                        setTermin({ vreme: ev.target.value })
                        //   console.log(ev.target.value)
                    }}
                >
                    {
                        termini.map((n, i) => (
                            <MenuItem key={i} value={n}>{n.vreme}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>

            <DropDown labela='Tip treninga' set={setTip} niz={tip} value={tipTreninga} />
            <DropDown labela='Intenzitet treninga' set={setIntenzitet} niz={intenzitet} value={intenzitetTreninga} />
            <DropDown className='marginForm' labela='Trajanje treninga' set={setTrajanje} niz={trajanje} value={trajanjeTreninga} />

            <Box display='flex' flexDirection='row' justifyContent={"flex-end"}>
                <Button size='small' variant="outlined" onClick={zakaziTrening}>Potvrdi</Button>
                <Button sx={{ marginLeft: '2%' }} size='small' variant="outlined" onClick={props.onClose}>Otkazi</Button>
            </Box>

        </Box>
    )
}

export default FormaZakaziPersonalni