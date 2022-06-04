import React, { useContext } from "react";
import '../styles/formaZakazi.css'
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Button from "@mui/material/Button";


const tip = [{ naziv: "Gornji deo tela" }, { naziv: "Donji deo tela" }, { naziv: "Kardio" }]
const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h", "1h30min", "2h"]

const FormaZakazi = (props) => {
    //  console.log(props)
    const { user } = useContext(UserContext);

    let tipTreninga = ''
    let tr = ''
    let intenzitetTreninga = ''
    let isOnline = false

    const zakaziTrening = (ev) => {

        // da li je personalni ili grupni 


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
        console.log(props.datum.datumTreninga)



        axios.post('http://localhost:8800/api/korisnik/zakaziPersonalniTrening/' + user.korisnikId, {
            // trenerId: props.idTrenera,
            trenerId: "6273e6c7c1e2c23c29c8c1ba",
            datum: props.datum.datumTreninga,
            tip: tipTreninga.value,
            intenzitet: intenzitetTreninga.value,
            trajanje: tr.value,
        }).then((p) => {
            if (p.status === 200) {
                console.log(p)
                alert('Uspesno zakazan trening')
            }
        }).catch((error) => {
            if (error.response.status)
                alert(error.response.data)
            else
                alert('Doslo je do greske')
        });


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
                <Button size='small' variant="outlined" className="btn" onClick={zakaziTrening}>Potvrdi</Button>
                <Button size='small' variant="outlined" className="btn" onClick={props.onClose}>Otkazi</Button>
            </div>
        </form>
    )
}



export default FormaZakazi