import '../../styles/usluge.css'
import { useState, useEffect } from 'react'
import Modal from '../komponente/Modal'
import { GetData } from '../komponente/Fetch'
import KalendarForma from '../komponente/KalendarForma';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const Usluge = () => {

    const [nizUsluga, setUsluge] = useState([])
    const [greska, setGreska] = useState(false)
    const [zakazivanje, setZakazivanje] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiUsluge", setUsluge, setGreska, setIsLoading)
    }, [])

    const zakaziGrupniTrening = () => {
        setZakazivanje(true)
    }

    const onClose = () => {
        setZakazivanje(false)
    }

    const [kalendar, setKalendar] = useState(-1)
    const prikaziKalendar = (ev) => {
        setKalendar(ev.target.value)
    }

    return (
        <div className="sveUsluge">
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanje</p>}

            {nizUsluga.map((usl, i) => (
                <div key={usl._id} >
                    
                    <div className="usluga">
                        <span className="nazivUsluge">{usl.opis}</span>
                        <span className="cenaUsluge">Cena: {usl.cena}</span>
                        <span><Button size='small' value={i} onClick={prikaziKalendar}>Zakazi</Button></span>
                    </div>
                    <div className="datumi">
                        {kalendar == i && <div>
                            <Button size='small' onClick={() => { setKalendar(-1) }}>Otkazi</Button>
                            <KalendarForma />
                        </div>
                        }
                    </div>
                </div>
            ))}

            {/* {zakazivanje &&
                // <Modal onClose={onClose}>
                <KalendarForma />

                // </Modal>
            } */}
        </div >
    )
}

export default Usluge