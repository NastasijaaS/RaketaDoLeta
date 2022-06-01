import '../../styles/Treneri.css'
import { useState, useEffect } from 'react'
import KalendarForma from '../komponente/KalendarForma';
import { GetData } from '../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';

const treneri = [{
    id: 5,
    ime: 'mika',
    prezime: 'mikic',
    sertifikati: [{
        naziv: 'jedan'
    },
    {
        naziv: 'dva'
    }],
    opis: 'neki opis o treneru',
    slika: 'https://media.istockphoto.com/photos/portrait-of-a-beautiful-woman-at-the-gym-picture-id856797530?k=20&m=856797530&s=612x612&w=0&h=kFFhoXpDoF6jCmerJe-cZzOMKRvpl2orilNip2t3McU='
},
{
    id: 5,
    ime: 'mika',
    prezime: 'mikic',
    sertifikati: [{
        naziv: 'jedan'
    },
    {
        naziv: 'dva'
    }],
    opis: 'neki opis o treneru',
    slika: 'https://media.istockphoto.com/photos/portrait-of-a-beautiful-woman-at-the-gym-picture-id856797530?k=20&m=856797530&s=612x612&w=0&h=kFFhoXpDoF6jCmerJe-cZzOMKRvpl2orilNip2t3McU='
},
{
    id: 5,
    ime: 'mika',
    prezime: 'mikic',
    sertifikati: [{
        naziv: 'jedan'
    },
    {
        naziv: 'dva'
    }],
    opis: 'neki opis o treneru',
    slika: 'https://media.istockphoto.com/photos/portrait-of-a-beautiful-woman-at-the-gym-picture-id856797530?k=20&m=856797530&s=612x612&w=0&h=kFFhoXpDoF6jCmerJe-cZzOMKRvpl2orilNip2t3McU='
}]

const Treneri = () => {

    const [sviTreneri, setTreneri] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiTrenere", setTreneri, setGreska, setIsLoading)

    }, [])

    const [detalji, setDetalji] = useState({ id: -1, state: true });
    const [zakazi, setZakazi] = useState(false);
    const [vise, setVise] = useState(-1);

    const prikaziVise = (ev) => {
        setDetalji({ id: ev.target.id, state: false });
        setVise(ev.target.id)
        setZakazi(false)
    }

    const prikaziManje = (ev) => {
        setDetalji({ id: -1, state: true });
        setVise(-1)
        setZakazi(false)
    }

    const zakaziForma = (ev) => {
        setZakazi(true)
    }

    return (
        <div className="treneri">
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {treneri.map((tr, i) => (
                <div key={i} className="trener">
                    <div className="divZaSliku" >
                        <img src={tr.slika} />
                    </div>
                    <div id={i} className="divZaOpis">
                        <h3 className='ime'>{tr.ime} {tr.prezime}</h3>

                        <p>Sertifikovan za: {
                            tr.sertifikati.map((s, i) => (
                                <span key={i}>{s.naziv} </span>
                            ))
                        } </p>

                        {!detalji.state && detalji.id == i && <p>{tr.opis}</p>}

                        {/* {!detalji.state && detalji.id == i && zakazi && 
                            <KalendarForma id={i} imeTrenera={tr.ime} prezimeTrenera={tr.prezime} />} */}

                        {/* {detalji.id !== i && <button className='dugme' id={i} onClick={prikaziVise}>Prikazi vise</button>} */}
                        {vise != i && <button className='dugme' id={i} onClick={prikaziVise}>Prikazi vise</button>}

                        {detalji.id == i && <button className='dugme' onClick={prikaziManje}>Sakrij</button>}
                        {/* {!detalji.state && detalji.id == i && !zakazi && <button className='dugme' onClick={zakaziForma}>Vidi raspored</button>} */}

                    </div>

                </div>
            ))}

        </div>
    )

}
export default Treneri;