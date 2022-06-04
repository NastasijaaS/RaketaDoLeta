import { useState, useEffect, useRef, Fragment } from 'react'
import { GetData, DeleteMetoda, PutMetoda, PostMetoda } from '../../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Box, Modal, Typography } from '@mui/material';
import '../../styles/input.css'
import { useNavigate } from "react-router-dom";

const TabelaUsluge = () => {
    let navigate = useNavigate()

    const [nizUsluga, setUsluge] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [izmeni, setIzmena] = useState(-1)
    const [data, setData] = useState('')

    const [cena, setCena] = useState(0)
    const [opis, setOpis] = useState('')

    const [refresh, setRefresh] = useState(false)
    const [novaUsluga, setNovaUsluga] = useState(false)

    const opisUsluge = useRef()
    const cenaUsluge = useRef()
    const nazivUsluge = useRef()

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiUsluge", setUsluge, setGreska, setIsLoading)
    }, [refresh])

    const izmeniUslugu = async (idUsluge) => {
        const zahtev = {
            url: 'http://localhost:8800/api/uprava/izmeniUslugu/' + idUsluge,
            body: {
                cena: cena,
                opis: opis
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

        if (nazivUsluge.current.value === '') {
            alert('morate uneti naziv')
            return
        }
        if (cenaUsluge.current.value === '' || cenaUsluge.current.value < 0) {
            alert('morate uneti cenu')
            return
        }

        const zahtev = {
            url: 'http://localhost:8800/api/uprava/dodajUslugu',
            body: {
                naziv: nazivUsluge.current.value,
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
        <div style={{ width: '100%' }}>
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanje</p>}

            <Modal
                sx={{ display: 'flex', justifyContent: 'center' }}
                open={novaUsluga}
                onClose={() => setNovaUsluga(false)}>

                <Box
                    component="form"
                    sx={{
                        // '& .MuiTextField-root': { m: 1, width: '80%' },
                        m: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        gap: 1,
                        width: '50%',
                        borderRadius: '12px'
                    }}
                    Validate
                    autoComplete="off"
                >

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
                        sx={{ alignSelf: 'center' }}
                        inputRef={cenaUsluge}
                        label="cena"
                        type="number"
                        step='10'
                        color="primary"
                        size="small"
                        focused />

                    <div style={{ alignSelf: 'center' }}>
                        <Button sx={{ margin: 4 }} size='small' variant="contained" onClick={dodajUslugu}>ok</Button>
                        <Button sx={{ margin: 4 }} size='small' variant="contained" onClick={() => setNovaUsluga(false)}>Otkazi</Button>
                    </div>
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
                    <span style={{ width: '200px', margin: 0 }}>{usl.naziv}</span>

                    <input className='cenaUsluge'
                        type='number'
                        step={10}
                        value={izmeni === i ? (cena === 0 ? usl.cena : cena) : usl.cena}
                        disabled={izmeni !== i}
                        onChange={(ev) => setCena(ev.target.value)} />

                    {izmeni === i && <TextField
                        sx={{ alignSelf: 'center', m: 1, width: '80%' }}
                        label="opis"
                        multiline
                        rows={5}
                        color="primary"
                        inputRef={opisUsluge}
                        // defaultValue={usl.opis}
                        value={opis}
                        onChange={(ev) => setOpis(ev.target.value)}
                        variant="standard"
                        focused
                    />}

                    {izmeni === i &&
                        <Fragment>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => { izmeniUslugu(usl._id) }}
                            // disabled={izmeni !== i}
                            > Ok
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => { setCena(usl.cena); setIzmena(-1); setOpis(usl.opis) }}
                            // disabled={izmeni !== i}
                            > Otkazi
                            </Button>
                        </Fragment>
                    }
                    {izmeni !== i &&
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                                setCena(usl.cena);
                                setOpis(usl.opis)
                                setIzmena(i);
                            }}
                        // disabled={izmeni === i}
                        > Izmeni
                        </Button>
                    }

                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => obrisiUslugu(usl._id, usl.opis)}
                        startIcon={<DeleteIcon />}>

                        Obrisi
                    </Button>


                </div>
            ))
            }

        </div >
    )

}
export default TabelaUsluge