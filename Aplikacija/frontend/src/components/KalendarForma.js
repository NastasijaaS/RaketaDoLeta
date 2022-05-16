import '../styles/kalendar.css'
import { useState } from 'react'
import FormaZakazi from './FormaZakazi'
import Modal from './Modal'

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

            <div onClick={prikaziTermine} className="dani-u-nedelji">
                <span className='dan' id='0' >
                    {nadjiDan(dan)}
                    <button className='dugmeDatum' >{datum}</button>
                </span>
                <span className='dan' id='1' >
                    {nadjiDan((dan + 1) % 7)}
                    <button className='dugmeDatum' >{datum + 1}</button>
                </span>
                <span className='dan' id='2' >
                    {nadjiDan((dan + 2) % 7)}
                    <button className='dugmeDatum' >{datum + 2}</button>
                </span>
                <span className='dan' id='3' >
                    {nadjiDan((dan + 3) % 7)}
                    <button className='dugmeDatum' >{datum + 3}</button>
                </span>
                <span className='dan' id='4' >
                    {nadjiDan((dan + 4) % 7)}
                    <button className='dugmeDatum' >{datum + 4}</button>
                </span>
                <span className='dan' id='5' >
                    {nadjiDan((dan + 5) % 7)}
                    <button className='dugmeDatum' >{datum + 5}</button>
                </span>
                <span className='dan' id='6' >
                    {nadjiDan((dan + 6) % 7)}
                    <button className='dugmeDatum' >{datum + 6}</button>
                </span>
            </div>

            {termin && <div className='termini'>
                <div className='trTermini'>
                    <span>Termin</span>
                    <span>Trajanje</span>
                    <span className='nevidljiviSpan'>Zakazite</span>
                </div>
                {
                    ter.map((t, i) => (
                        <div key={i} className='termin'>
                            <div>
                               {t.vreme} :00h
                            </div>
                            <div>
                                {t.trajanje} min
                            </div>
                            <button className='btnZakazi' onClick={zakaziForma}>Zakazi</button>
                        </div>
                    ))}
            </div>}

            {zakazi && <Modal>
                <div>
                    <span>Trener {props.imeTrenera + ' ' + props.prezimeTrenera}</span><br />
                    <span>Datum: </span><br />
                </div>
                <FormaZakazi onClose={zakaziForma} idTrenera={props.id} />
            </Modal>}
        </div>
    )

}
export default KalendarForma