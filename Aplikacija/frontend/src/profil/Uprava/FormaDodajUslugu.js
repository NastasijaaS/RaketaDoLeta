import { useState, useRef, } from 'react'
import Button from '@mui/material/Button';
import { TextField, Box, Checkbox, FormControlLabel } from '@mui/material';
import '../../styles/input.css'
import useAxiosPrivate from '../../api/useAxiosPrivate';


const FormaDodajUslugu = (props) => {

    const axiosPrivate = useAxiosPrivate()

    const opisUsluge = useRef()
    const cenaUsluge = useRef()
    const nazivUsluge = useRef()
    const trajanjeUsluge = useRef()
    const slika = useRef()

    // let grupniTrening = false

    const [grupniTrening, isGrupni] = useState(false)


    const dodajUslugu = async () => {

        if (nazivUsluge.current.value === '') {
            alert('morate uneti naziv')
            return
        }
        if (cenaUsluge.current.value === '' || cenaUsluge.current.value < 0) {
            alert('morate uneti cenu')
            return
        }

        const zahtev = {
            url: 'http://localhost:8800/api/usluga/dodajUslugu',
            body: {
                naziv: nazivUsluge.current.value,
                cena: cenaUsluge.current.value,
                opis: opisUsluge.current.value,
                trajanje: trajanjeUsluge.current.value,
                treningGrupni: grupniTrening,
                slika: slika.current.value
            }
        }

        // PostMetoda(zahtev, setData, setGreska, setIsLoading)

        try {
            await axiosPrivate.post(zahtev.url, zahtev.body)
            alert('Uspesno doadta usluga: ' + nazivUsluge.current.value)

        } catch (err) {
            alert('Doslo je do greske')
        }

        // if (greska !== false) {
        //     alert('doslo je do greske')

        // }
        // setCena(-1)
        // setIzmena(-1)
        // setNovaUsluga(false)
        // window.location.reload(false);
        // setRefresh(!refresh)
        props.onClose()
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
                sx={{ alignSelf: 'center', m: 1, width: '80%' }}
                inputRef={nazivUsluge}
                label="naziv"
                type="text"
                color="primary"
                size="small"
                variant="standard"
                focused />

            <TextField
                sx={{ alignSelf: 'center', m: 1, width: '80%' }}
                label="opis"
                multiline
                rows={5}
                color="primary"
                inputRef={opisUsluge}
                variant="standard"
                focused
            />


            <TextField
                sx={{ alignSelf: 'center', m: 1, }}
                inputRef={cenaUsluge}
                label="cena"
                type="number"
                step='10'
                color="primary"
                size="small"
                focused />

            <TextField
                sx={{ alignSelf: 'center', m: 1, }}
                inputRef={trajanjeUsluge}
                label="trajanje"
                type="number"
                step='10'
                color="primary"
                size="small"
                focused />

            <FormControlLabel
                sx={{ alignSelf: 'center', alignItems: 'center' }}
                value="online"
                onChange={(ev) => { isGrupni(ev.target.checked) }}
                control={<Checkbox color="primary" />}
                label="Grupni trening"
                labelPlacement="start"
                color="primary"
            />

            {grupniTrening && <TextField
                sx={{ alignSelf: 'center', m: 1, }}
                inputRef={slika}
                label="slika"
                color="primary"
                size="small"
                focused />
            }

            <div style={{ alignSelf: 'center' }}>
                <Button sx={{ margin: 4 }} size='small' variant="contained" onClick={dodajUslugu}>ok</Button>
                <Button sx={{ margin: 4 }} size='small' variant="contained" onClick={props.onClose}>Otkazi</Button>
            </div>
        </Box>
    )
}
export default FormaDodajUslugu