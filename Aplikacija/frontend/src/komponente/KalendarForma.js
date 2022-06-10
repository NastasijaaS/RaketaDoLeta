import '../styles/kalendar.css'
import { useState } from 'react'
import FormaZakazi from './FormaZakazi'
import Modal from './Modal'
import LogIn from '../pocetna/LoginForma'
import Register from '../pocetna/RegisterForma'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
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

    const [termini, setTermini] = useState([])
    const [greska, setGreska] = useState(false)
    const [loading, setIsLoading] = useState(false)


    //ovo mi cita iz baze
    const prikaziTermine = async (ev) => {
        // handleChange(ev, ev.target.value)

        // console.log(ev.target)

        const d = ev.target.id
        let datumTreninga = new Date();
        // datumTreninga.setDate(dateOD.getDate() + parseInt(d))

        console.log(d)

        const idUsluge = props.idUsluge

        // console.log(props.idUsluge)
        //  console.log('datum treninga ' + datumTreninga.toISOString())

        const datumProba = new Date(d)

        const datumZaSlanje = datumProba.toISOString()

        //  console.log('json  ' + datumZaSlanje)

        if (props.idUsluge) {

            await GetData(`http://localhost:8800/api/korisnik/vidiGrupneTreninge/${idUsluge}/${datumZaSlanje}`, setTermini, setGreska, setIsLoading)
        }
        else {
            await GetData(`http://localhost:8800/api/termin/vratiZauzeteTermineZaTreneraPoDatumu/${props.idTrenera}/${datumZaSlanje}`, setTermini, setGreska, setIsLoading)
        }
        // if (d == 2) {
        //     setTer(termini1)
        // }
        // else {
        //     setTer(termini2)
        // }

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
        //console.log(event.target.tabIndex)
        setValue(parseInt(event.target.tabIndex) - 1);
    };

    const Day = (props) => {

        let pomDatum = new Date()
        pomDatum.setDate(new Date().getDate() + parseInt(props.broj))

        return (
            <Tab
                sx={{ minHeight: { xs: 10, sm: 50 }, }}
                onClick={prikaziTermine}
                id={pomDatum.toDateString()}
                value={props.broj}
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
        <Box className="cardCenter">
            <Box>
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

            </Box>

            {termin.status &&

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Trener</TableCell>
                                <TableCell align="right">Vreme</TableCell>
                                <TableCell align="right">Trajanje</TableCell>
                                <TableCell align="right">Intenzitet</TableCell>
                                <TableCell align="right">Mesta</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {termini.map((t, i) => (
                                <TableRow
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {t.imeT} {t.prezimeT}
                                    </TableCell>
                                    <TableCell align="right"> {t.vreme}</TableCell>
                                    <TableCell align="right">{t.trajanje}</TableCell>
                                    <TableCell align="right">{t.intenzitet}</TableCell>
                                    <TableCell align="right"> {t.brojslobodnih}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            value={t.vreme + " " + t.trajanje}
                                            onClick={zakaziForma}>Zakazi
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }

            {/* // <Box xs = {{width: '100%'}}>
            //     <Grid container >
            //         <Grid item xs = {2}>
            //             <Typography component = "div" variant = "body1">Trener</Typography>
            //         </Grid>
            //         <Grid item xs = {2}>
            //         <Typography component = "div" variant = "body1">Vreme</Typography>
            //         </Grid>
            //         <Grid item xs = {2}>
            //         <Typography component = "div" variant = "body1">Trajanje</Typography>
            //         </Grid>
            //         <Grid item xs = {2}>
            //         <Typography component = "div" variant = "body1">Intenzitet</Typography>

            //         </Grid>
            //         <Grid item xs = {2}>
            //         <Typography component = "div" variant = "body1">Broj slobodnih mesta</Typography>

            //         </Grid>
            //         <Grid item xs = {2}>
            //         <Typography component = "div" variant = "body1" className='nevidljiviSpan'>Zakazite</Typography>

            //         </Grid>
            //     </Grid>
            //     {
            //         termini.map((t, i) => (
            //             <Box key={i} fullWidth className='termin'>
            //                 <Typography component = "div" variant = "body2">
            //                     {t.imeT} {t.prezimeT}
            //                 </Typography>
            //                 <Typography component = "div" variant = "body2">
            //                     {t.vreme}
            //                 </Typography>
            //                 <Typography component = "div" variant = "body2">
            //                     {t.trajanje}
            //                 </Typography>
            //                 <Typography component = "div" variant = "body2">
            //                     {t.intenzitet}
            //                 </Typography>
            //                 <Typography component = "div" variant = "body2">
            //                     {t.brojslobodnih}
            //                 </Typography>

            //                 <Button
            //                     size="small"
            //                     variant="contained"
            //                     value={t.vreme + " " + t.trajanje}
            //                     onClick={zakaziForma}>Zakazi</Button>

            //             </Box>
            //         ))}

            // </Box>} */}


            {
                zakazi && !user && <Modal onClose={zakaziForma}>

                    {login && <Box><LogIn />
                        <span>Nemate nalog:
                            <Button size='small' onClick={() => { setLogin(false) }}>Registruj se</Button>
                        </span>
                    </Box>}

                    {!login && <Box><Register />
                        <span>Imate nalog:
                            <Button size='small' onClick={() => { setLogin(true) }}>Prijavi se</Button>
                        </span>
                    </Box>}

                </Modal>
            }

            {
                zakazi && user &&
                <Modal onClose={zakaziForma}>
                    <Box>
                        {/* <span>Trener {props.imeTrenera + ' ' + props.prezimeTrenera}</span><br />
                        <span>Datum: </span><br /> */}
                        <p>naslov koji saljem</p>
                    </Box>
                    <FormaZakazi vreme={termin.vreme}
                        trajanje={termin.trajanje}
                        datum={termin.datum}
                        onClose={zakaziForma}
                    // idTrenera={props.id} 
                    />
                </Modal>
            }

        </Box >
    )

}
export default KalendarForma