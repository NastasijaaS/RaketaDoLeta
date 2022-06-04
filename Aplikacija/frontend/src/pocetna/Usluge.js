import '../styles/usluge.css'
import { useState, useEffect } from 'react'
import { GetData } from '../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';

const Usluge = () => {

    const [nizUsluga, setUsluge] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiUsluge", setUsluge, setGreska, setIsLoading)
    }, [])

    return (
        <div className="sveUsluge">
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanje</p>}

            {nizUsluga.map((usl) => (
                <div key={usl._id} >
                    
                    <div className="usluga">
                        <span className="nazivUsluge">{usl.opis}</span>
                        <span className="cenaUsluge">Cena: {usl.cena}</span>
                    </div>
                    
                </div>
            ))}

        </div >
    )
}

export default Usluge