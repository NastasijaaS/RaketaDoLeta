import { useState, useRef, } from 'react'
import {Button, TextField, Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
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
            <Box className = "cardCenter marginS" sx = {{gap: '1vh', padding: {sm:'0% 20%'}, alignItems: "stretch"}}>
            
                <Typography variant="h5" component="div"  gutterBottom sx={{ textAlign: 'center' }}>Usluga</Typography>

                <TextField                   
                    label="Naziv"
                    type="text"
                    size="small"
                    inputRef={nazivUsluge}
                    variant="outlined"
                     />

                <TextField
                    label="Opis"
                    multiline
                    rows={4}
                    inputRef={opisUsluge}
                    variant="outlined"
                />


                <TextField
                    inputRef={cenaUsluge}
                    label="Cena"
                    type="number"
                    step='10'
                    color="primary"
                    size="small"
                    />

                <TextField
                    inputRef={trajanjeUsluge}
                    label="Trajanje"
                    type="number"
                    step='10'
                    color="primary"
                    size="small"
                     />
                
                <FormControlLabel
                    sx={{ alignSelf: 'center' }}
                    value="online"
                    onChange={(ev) => { isGrupni(ev.target.checked) }}
                    control={<Checkbox color="primary" />}
                    label="Grupni trening"
                    labelPlacement="start"
                    color="primary"
                />

                {grupniTrening &&
                
                <TextField
                    sx={{ alignSelf: 'center', m: 1, }}
                    inputRef={slika}
                    label="slika"
                    color="primary"
                    size="small"
                    focused />
                }

                <Button fullWidth size='small' variant="outlined" onClick={dodajUslugu}>Unesi</Button>

            </Box>
    )
}
export default FormaDodajUslugu