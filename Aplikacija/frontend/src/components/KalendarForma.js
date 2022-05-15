import '../styles/kalendar.css'
import { useState } from 'react'
import FormaZakazi from './FormaZakazi'

const termini1 = [{ trajanje: 60, vreme: 17 }, { trajanje: 45, vreme: 18 }]
const termini2 = [{ trajanje: 45, vreme: 13 }, { trajanje: 30, vreme: 19 }]
const t = { trajanje: 45, vreme: 13 }

const nadjiDan = (broj) => {
    let pom = ''
    switch (broj) {
        case 1:
            pom = 'Pon'
            break;
        case 2:
            pom = 'Uto'
            break;
        case 3:
            pom = 'Sre'
            break;
        case 4:
            pom = 'Cet'
            break;
        case 5:
            pom = 'Pet'
            break;
        case 6:
            pom = 'Sub'
            break;

        default:
            pom = 'Ned'
            break;
    }

    return pom
}

const KalendarForma = (props) => {

    const dan = (new Date()).getDay();
    const datum = new Date().getDate();
    const dateOD = new Date()
    let dateDO = new Date()
    dateDO.setDate(dateOD.getDate() + 7)

    const [ter, setTer] = useState([]);
    const [termin, setTermin] = useState(false)
    const [zakazi, setZakazi] = useState(false)

    const prikaziTermine = (ev) => {

        const d = ev.target.id
        let datumTreninga = new Date();
        datumTreninga.setDate(dateOD.getDate() + parseInt(d))

        //salje u bazu

        if (d == 2) {
            setTer(termini1)
        }
        else {
            setTer(termini2)
        }

        setTermin(true)
    }

    const zakaziForma = () => {
        setZakazi(!zakazi)
    }

    return (
        <div className="kalendar">

            <div className='pocetni'>
                {dateOD.toLocaleDateString() + ' - ' + dateDO.toLocaleDateString()}
            </div>

            <div className="dani-u-nedelji">
                <span className='dan'>
                    {nadjiDan(dan)}
                    <button id='0' className='dugmeDatum' onClick={prikaziTermine}>{datum}</button>
                </span>
                <span className='dan'>
                    {nadjiDan((dan + 1) % 7)}
                    <button id='1' className='dugmeDatum' onClick={prikaziTermine}>{datum + 1}</button>
                </span>
                <span className='dan'>
                    {nadjiDan((dan + 2) % 7)}
                    <button id='2' className='dugmeDatum' onClick={prikaziTermine}>{datum + 2}</button>
                </span>
                <span className='dan'>
                    {nadjiDan((dan + 3) % 7)}
                    <button id='3' className='dugmeDatum' onClick={prikaziTermine}>{datum + 3}</button>
                </span>
                <span className='dan'>
                    {nadjiDan((dan + 4) % 7)}
                    <button id='4' className='dugmeDatum' onClick={prikaziTermine}>{datum + 4}</button>
                </span>
                <span className='dan'>
                    {nadjiDan((dan + 5) % 7)}
                    <button id='5' className='dugmeDatum' onClick={prikaziTermine}>{datum + 5}</button>
                </span>
                <span className='dan'>
                    {nadjiDan((dan + 6) % 7)}
                    <button id='6' className='dugmeDatum' onClick={prikaziTermine}>{datum + 6}</button>
                </span>
            </div>

            {termin && <div className='termini'>Slobodni termini: {ter.map((t, i) => (
                <div key={i} className='termin'>
                    <div>
                        Vreme: {t.vreme}
                    </div>
                    <div>
                        Trajanje: {t.trajanje}
                    </div>
                    <button className = 'btnZakazi' onClick={zakaziForma}>Zakazi</button>
                </div>
            ))}
            </div>}

            {zakazi && <FormaZakazi onClose={zakaziForma} idTrenera={props.id}>
                <div>
                    <span>Trener {props.imeTrenera + ' ' + props.prezimeTrenera}</span><br />
                    <span>Datum: </span><br />
                </div>
            </FormaZakazi>}
        </div>
    )

}
export default KalendarForma