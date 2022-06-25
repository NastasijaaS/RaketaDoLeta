import React, { useContext, useState, useRef, useEffect } from "react";
import '../styles/formaZakazi.css'
import { UserContext } from "../context/UserContext";
import Button from "@mui/material/Button";
import { TextField } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select, FormControlLabel } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Checkbox } from "@mui/material";
import Greska from './Alert'
import { PutMetoda } from './Fetch'
import useAxiosPrivate from "../api/useAxiosPrivate";

const tip = ["Gornji deo tela", "Donji deo tela", "Kardio"]
const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h", "1h30min", "2h"]

const FormaIzmeniTrening = (props) => {

    console.log(props.idTreninga)

    const axiosPrivate = useAxiosPrivate()

    // console.log(new Date(Date.parse('01 Jan 1970 ' + props.vreme)))

    const { user } = useContext(UserContext);

    let isOnline = props.isOnline
    const [tipTreninga, setTip] = useState(props.tipTreninga)
    const [intenzitetTreninga, setIntenzitet] = useState(props.intenzitetTreninga)
    const [trajanjeTreninga, setTrajanje] = useState(props.trajanjeTreninga)
    const [date, setDate] = useState(new Date(props.datum));
    const [vreme, setVreme] = useState(new Date(Date.parse('01 Jan 2000 ' + props.vreme)))
    const [error, setError] = useState(false)
    const [data, setData] = useState()
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const izmeniTrening = async (ev) => {

        if (tipTreninga === '' || intenzitetTreninga === '' || trajanjeTreninga === '') {
            setError('Morate uneti sve podatke')
            return
        }

        const datum = new Date(date.getFullYear(), date.getMonth(), date.getDate(), vreme.getHours(), vreme.getMinutes())

        const zahtev = {
            url: 'http://localhost:8800/api/trening/izmeniTrening/' + user.korisnikId + '/' + props.idTreninga,
            body: {
                datum: datum,
                vreme: datum,
                tip: tipTreninga,
                intenzitet: intenzitetTreninga,
                trajanje: trajanjeTreninga,
                isOnline: isOnline
            }
        }

        // await PutMetoda(zahtev, setData, setGreska, setIsLoading)

        try {
            await axiosPrivate.put(zahtev.url, zahtev.body)
            alert('Uspesno ste se izmenili trening')
        } catch (err) {
            alert('Doslo je do greske')
        }

        // if (greska !== false) {
        //     alert(greska)
        // }
        // else {
        //     alert('Uspesno izmenjen trening')
        // }

        props.onClose()
    }

    const onlineTrening = (ev) => {
        isOnline = ev.target.checked
    }


    const DropDown = ({ labela, set, niz, value }) => {
        return (<FormControl sx={{ minWidth: 150, }}>
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


    let datumDo = new Date();
    datumDo.setDate((new Date()).getDate() + 14)

    return (
        <form className="formaZakazi" onSubmit={izmeniTrening}>

            <Greska open={Boolean(error)} onClose={() => setError(false)} greska={error} />

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

            <DropDown labela='Tip treninga' set={setTip} niz={tip} value={tipTreninga} />
            <DropDown labela='Intenzitet treninga' set={setIntenzitet} niz={intenzitet} value={intenzitetTreninga} />
            <DropDown labela='Trajanje treninga' set={setTrajanje} niz={trajanje} value={trajanjeTreninga} />

            <FormControlLabel
                value="online"
                onChange={onlineTrening}
                control={<Checkbox />}
                label="On-line trening"
                labelPlacement="start"
            />

            <div>
                <Button size='small' variant="outlined" className="btn" onClick={izmeniTrening}>Potvrdi</Button>
                <Button size='small' variant="outlined" className="btn" onClick={props.onClose}>Otkazi</Button>
            </div>


        </form>
    )
}

export default FormaIzmeniTrening