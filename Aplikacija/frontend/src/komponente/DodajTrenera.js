import { Checkbox, FormControlLabel, TextField, Button, Box, Typography } from '@mui/material'
import React, { useRef, useState, Fragment } from 'react'
import { PostMetoda } from './Fetch'
import Greska from './Alert'
import useAxiosPrivate from '../api/useAxiosPrivate'

const Info = ({ labela, tip, reff }) => {
    return (
        <div>
            {/* <label>{labela}: */}

            <TextField
                fullWidth
                className='loginInp'
                multiline
                inputRef={reff}
                label={labela}
                type={tip}
                color="primary"
                size="small"
                placeholder={labela}
                />

            {/* <input className='loginInp' ref={reff}
                    type={tip} placeholder={labela} /> */}
            {/* </label> */}
        </div>
    )
}


function DodajTrenera(props) {
    console.log(props);

    const axiosPrivate = useAxiosPrivate()

    const [alert, setAlert] = useState({ prikazi: false, tip: 'error', greska: '' })

    const slika = useRef()
    const opis = useRef()
    const sertifikati = useRef()
    const iskustvo = useRef()
    const [data, setData] = useState('')
    const [greska, setGreskaa] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    let grupni = false


    const dodajTrenera = async () => {
        console.log(props)


        // const idTrenera = JSON.parse(sessionStorage.getItem("idTrenera"))
        // console.log(idTrenera)

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
                slika: slika.current.value
            }
        }

        //PostMetoda(zahtev, setData, setGreskaa, setIsLoading)

        try {
            await axiosPrivate.post(zahtev.url, zahtev.body)
        //    alert('Uspesno dodat trener')
        } catch (err) {
            setAlert({ prikazi: true, tip: 'error', greska: 'Doslo je do greske prilikom upisa' })
            console.log(err)
        }

        // if (greska) {
        //     setAlert({ prikazi: true, tip: 'error', greska: 'Doslo je do greske prilikom upisa' })

        //     // return
        // }
        // else {
        //     setAlert({ prikazi: true, tip: 'success', greska: 'Uspesno dodat trener' })

        // }

        sessionStorage.clear();
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
            
            <Box className="cardCenter" sx = {{gap: '1vh', padding: {sm:'0% 20%'}, alignItems: "stretch"}} >
                <Typography variant="h5" component="div"  gutterBottom sx={{ textAlign: 'center' }}>Dodaj trenera</Typography>

                <Info multiline labela='opis' tip='text' reff={opis} />
                <Info multiline labela='iskustvo' tip='text' reff={iskustvo} />
                <Info multiline labela='sertifikati' tip='text' reff={sertifikati} />

                <Info labela='slika' tip='text' reff={slika} />

                <Box className = "cardCenter">
                    <FormControlLabel
                        onChange={(ev) => { grupni = ev.target.checked }}
                        control={<Checkbox defaultChecked />}
                        label="Drzi grupne treninge" />
                </Box>
                

                <Button  fullWidth variant = 'outlined' onClick={dodajTrenera}>Unesi</Button>

            </Box>}

            {success && <div>animacija success</div>}

        </div >
    )
}

export default DodajTrenera