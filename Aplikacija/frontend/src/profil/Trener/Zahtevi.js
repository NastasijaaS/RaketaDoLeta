import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, IconButton, List, ListItem, Paper, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { GetData, PutMetoda } from "../../komponente/Fetch";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ZahteviTrenera = () => {
    const { user } = useContext(UserContext);

    const [zahtevi, setZahtevi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState(false)
    const [evidencija, setEvidencija] = useState({intenziteti:[], tipTreninga:[], datumi:[]})

    // Accordion
    const [current, setCurrent] = useState(-1);

    const changeState = (i) => {
        current === i ? setCurrent(-1) : setCurrent(i)
    };


    useEffect(() => {

        GetData("http://localhost:8800/api/trener/vratiTreningePersonalniC/" + user.trenerId,
                    setZahtevi, setGreska, setIsLoading)
    }, [refresh])


    const potvrdiZahtev = async (id) => {

        console.log('potvridi')
        console.log(id)


        const zahtev = {
            url: 'http://localhost:8800/api/trener/prihvatiTrening/' + id
        }

        await PutMetoda(zahtev, setData, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')
        }

        setRefresh(!refresh)
    }

    const odbijZahtev = async (id) => {
        console.log('odbij')
        console.log(id)


        const zahtev = {
            url: 'http://localhost:8800/api/trener/odbijTrening/' + id
        }

        await PutMetoda(zahtev, setData, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')
        }

        setRefresh(!refresh)
    }

    const vidiEvidenciju = (id) => {
        GetData("http://localhost:8800/api/trener/vidiEvidenciju/" + user.trenerId+ '/'+  id,
            setEvidencija, setGreska, setIsLoading)
    }


    return (

        <Box className='marginS'>

            <Typography gutterBottom component="div" variant="h4" textAlign="center">Zahtevi</Typography>
            {isLoading && <Box className='cardCenter' ><CircularProgress size='2rem' /> </Box>}

            {
                zahtevi.map((z, i) => (
                    <Box key={i} display='flex' flexDirection='row'>
                        <Accordion
                            sx={{ flexGrow: 1 }}
                            expanded={current === i}
                            onClick={() => {changeState(i);vidiEvidenciju(z.idKorisnika)} }
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography variant="h6" sx={{ flexGrow: 1 }} >
                                    {z.datum}  {z.vreme}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ marginRight: '2%', textTransform: 'capitalize' }}>
                                    {z.imeT} {z.prezimeT}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    <Typography>Broj telefona: {z.brojtelefonaT}</Typography>
                                    <Typography>Intenzitet: {z.intenzitet}</Typography>
                                    <Typography>Tip: {z.tip}</Typography>
                                </Box>
                                {/* <Box>
                                    datumi
                                    {
                                        evidencija.datumi.map((e,i)=>(
                                            <Typography  key = {i}>{e}</Typography>
                                        ))
                                    }
                                </Box> */}
                                <Box>
                                    intenziteti
                                    {
                                        evidencija.intenziteti.map((e,i)=>(
                                            <Typography key = {i}>{e}</Typography>
                                        ))
                                    }
                                </Box>
                                <Box>
                                    tip treninga
                                    {
                                        evidencija.tipTreninga.map((e,i)=>(
                                            <Typography  key = {i}>{e}</Typography>
                                        ))
                                    }
                                </Box>
                                <Button>posalji izmenu</Button>
                            </AccordionDetails>
                        </Accordion>

                        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '1% 0% 1% 1%' }}>
                            <IconButton
                                sx={{ p: 0, color: 'green' }}
                                onClick={() => potvrdiZahtev(z.idZahteva)}
                            >
                                <CheckCircleIcon sx={{ fontSize: "1.5em" }} />
                            </IconButton>
                            <IconButton
                                sx={{ p: 0, color: 'red' }}
                                onClick={() => odbijZahtev(z.idZahteva)}
                            >
                                <DeleteIcon sx={{ fontSize: "1.5em" }} />
                            </IconButton>
                        </Box>
                    </Box>
                    // <div key={i}>
                    //     <p>Datum: {z.datum}</p>
                    //     <p>Vreme: {z.vreme}</p>
                    //     <p>Trajanje: {z.trajanje}</p>
                    //     <p>{z.imeT} {z.prezimeT}</p>
                    //     <p>Broj telefona: {z.brojtelefonaT}</p>
                    //     <p>Intenzitet: {z.intenzitet}</p>
                    //     <p>Tip: {z.tip}</p>
                    //     <Button onClick={() => { odbijZahtev(z.idZahteva) }}>otkazi</Button>
                    //     <Button onClick={() => { potvrdiZahtev(z.idZahteva) }}>potvrdi</Button>

                    // </div>
                ))
            }

        </Box>)
}
export default ZahteviTrenera