import { useState, useEffect, useRef } from 'react'
import { GetData, DeleteMetoda, PutMetoda, PostMetoda } from '../../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Box, Modal } from '@mui/material';
import '../../styles/input.css'
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

const TabelaUsluge = () => {
    let navigate = useNavigate()

    const [nizUsluga, setUsluge] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [izmeni, setIzmena] = useState(-1)
    const [data, setData] = useState('')

    const [cena, setCena] = useState(0)

    const [refresh, setRefresh] = useState(false)
    const [novaUsluga, setNovaUsluga] = useState(false)

    const opisUsluge = useRef()
    const cenaUsluge = useRef()

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiUsluge", setUsluge, setGreska, setIsLoading)
    }, [refresh])

    const izmeniUslugu = async (idUsluge) => {
        const zahtev = {
            url: 'http://localhost:8800/api/uprava/izmeniUslugu/' + idUsluge,
            body: {
                cena: cena
            }
        }

        await PutMetoda(zahtev, setData, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')

        }
        setCena(-1)
        setIzmena(-1)
        // window.location.reload(false);
        setRefresh(!refresh)
    }

    const obrisiUslugu = async (idUsluge, opis) => {

        console.log(opis)
        console.log(idUsluge)

        const zahtev = {
            url: 'http://localhost:8800/api/uprava/obrisiUslugu/' + idUsluge
        }

        // console.log('http://localhost:8800/api/uprava/obrisiUslugu/' + idUsluge)
        await DeleteMetoda(zahtev, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')
        }
        setCena(-1)
        setIzmena(-1)
        setRefresh(!refresh)
    }

    const dodajUslugu = async () => {

        if (cenaUsluge.current.value === '' || cenaUsluge.current.value < 0) {
            alert('morate uneti cenu')
            return
        }
        if (opisUsluge.current.value === '') {
            alert('morate uneti naziv')
            return
        }

        const zahtev = {
            url: 'http://localhost:8800/api/uprava/dodajUslugu',
            body: {
                cena: cenaUsluge.current.value,
                opis: opisUsluge.current.value
            }
        }

        await PostMetoda(zahtev, setData, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')

        }
        setCena(-1)
        setIzmena(-1)
        setNovaUsluga(false)
        // window.location.reload(false);
        setRefresh(!refresh)
    }

    return (
        <div>
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanje</p>}



            <Modal
                sx={{ display: 'flex', justifyContent: 'center' }}
                open={novaUsluga}
                onClose={() => setNovaUsluga(false)}>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        m: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        gap: 5,
                        width: '50%'

                    }}
                    Validate
                    autoComplete="off"
                >

                    <TextField
                        inputRef={opisUsluge}
                        label="opis"
                        type="text"
                        color="primary"
                        size="small"
                        focused />

                    <TextField
                        inputRef={cenaUsluge}
                        label="cena"
                        type="number"
                        step='10'
                        color="primary"
                        size="small"
                        focused />

                    <Button size='small' variant="contained" onClick={dodajUslugu}>ok</Button>
                    <Button size='small' variant="contained" onClick={() => setNovaUsluga(false)}>Otkazi</Button>
                </Box>

            </Modal>

            <Button
                size="medium"
                variant="outlined"
                onClick={() => setNovaUsluga(true)}
            >  dodaj novu uslugu
            </Button>

            {nizUsluga.map((usl, i) => (
                <div key={usl._id}>

                    <div>
                        <span>{usl.opis}</span>
                        <input className='cenaUsluge'
                            type='number'
                            step={10}
                            value={izmeni === i ? (cena === 0 ? usl.cena : cena) : usl.cena}
                            disabled={izmeni !== i}
                            onChange={(ev) => setCena(ev.target.value)} />
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => { izmeniUslugu(usl._id) }}
                            disabled={izmeni !== i}
                        > Ok
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => { setCena(usl.cena); setIzmena(-1) }}
                            disabled={izmeni !== i}
                        > Otkazi
                        </Button>

                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                                setCena(usl.cena);
                                setIzmena(i);
                            }}
                            disabled={izmeni === i}
                        > Izmeni
                        </Button>

                        <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => obrisiUslugu(usl._id, usl.opis)}
                            startIcon={<DeleteIcon />}>

                            Obrisi
                        </Button>
                    </div>

                </div>
            ))
            }

        </div >
    )

}
export default TabelaUsluge