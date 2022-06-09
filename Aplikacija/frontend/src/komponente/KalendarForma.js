import '../styles/kalendar.css'
import { useState } from 'react'
import FormaZakazi from './FormaZakazi'
import Modal from './Modal'
import LogIn from '../pocetna/LoginForma'
import Register from '../pocetna/RegisterForma'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Button from '@mui/material/Button';
import { Box } from '@mui/material'
import { GetData } from './Fetch'
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


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

    //  console.log(props.idUsluge)

    const dan = (new Date()).getDay();
    // const datum = new Date().getDate();
    const dateOD = new Date()
    let dateDO = new Date()
    dateDO.setDate(dateOD.getDate() + 7)

    const [ter, setTer] = useState([]);
    const [termin, setTermin] = useState({ status: false, datum: '', vreme: '', trajanje: '' })
    const [zakazi, setZakazi] = useState(false)
    const [login, setLogin] = useState(true)

    const { user } = useContext(UserContext);

    const [termini, setTermini] = useState('')
    const [greska, setGreska] = useState(false)
    const [loading, setIsLoading] = useState(false)


    //ovo mi cita iz baze
    const prikaziTermine = async (ev) => {
        // handleChange(ev, ev.target.value)

        // console.log(ev.target)

        const d = ev.target.id
        let datumTreninga = new Date();
        datumTreninga.setDate(dateOD.getDate() + parseInt(d))

        const idUsluge = props.idUsluge

        // console.log(props.idUsluge)
        //  console.log('datum treninga ' + datumTreninga.toISOString())

        const datumProba = new Date('2022-07-30')

        const datumZaSlanje = datumProba.toISOString()

        //  console.log('json  ' + datumZaSlanje)

        // await GetData(`http://localhost:8800/api/korisnik/vidiGrupneTreninge/${idUsluge}/${datumZaSlanje}`, setTermini, setGreska, setIsLoading)

        if (d == 2) {
            setTer(termini1)
        }
        else {
            setTer(termini2)
        }

        //termine iz baze da ucitam
        //   console.log(termini)
        setTermin({ status: true, datum: { datumTreninga } })
    }

    const zakaziForma = (ev) => {

        //sta je ovo ???

        // console.log(ev.target.value)
        const sat = ev.target.value

        const [vreme, trajanje] = sat.split(' ')

        setZakazi(!zakazi)

        setTermin(termin => ({ ...termin, vreme: { vreme }, trajanje: { trajanje } }));

        //  console.log(termin)
    }

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        // console.log('handle ' + newValue)
        // console.log(event.target)
        setValue(parseInt(event.target.id) - 1);
    };

    const Day = (props) => {

        let pomDatum = new Date()
        pomDatum.setDate(new Date().getDate() + parseInt(props.broj))

        return (
            <Tab
                sx={{ minHeight: { xs: 10, sm: 50 }, }}
                onClick={prikaziTermine}
                id={props.broj}
                label=
                {nadjiDan((dan + props.broj) % 7) + ' ' + pomDatum.getDate()}
                tabIndex={props.broj}
                onChange={handleChange}
            />
        )
    }

    let datumi = []

    for (let i = 1; i < 15; i++) {
        datumi.push(
            <Day key={i} broj={i} />
        )
    }
    // console.log(datumi)

    let daysinmonth = datumi.map((d, i) => {
        return d;
    });

    return (
        <div className="kalendar">
            <div className="dani-u-nedelji">
                <Box
                    sx={{
                        flexGrow: 1,
                        maxWidth: { xs: 320, sm: 700 },
                        bgcolor: 'background.paper',

                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: {
                                '&.Mui-disabled': { opacity: 0.3 },
                            },
                        }}
                    >
                        {daysinmonth}
                    </Tabs>
                </Box>

            </div>

            {termin.status && <div className='termini'>
                <div className='trTermini'>
                    <span>Trener</span>
                    <span>Vrene</span>
                    <span>Trajanje</span>
                    <span>Intenzitet</span>
                    <span>Broj slobodnih mesta</span>
                    <span className='nevidljiviSpan'>Zakazite</span>
                </div>

                {
                    ter.map((t, i) => (
                        <Box key={i} fullWidth className='termin'>
                            <div>
                                {t.trener}
                            </div>
                            <div>
                                {t.vreme} :00h
                            </div>
                            <div>
                                {t.trajanje} min
                            </div>
                            <div>
                                {t.intenzitet}
                            </div>
                            <div>
                                {t.brojSlobodnihMesta}
                            </div>

                            <Button
                                size="small"
                                variant="contained"
                                value={t.vreme + " " + t.trajanje}
                                onClick={zakaziForma}>Zakazi</Button>

                        </Box>
                    ))}
            </div>}

            {
                zakazi && !user && <Modal onClose={zakaziForma}>

                    {login && <div><LogIn />
                        <span>Nemate nalog:
                            <Button size='small' onClick={() => { setLogin(false) }}>Registruj se</Button>
                        </span>
                    </div>}

                    {!login && <div><Register />
                        <span>Imate nalog:
                            <Button size='small' onClick={() => { setLogin(true) }}>Prijavi se</Button>
                        </span>
                    </div>}

                </Modal>
            }

            {
                zakazi && user &&
                <Modal onClose={zakaziForma}>
                    <div>
                        {/* <span>Trener {props.imeTrenera + ' ' + props.prezimeTrenera}</span><br />
                        <span>Datum: </span><br /> */}
                        <p>naslov koji saljem</p>
                    </div>
                    <FormaZakazi vreme={termin.vreme}
                        trajanje={termin.trajanje}
                        datum={termin.datum}
                        onClose={zakaziForma}
                    // idTrenera={props.id} 
                    />
                </Modal>
            }

        </div >
    )

}
export default KalendarForma