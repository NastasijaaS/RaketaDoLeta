import React from "react";
import '../styles/formaZakazi.css'

// kontext koji cuva podatke o prijavljenom korsniku


const tip = [{ naziv: "Gornji deo tela" }, { naziv: "Donji deo tela" }, { naziv: "Kardio" }]
const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h", "1h30min", "2h"]

const FormaZakazi = (props) => {

    const validacija = () => {
        console.log('ssss')
    }

    return (
        <form className="formaZakazi" onSubmit={validacija}>
            <div>
                <label >Tip treninga:</label>
                <select className="opcija" name="tip" id="tip">
                    {
                        tip.map((t, i) => (
                            <option key={i} >{t.naziv}</option>
                        ))
                    }
                </select>
            </div>

            <div>
                <label>Trajanje treninga:</label>
                <select className="opcija" name="trajanje" id="trajanje">
                    {
                        trajanje.map((t, i) => (
                            <option key={i} >{t}</option>
                        ))
                    }
                </select>
            </div>

            <div>
                <label>Intenzitet treninga:</label>
                <select className="opcija" name="intenzitet" id="intenzitet">
                    {
                        intenzitet.map((t, i) => (
                            <option  key={i} >{t}</option>
                        ))
                    }
                </select>
            </div>

            <div >
                <input type="checkbox" value='online' name="online" />On-line trening
            </div>

            <div>
                <button className="btn" onClick={zakaziTrening}>Potvrdi</button>
                <button className="btn" onClick={props.onClose}>Otkazi</button>
            </div>
        </form>
    )
}

const zakaziTrening = () => {
    //tip
    //intenzitet
    //trajanje
    //idtrenera = ovo mi je u props.idTrenera
    //idkorisnika = ovo mozda kroz kontekst gde pamtim ko je ulogovan
    // isOnline
    //broj clanova
}

export default FormaZakazi