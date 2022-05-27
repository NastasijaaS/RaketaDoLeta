import '../styles/kalendar.css'
import { useState } from 'react'
import FormaZakazi from './FormaZakazi'
import Modal from './Modal'
import LogIn from './LoginForma'
import Register from './RegisterForma'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import DatePicker from 'react-date-picker';


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

const format = (datum) => {
    return datum.getDate() + "." + (+datum.getMonth() + 1) + "." + datum.getFullYear() + "."
}

const KalendarForma = (props) => {

    const dan = (new Date()).getDay();
    const datum = new Date().getDate();
    const dateOD = new Date()
    let dateDO = new Date()
    dateDO.setDate(dateOD.getDate() + 7)

    const [ter, setTer] = useState([]);
    const [termin, setTermin] = useState({ status: false, datum: '', vreme: '', trajanje: '' })
    const [zakazi, setZakazi] = useState(false)
    const [login, setLogin] = useState(true)

    const { user } = useContext(UserContext);

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

        setTermin({ status: true, datum: { datumTreninga } })
    }

    const zakaziForma = (ev) => {
        //  console.log(ev.target.value)
        const sat = ev.target.value

        const [vreme, trajanje] = sat.split(' ')

        setZakazi(!zakazi)

        setTermin(termin => ({ ...termin, vreme: { vreme }, trajanje: { trajanje } }));

        //  console.log(termin)
    }

    const Day = (props) => {

        let pomDatum = new Date()
        pomDatum.setDate(new Date().getDate() + parseInt(props.broj))
        // console.log(pomDatum.getDate())

        return (<span className='dan' id={props.broj} >
            {nadjiDan((dan + props.broj) % 7)}
            <button className='dugmeDatum' >{pomDatum.getDate()}</button>
        </span>)
    }


    return (
        <div className="kalendar">

            <div className='pocetni'>
                {format(dateOD) + ' - ' + format(dateDO)}
            </div>

            <div onClick={prikaziTermine} className="dani-u-nedelji">

                <Day broj={0} />
                <Day broj={1} />
                <Day broj={2} />
                <Day broj={3} />
                <Day broj={4} />
                <Day broj={5} />
                <Day broj={6} />


            </div>

            {termin.status && <div className='termini'>
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
                            <button className='btnZakazi' value={t.vreme + " " + t.trajanje} onClick={zakaziForma}>Zakazi</button>
                        </div>
                    ))}
            </div>}

            {
                zakazi && !user && <Modal onClose={zakaziForma}>

                    {login && <div><LogIn />
                        <span>Nemate nalog:
                            <button onClick={() => { setLogin(false) }}>Registruj se</button>
                        </span>
                    </div>}

                    {!login && <div><Register />
                        <span>Imate nalog:
                            <button onClick={() => { setLogin(true) }}>Prijavi se</button>
                        </span>
                    </div>}

                </Modal>
            }

            {
                zakazi && user && <Modal onClose={zakaziForma}>
                    <div>
                        <span>Trener {props.imeTrenera + ' ' + props.prezimeTrenera}</span><br />
                        <span>Datum: </span><br />
                    </div>
                    <FormaZakazi vreme={termin.vreme}
                        trajanje={termin.trajanje}
                        datum={termin.datum}
                        onClose={zakaziForma}
                        idTrenera={props.id} />
                </Modal>
            }

        </div >
    )

}
export default KalendarForma