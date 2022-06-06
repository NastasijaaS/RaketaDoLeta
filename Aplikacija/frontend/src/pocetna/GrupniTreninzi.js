import '../styles/usluge.css'
import { useState, useEffect } from 'react'
import { GetData } from '../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';

const GrupniTreninzi = () => {
    const [treninzi, setTreninzi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiGrupneTreninge", setTreninzi, setGreska, setIsLoading)
    }, [])

    return (
        <div className="sveUsluge">
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanja</p>}

            {treninzi.map((tr) => (
                <div key={tr._id} >

                    <div className="usluga">
                        <span className="nazivUsluge">{tr.nazivGrupnogTreninga}</span>
                        <span className="cenaUsluge">{tr.datum}</span> 
                    </div>

                </div>
            ))}

        </div >
    )
}
export default GrupniTreninzi