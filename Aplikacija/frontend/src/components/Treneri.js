import '../styles/Treneri.css'
import { useState, useEffect } from 'react'
import KalendarForma from './KalendarForma';
import axios from 'axios'

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
    slika: 'https://www.kangoofitdreamgym.rs/wp-content/uploads/2019/08/68655273_404392670188122_6077563347304185856_n-400x600.jpg'
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
    slika: 'https://www.kangoofitdreamgym.rs/wp-content/uploads/2019/08/68655273_404392670188122_6077563347304185856_n-400x600.jpg'
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
    slika: 'https://www.kangoofitdreamgym.rs/wp-content/uploads/2019/08/68655273_404392670188122_6077563347304185856_n-400x600.jpg'
}]

const Treneri = () => {

    const tre = useEffect(() => {
        const treneri = async () => {
            await fetch("http://localhost:8800/api/korisnik/vidiTrenere").then(p => {
                p.json().then
                    (data => {
                        if (p.ok) {

                            console.log(data)

                            // data.forEach(element => {
                            //     console.log(element)
                            // });

                        }
                        else {
                            console.log("Bad request");
                            throw new Error("Lose ucitao zanrove!");
                        }

                    })

            });
        }
        // //return

        // const treneri = () => {
        //     axios.get("http://localhost:8800/api/korisnik/vidiTrenere").then(data => {
        //         console.log(data)

        //     })
        // }

        treneri()
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
            {treneri.map((tr, i) => (
                <div key={i} className="trener">
                    <div className="divZaSliku">
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

                        {!detalji.state && detalji.id == i && zakazi && <KalendarForma id={i} imeTrenera={tr.ime} prezimeTrenera={tr.prezime} />}

                        {/* {detalji.id !== i && <button className='dugme' id={i} onClick={prikaziVise}>Prikazi vise</button>} */}
                        {vise != i && <button className='dugme' id={i} onClick={prikaziVise}>Prikazi vise</button>}


                        {detalji.id == i && <button className='dugme' onClick={prikaziManje}>Sakrij</button>}
                        {!detalji.state && detalji.id == i && <button className='dugme' onClick={zakaziForma}>Vidi raspored</button>}


                    </div>

                </div>
            ))}

        </div>
    )

}
export default Treneri;