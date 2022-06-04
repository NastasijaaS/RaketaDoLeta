import { useState, useEffect } from 'react'
import { GetData, DeleteMetoda, PutMetoda } from '../../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Box } from '@mui/material';
import '../../styles/input.css'

const TabelaUsluge = () => {

    const [nizUsluga, setUsluge] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [izmeni, setIzmena] = useState(-1)
    const [data, setData] = useState('')

    const [cena, setCena] = useState(0)

    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiUsluge", setUsluge, setGreska, setIsLoading)
    }, [refresh])

    const izmeniUslugu = async (idUsluge) => {

        console.log(idUsluge)
        console.log(cena)

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

    const obrisiUslugu = async (idUsluge) => {

        setCena(-1)
        setIzmena(-1)

        const zahtev = {
            url: 'http://localhost:8800/api/uprava/obrisiUslugu/' + idUsluge
        }

        await DeleteMetoda(zahtev, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')
        }

        // window.location.reload(false);


        setRefresh(!refresh)
    }

    return (
        <div>
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanje</p>}

            <Button
                size="medium"
                variant="outlined"
            >  dodaj novu uslugu
            </Button>

            {nizUsluga.map((usl, i) => (
                <div key={usl._id}>

                    <div>
                        <span>{usl.opis}</span>
                        <input className='cenaUsluge'
                            type='number'
                            value={izmeni === i ? (cena === 0 ? usl.cena : cena) : usl.cena}
                            disabled={izmeni !== i}
                            onChange={(ev) => setCena(ev.target.value)} />
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {izmeniUslugu(usl._id) }}
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
                            onClick={() => obrisiUslugu(usl._id)}
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