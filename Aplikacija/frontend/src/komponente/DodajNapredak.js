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
import { PostMetoda, PutMetoda } from './Fetch'

const Info = ({ labela, tip, reff }) => {
    return (
        <div>
            <TextField
                style={{ margin: '1%' }}
                inputRef={reff}
                defaultValue={0}
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

    console.log(props.napredakId)

    const { user } = useContext(UserContext);

    const bodyAge = useRef()
    const procenatVode = useRef()
    const kostanaMasa = useRef()
    const BMI = useRef()
    const procenatMasti = useRef()
    const procenatProteina = useRef()
    const tezinaMisica = useRef()
    const tezina = useRef()


    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState('')

    const dodajNapredak = async () => {

        console.log('napredak')

        const zahtev = {
            url: `http://localhost:8800/api/trener/dodajNapredak/${user.trenerId}/${props.idKorisnika}`,
            body: {
                // korisnikId: props.idKorisnika,
                tezina: tezina.current.value,
                tezinaMisica: tezinaMisica.current.value,
                procenatProteina: procenatProteina.current.value,
                procenatMasti: procenatMasti.current.value,
                BMI: BMI.current.value,
                kostanaMasa: kostanaMasa.current.value,
                procenatVode: procenatVode.current.value,
                bodyAge: bodyAge.current.value
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

    const izmeniNapredak = async () => {

        console.log('napredak')

        const zahtev = {
            url: `http://localhost:8800/api/trener/izmeniNapredak/${props.napredakId}`,
            body: {
                // korisnikId: props.idKorisnika,
                tezina: tezina.current.value,
                tezinaMisica: tezinaMisica.current.value,
                procenatProteina: procenatProteina.current.value,
                procenatMasti: procenatMasti.current.value,
                BMI: BMI.current.value,
                kostanaMasa: kostanaMasa.current.value,
                procenatVode: procenatVode.current.value,
                bodyAge: bodyAge.current.value
            }
        }

        await PutMetoda(zahtev, setData, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')

        }
        else {
            alert('uspesno dodat napredak')
        }

        props.onClose()

        window.location.reload(false)
    }


    return (


        <div style={{ margin: '3%' }}>

            <Info labela='bodyAge' tip='number' reff={bodyAge} />
            <Info labela='procenatVode' tip='number' reff={procenatVode} />
            <Info labela='kostanaMasa' tip='number' reff={kostanaMasa} />
            <Info labela='BMI' tip='number' reff={BMI} />
            <Info labela='procenatMasti' tip='number' reff={procenatMasti} />
            <Info labela='procenatProteina' tip='number' reff={procenatProteina} />
            <Info labela='tezinaMisica' tip='number' reff={tezinaMisica} />
            <Info labela='tezina' tip='number' reff={tezina} />


            {/* <div> */}
            {props.prvi && <Button size='small' variant="outlined" className="btn" onClick={dodajNapredak}>Unesi</Button>}
            <Button size='small' variant="outlined" className="btn" onClick={props.onClose}>Otkazi</Button>

            {!props.prvi && <Button size='small' variant="outlined" className="btn" onClick={izmeniNapredak}>Unesi</Button>}


            {/* </div> */}
        </div>


    )
}
export default DodajNapredak