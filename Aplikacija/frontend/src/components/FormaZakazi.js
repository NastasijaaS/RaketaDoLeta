import React, { useRef } from "react";
import '../styles/formaZakazi.css'

// kontext koji cuva podatke o prijavljenom korsniku


const tip = [{ naziv: "Gornji deo tela" }, { naziv: "Donji deo tela" }, { naziv: "Kardio" }]
const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h", "1h30min", "2h"]

const FormaZakazi = (props) => {
    //  console.log(props)

    let tipTreninga = ''
    let tr = ''
    let intenzitetTreninga = ''
    let isOnline = false

    const zakaziTrening = (ev) => {

        //datum i vreme -- kroz props
        //tip
        //intenzitet
        //trajanje
        //idtrenera = ovo mi je u props.idTrenera
        //idkorisnika = ovo mozda kroz kontekst gde pamtim ko je ulogovan
        // isOnline


        // const datum = props.datum
        // const vreme = props.vreme
        // const idTrenera = props.idTrenera

        console.log(intenzitetTreninga.value)
        console.log(tipTreninga.value)
        console.log(isOnline)
        console.log(tr.value)

        ev.preventDefault();

    }

    const onlineTrening = (ev) => {
        isOnline = ev.target.checked
    }

    return (
        <form className="formaZakazi" onSubmit={zakaziTrening}>
            <div>
                <label >Tip treninga:</label>
                <select className="opcija" name="tip" id="tip" ref={(input) => tipTreninga = input}>
                    {
                        tip.map((t, i) => (
                            <option key={i} >{t.naziv}</option>
                        ))
                    }
                </select>
            </div>

            <div>
                <label>Trajanje treninga:</label>
                <select className="opcija" name="trajanje" id="trajanje" ref={(input) => tr = input}>
                    {
                        trajanje.map((t, i) => (
                            <option value={t} key={i} >{t}</option>
                        ))
                    }
                </select>
            </div>

            <div>
                <label>Intenzitet treninga:</label>
                <select className="opcija" name="intenzitet" id="intenzitet" ref={(input) => intenzitetTreninga = input}>
                    {
                        intenzitet.map((t, i) => (
                            <option key={i} >{t}</option>
                        ))
                    }
                </select>
            </div>

            <div >
                <input type="checkbox" value='online' name="online" onChange={onlineTrening} />On-line trening
            </div>

            <div>
                <button className="btn" onClick={zakaziTrening}>Potvrdi</button>
                <button className="btn" onClick={props.onClose}>Otkazi</button>
            </div>
        </form>
    )
}



export default FormaZakazi