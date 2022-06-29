import { Checkbox, FormControlLabel, TextField, Button, Box, Typography } from '@mui/material'
import React, { useRef, useState, Fragment } from 'react'
import { PostMetoda } from '../Fetch'
import Greska from '../Alert'
import useAxiosPrivate from '../../api/useAxiosPrivate'
import Info from '../Inputi/Info'




function DodajTrenera(props) {
    console.log(props);

    const axiosPrivate = useAxiosPrivate()
    const [alert, setAlert] = useState({ prikazi: false, tip: 'error', greska: '' })

    const opis = useRef()
    const sertifikati = useRef()
    const iskustvo = useRef()

    const [success, setSuccess] = useState(false)
    const [file, setFile] = useState('')

    let grupni = false

    const dodajTrenera = async () => {

        const idTrenera = props.idTrenera

        if (idTrenera === null || idTrenera === '') {
            alert('doslo je do greske')
            console.log('ne cita id trenera')
            return
        }

        const zahtev = {
            url: 'http://localhost:8800/api/trener/dodajTrenera/' + idTrenera,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                opis: opis.current.value,
                sertifikati: sertifikati.current.value.split(','),
                iskustvo: sertifikati.current.value.split(','),
            }
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('sertifikati', sertifikati.current.value.split(','));
        formData.append('opis', opis.current.value);
        formData.append('iskustvo', sertifikati.current.value.split(','));


        try {
            await axiosPrivate.post(zahtev.url, formData, {
                opis: opis.current.value,
                sertifikati: sertifikati.current.value.split(','),
                iskustvo: sertifikati.current.value.split(','),
            })

        } catch (err) {
            setAlert({ prikazi: true, tip: 'error', greska: 'Doslo je do greske prilikom upisa' })
            console.log(err)
        }

        setSuccess(true)
    }

    return (
        <div className="forma">

            <Greska
                open={alert.prikazi}
                onClose={() => setAlert({ prikazi: false, tip: 'success', greska: '' })}
                tip={alert.tip}
                greska={alert.greska}
            />

            {!success &&

                <Box className="cardCenter" sx={{ gap: '1vh', padding: { sm: '0% 20%' }, alignItems: "stretch" }} >
                    <Typography variant="h5" component="div" gutterBottom sx={{ textAlign: 'center' }}>Dodaj trenera</Typography>

                    <Info multiline labela='opis' tip='text' reff={opis} />
                    <Info multiline labela='iskustvo' tip='text' reff={iskustvo} />
                    <Info multiline labela='sertifikati' tip='text' reff={sertifikati} />

                    <Info sx={{ width: '100%' }} fullWidth tip='file' onChange={(ev) => { setFile(ev.target.files[0]); }} />

                    <Box className="cardCenter">
                        <FormControlLabel
                            onChange={(ev) => { grupni = ev.target.checked }}
                            control={<Checkbox defaultChecked />}
                            label="Drzi grupne treninge" />
                    </Box>


                    <Button fullWidth variant='outlined' onClick={dodajTrenera}>Unesi</Button>

                </Box>}

            {success && <div>animacija success</div>}

        </div >
    )
}

export default DodajTrenera