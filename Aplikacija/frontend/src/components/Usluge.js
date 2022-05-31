import '../styles/usluge.css'
import { useState, useEffect } from 'react'
import Modal from './Modal'
import { GetData } from './Fetch'

const Usluge = () => {

    const [nizUsluga, setUsluge] = useState([])
    const [greska, setGreska] = useState(false)
    const [zakazivanje, setZakazivanje] = useState(false)

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiUsluge", setUsluge, setGreska)
    }, [])

    const zakaziGrupniTrening = () => {
        setZakazivanje(true)
    }

    const onClose = () => {
        setZakazivanje(false)
    }

    return (
        <div className="sveUsluge">

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanje</p>}

            {nizUsluga.map((usl, i) => (
                <div key={i} className="usluga">
                    <span className="nazivUsluge">{usl.opis}</span>
                    <span className="cenaUsluge">Cena: {usl.cena}</span>
                    <span><button onClick={zakaziGrupniTrening}>Zakazi</button></span>
                </div>
            ))}

            {zakazivanje && <Modal onClose={onClose}>
            </Modal>}
        </div >
    )
}

export default Usluge