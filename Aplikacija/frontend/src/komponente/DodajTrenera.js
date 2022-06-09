import { Checkbox, FormControlLabel, TextField, Button, Box, Typography } from '@mui/material'
import React, { useRef, useState, Fragment } from 'react'
import { PostMetoda } from './Fetch'
import Greska from './Alert'

const Info = ({ labela, tip, reff }) => {
    return (
        <div>
            {/* <label>{labela}: */}

            <TextField
                className='loginInp'
                multiline
                inputRef={reff}
                label={labela}
                type={tip}
                color="primary"
                size="small"
                placeholder={labela}
                focused />

            {/* <input className='loginInp' ref={reff}
                    type={tip} placeholder={labela} /> */}
            {/* </label> */}
        </div>
    )
}


function DodajTrenera(props) {

    const [alert, setAlert] = useState({ prikazi: false, tip: 'error', greska: '' })


    const opis = useRef()
    const sertifikati = useRef()
    const iskustvo = useRef()
    const [data, setData] = useState('')
    const [greska, setGreskaa] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    let grupni = false


    const dodajTrenera = async () => {



        const idTrenera = JSON.parse(sessionStorage.getItem("idTrenera"))
        console.log(idTrenera)

        if (idTrenera === null || idTrenera === '') {
            alert('doslo je do greske')
            console.log('ne cita id trenera')
            return
        }

        const zahtev = {
            url: 'http://localhost:8800/api/uprava/dodajTrenera/' + idTrenera,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: {
                opis: opis.current.value,
                sertifikati: sertifikati.current.value.split(','),
                iskustvo: sertifikati.current.value.split(',')

            }
        }

        await PostMetoda(zahtev, setData, setGreskaa, setIsLoading)

        if (greska) {
            setAlert({ prikazi: true, tip: 'error', greska: 'Doslo je do greske prilikom upisa' })

           // return
        }
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

            {!success && <form className="login" >
                <h2>Dodajte trenera</h2>

                <Info multiline labela='opis' tip='text' reff={opis} />
                <Info multiline labela='iskustvo' tip='text' reff={iskustvo} />
                <Info multiline labela='sertifikati' tip='text' reff={sertifikati} />

                <FormControlLabel
                    onChange={(ev) => { grupni = ev.target.checked }}
                    control={<Checkbox defaultChecked />}
                    label="Drzi grupne treninge" />

                <Button onClick={dodajTrenera}>Unesi</Button>

            </form>}

            {success && <div>animacija success</div>}

        </div >
    )
}

export default DodajTrenera