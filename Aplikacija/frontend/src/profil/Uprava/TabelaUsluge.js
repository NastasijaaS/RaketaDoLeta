import { useState, useEffect, useRef, Fragment } from 'react'
import { GetData, DeleteMetoda, PutMetoda, PostMetoda } from '../../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Box, Checkbox, FormControlLabel } from '@mui/material';
import '../../styles/input.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Modal from '../../komponente/Modal';
import useAxiosPrivate from '../../api/useAxiosPrivate';

const TabelaUsluge = () => {

    const axiosPrivate = useAxiosPrivate()

    const [nizUsluga, setUsluge] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [izmeni, setIzmena] = useState(-1)
    const [data, setData] = useState('')

    //ovo je za izmenu
    const [cena, setCena] = useState(-1)
    const [opis, setOpis] = useState('')
    const [trajanje, setTrajanje] = useState(-1)

    const [refresh, setRefresh] = useState(false)
    const [novaUsluga, setNovaUsluga] = useState(false)

    let grupniTrening = false
    //ovo je za unos
    const opisUsluge = useRef()
    const cenaUsluge = useRef()
    const nazivUsluge = useRef()
    const trajanjeUsluge = useRef()

    useEffect(() => {

        //  GetData("http://localhost:8800/api/usluga/vidiUsluge", setUsluge, setGreska, setIsLoading)

        const get = async () => {
            setIsLoading(true)
            try {
                const res = await axiosPrivate.get("http://localhost:8800/api/usluga/vidiUsluge")
                if (res.data) {
                    setUsluge(res.data)
                }
                setIsLoading(false)

            } catch (err) {
                setIsLoading(false)
                alert('Doslo je do greske')
            }
        }
        get()
    }, [refresh])

    const izmeniUslugu = async (idUsluge) => {
        const zahtev = {
            url: 'http://localhost:8800/api/usluga/izmeniUslugu/' + idUsluge,
            body: {
                cena: cena,
                opis: opis,
                trajanje: trajanje
            }
        }

        // PutMetoda(zahtev, setData, setGreska, setIsLoading)

        try {
            await axiosPrivate.put(zahtev.url, zahtev.body)
        } catch (err) {
            alert('Doslo je do greske')
        }

        // if (greska !== false) {
        //     alert('doslo je do greske')
        // }
        setCena(-1)
        setIzmena(-1)
        setTrajanje(-1)
        // window.location.reload(false);
        setRefresh(!refresh)
    }

    const obrisiUslugu = async (idUsluge, opis) => {

        // console.log(opis)
        // console.log(idUsluge)

        const zahtev = {
            url: 'http://localhost:8800/api/usluga/obrisiUslugu/' + idUsluge
        }

        // console.log('http://localhost:8800/api/uprava/obrisiUslugu/' + idUsluge)
        //   DeleteMetoda(zahtev, setGreska, setIsLoading)
        try {
            await axiosPrivate.delete(zahtev.url)

        } catch (err) {
            alert('Doslo je do greske')
        }

        // if (greska !== false) {
        //     alert('doslo je do greske')
        // }
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
            url: 'http://localhost:8800/api/usluga/dodajUslugu',
            body: {
                naziv: nazivUsluge.current.value,
                cena: cenaUsluge.current.value,
                opis: opisUsluge.current.value,
                trajanje: trajanjeUsluge.current.value,
                treningGrupni: grupniTrening
            }
        }

        // PostMetoda(zahtev, setData, setGreska, setIsLoading)

        try {
            await axiosPrivate.post(zahtev.url, zahtev.body)
           
        } catch (err) {
            alert('Doslo je do greske')
        }

        // if (greska !== false) {
        //     alert('doslo je do greske')

        // }
        setCena(-1)
        setIzmena(-1)
        setNovaUsluga(false)
        // window.location.reload(false);
        setRefresh(!refresh)
    }

    const FormaDodajUslugu = () => {
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
                    onChange={(ev) => { grupniTrening = ev.target.checked }}
                    control={<Checkbox color="primary" />}
                    label="Grupni trening"
                    labelPlacement="start"
                    color="primary"
                />

                <div style={{ alignSelf: 'center' }}>
                    <Button sx={{ margin: 4 }} size='small' variant="contained" onClick={dodajUslugu}>ok</Button>
                    <Button sx={{ margin: 4 }} size='small' variant="contained" onClick={() => setNovaUsluga(false)}>Otkazi</Button>
                </div>
            </Box>
        )
    }


    return (
        <Box style={{ width: '100%' }}>
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanje</p>}


            {novaUsluga
                &&
                <Modal onClose={() => setNovaUsluga(false)}>
                    <FormaDodajUslugu />
                </Modal>
            }


            <Button
                size="medium"
                variant="outlined"
                onClick={() => setNovaUsluga(true)}
            >  dodaj novu uslugu
            </Button>

            <TableContainer>
                <Table>
                    <TableBody>
                        {nizUsluga.map((usl, i) => (

                            <Fragment key={usl._id}>
                                <TableRow key={usl._id} style={{ padding: 1 }}>

                                    <TableCell style={{ margin: 0, width: 70 }}>{usl.naziv}</TableCell>
                                    {/* <span style={{ width: '200px', margin: 0 }}>{usl.naziv}</span> */}

                                    <TableCell style={{ width: 70, padding: 1 }}>
                                        <input className='cenaUsluge'
                                            type='number'
                                            step={10}
                                            value={izmeni === i ? (cena === 0 ? usl.cena : cena) : usl.cena}
                                            disabled={izmeni !== i}
                                            onChange={(ev) => setCena(ev.target.value)} />
                                    </TableCell>


                                    {/* <TextField
                        sx={{
                            alignSelf: 'center',
                            '&:disabled': {
                                color: 'red',
                                backgroundColor: 'red',
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.inputRoot,
                                disabled: classes.disabled
                            }
                        }}
                        className='cenaUsluge'
                        size='small'
                        type='number'
                        step={10}
                        value={izmeni === i ? (cena === 0 ? usl.cena : cena) : usl.cena}
                        disabled={izmeni !== i}
                        onChange={(ev) => setCena(ev.target.value)}
                        focused
                    /> */}

                                    <TableCell style={{ width: 70, padding: 1 }}>
                                        <input
                                            style={{ color: 'black' }}
                                            className='cenaUsluge'
                                            type='number'
                                            step={10}
                                            value={izmeni === i ? (trajanje === 0 ? usl.trajanje : trajanje) : usl.trajanje}
                                            disabled={izmeni !== i}
                                            onChange={(ev) => setTrajanje(ev.target.value)} />
                                    </TableCell>


                                    {izmeni !== i &&
                                        <TableCell>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                    setCena(usl.cena);
                                                    setOpis(usl.opis)
                                                    setTrajanje(usl.trajanje)
                                                    setIzmena(i);
                                                }}
                                            // disabled={izmeni === i}
                                            > Izmeni
                                            </Button>
                                        </TableCell>
                                    }
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => obrisiUslugu(usl._id, usl.opis)}
                                            startIcon={<DeleteIcon />}
                                        >
                                            Obrisi
                                        </Button>
                                    </TableCell>
                                    {/* </div> */}
                                </TableRow>

                                {izmeni === i && <TableRow style={{ alignItems: 'center', boxSizing: 400 }}>

                                    <TextField
                                        style={{ width: 400, alignSelf: 'center' }}
                                        sx={{ alignSelf: 'center', m: 1, width: '100%' }}
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
                                    />


                                    <TableCell style={{ width: 100, padding: 2 }}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => { izmeniUslugu(usl._id) }}
                                        // disabled={izmeni !== i}
                                        > Ok
                                        </Button>
                                    </TableCell>
                                    <TableCell style={{ width: 100, padding: 2 }}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => { setCena(usl.cena); setIzmena(-1); setOpis(usl.opis); setTrajanje(usl.trajanje) }}
                                        // disabled={izmeni !== i}
                                        > Otkazi
                                        </Button>
                                    </TableCell>

                                </TableRow>}
                            </Fragment>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

}
export default TabelaUsluge