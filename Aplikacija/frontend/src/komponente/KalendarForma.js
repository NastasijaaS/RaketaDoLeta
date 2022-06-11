import '../styles/kalendar.css'
import { useState, Fragment } from 'react'
import FormaZakazi from './FormaZakazi'
import Modal from './Modal'
import LogIn from '../pocetna/LoginForma'
import Register from '../pocetna/RegisterForma'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { GetData, PutMetoda } from './Fetch'
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import RasporedGrupni from './RasporedGrupni'
import RasporedTrener from './RasporedTrener'

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
    const [data, setData] = useState(false)



    const prikaziTermine = async (ev) => {

        const d = ev.target.id
        // let datumTreninga = new Date();

        //  console.log(d)

        //    const idUsluge = props.idUsluge


        const datumProba = new Date(d)

        const datumZaSlanje = datumProba.toISOString()



        //  console.log('json  ' + datumZaSlanje)

        // if (props.idUsluge) {

        //     await GetData(`http://localhost:8800/api/korisnik/vidiGrupneTreninge/${idUsluge}/${datumZaSlanje}`, setTermini, setGreska, setIsLoading)
        // }
        // else {
        //     await GetData(`http://localhost:8800/api/termin/vratiZauzeteTermineZaTreneraPoDatumu/${props.idTrenera}/${datumZaSlanje}`, setTermini, setGreska, setIsLoading)
        // }
        // if (d == 2) {
        //     setTer(termini1)
        // }
        // else {
        //     setTer(termini2)
        // }

        setTermin({ status: true, datum: datumZaSlanje })
    }

    // const zakaziForma = (treningId) => {
    //     console.log(treningId)

    //     if (!user) {
    //         setZakazi(!zakazi)
    //         return
    //     }

    //     //korisnik/prijavaGrupniTrening/:idKorisnika/:idTreninga

    //     const zahtev = {
    //         url: 'http://localhost:8800/api/korisnik/prijavaGrupniTrening/' + user.korisnikId + '/' + treningId
    //     }

    //     PutMetoda(zahtev, setData, setGreska, setIsLoading)

    //     if (greska !== false) {
    //         alert(greska)
    //     }
    //     else {
    //         alert('uspesno ste se prijavili za trening')
    //     }
    //     window.location.reload(false)

    //     // console.log(ev.target.value)
    //     // const sat = ev.target.value

    //     // const [vreme, trajanje] = sat.split(' ')

    //     // setZakazi(!zakazi)

    //     // setTermin(termin => ({ ...termin, vreme: { vreme }, trajanje: { trajanje } }));

    //     //  console.log(termin)
    // }

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

    const zakaziGrupni = () => {

    }

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

                props.idUsluge ? <RasporedGrupni idUsluge={props.idUsluge} datum={termin.datum} /> : <RasporedTrener idTrenera={props.idTrenera} datum={termin.datum} />

                // <TableContainer component={Paper}>
                //     <Table 
                //     sx={{ minWidth: 650 }} size="small" >
                //         <TableHead>
                //             <TableRow>
                //                 {!props.idTrenera && <TableCell>Trener</TableCell>}
                //                 <TableCell align="right">Vreme</TableCell>
                //                 <TableCell align="right">Trajanje</TableCell>
                //                 <TableCell align="right">Intenzitet</TableCell>
                //                 {!props.idTrenera && <TableCell align="right">Mesta</TableCell>}
                //                 {!props.idTrenera && <TableCell align="right"></TableCell>}
                //             </TableRow>
                //         </TableHead>
                //         <TableBody>
                //             {termini.map((t, i) => (
                //                 <TableRow
                //                     key={i}
                //                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                //                 >
                //                     {!props.idTrenera && <TableCell component="th" scope="row">
                //                         {t.imeT} {t.prezimeT}
                //                     </TableCell>}
                //                     <TableCell align="right"> {t.vreme}</TableCell>
                //                     <TableCell align="right">{t.trajanje}</TableCell>
                //                     <TableCell align="right">{t.intenzitet}</TableCell>
                //                     {!props.idTrenera &&
                //                         <Fragment>
                //                             <TableCell align="right"> {t.brojslobodnih}</TableCell>
                //                             <TableCell align="right">
                //                                 <Button
                //                                     size="small"
                //                                     variant="contained"
                //                                     value={t.vreme + " " + t.trajanje}
                //                                     onClick={() => zakaziForma(t.treningID)}>Zakazi
                //                                 </Button>
                //                             </TableCell>
                //                         </Fragment>}
                //                 </TableRow>
                //             ))}
                //         </TableBody>
                //     </Table>
                // </TableContainer>
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


            {/* {
                zakazi && <Modal onClose={() => { setZakazi(false) }}>

                    {login && <Box><LogIn onClose={() => { setZakazi(false) }} />
                        <span>Nemate nalog:
                            <Button size='small' onClick={() => { setLogin(false) }}>Registruj se</Button>
                        </span>
                    </Box>}

                    {!login && <Box><Register onClose={() => { setZakazi(false) }} />
                        <span>Imate nalog:
                            <Button size='small' onClick={() => { setLogin(true) }}>Prijavi se</Button>
                        </span>
                    </Box>}

                </Modal>
            } */}

            {/* {
                zakazi && user &&
                <Modal onClose={zakaziForma}>
                    <Box>
                        {/* <span>Trener {props.imeTrenera + ' ' + props.prezimeTrenera}</span><br />
                        <span>Datum: </span><br /> */}
            {/* <p>naslov koji saljem</p>
                    </Box>
                    <FormaZakazi vreme={termin.vreme}
                        trajanje={termin.trajanje}
                        datum={termin.datum}
                        onClose={zakaziForma} */}
            {/* // idTrenera={props.id} 
                    />
                </Modal> */}
            {/* }  */}

        </Box >
    )

}
export default KalendarForma