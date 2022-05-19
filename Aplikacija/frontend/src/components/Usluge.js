import '../styles/usluge.css'
import { useState, useEffect } from 'react'
import Modal from './Modal'

//naziv
//opis
//cena
// const nizUsluga = [{ naziv: 'naziv', opis: 'opis dugacak0', cena: 222 },
// { naziv: 'naziv', opis: 'opis dugacak0', cena: 222 },
// { naziv: 'naziv', opis: 'opis dugacak0', cena: 222 }];

const Usluge = () => {


    const [nizUsluga, setUsluge] = useState([])
    const [greska, setGreska] = useState(false)
    const [zakazivanje, setZakazivanje] = useState(false)

    useEffect(() => {
        const usluge = async () => {
            await fetch("http://localhost:8800/api/korisnik/vidiUsluge")
                .then(p => {
                    p.json()
                        .then(data => {
                            const pomUsluge = []
                            if (p.ok) {

                                data.forEach(element => {
                                    pomUsluge.push(element)
                                    // console.log(element)
                                });

                                setUsluge(pomUsluge)
                            }
                            else {
                                console.log("Bad request");
                                setGreska(true)
                                throw new Error("Lose ucitao usluge!");
                            }

                        })

                }).catch(error => {
                    console.log(error)
                    setGreska(true)
                });
        }

        usluge()

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