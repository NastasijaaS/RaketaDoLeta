import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CircularProgress, Grid, IconButton, List, ListItem, Paper, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { GetData, PutMetoda } from "../../komponente/Fetch";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormaPosaljiPredlog from "../../komponente/FormaPosaljiPredlog";
import useAxiosPrivate from "../../api/useAxiosPrivate";

const ZahteviTrenera = () => {

    const axiosPrivate = useAxiosPrivate()

    const { user } = useContext(UserContext);

    const [zahtevi, setZahtevi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState(false)
    const [evidencija, setEvidencija] = useState({ intenziteti: [], tipTreninga: [], datumi: [] })
    const [predlog, setPredlog] = useState(false)


    // Accordion
    const [current, setCurrent] = useState(-1);

    const changeState = (i) => {
        current === i ? setCurrent(-1) : setCurrent(i)
    };


    useEffect(() => {

        // GetData("http://localhost:8800/api/treninge/vratiTreningePersonalniC/" + user.trenerId,
        //     setZahtevi, setGreska, setIsLoading)

        const get = async () => {
            setIsLoading(true)
            try {
                const res = await axiosPrivate.get("http://localhost:8800/api/trening/vratiTreningePersonalniC/" + user.trenerId)
                if (res.data) {
                    setZahtevi(res.data)
                }
                console.log(res.data)
                setIsLoading(false)
            }
            catch (err) {
                setIsLoading(false)
                console.error(err)
            }
        }

        get()

    }, [refresh])


    const potvrdiZahtev = async (id) => {

        console.log('potvridi')
        console.log(id)


        const zahtev = {
            url: 'http://localhost:8800/api/trening/prihvatiTrening/' + id
        }

        // await PutMetoda(zahtev, setData, setGreska, setIsLoading)

        try {
            await axiosPrivate.put('http://localhost:8800/api/trening/prihvatiTrening/' + id)

        } catch (err) {
            alert('Doslo je do greske')
        }

        // if (greska !== false) {
        //     alert('doslo je do greske')
        // }

        setRefresh(!refresh)
    }

    const odbijZahtev = async (id) => {
        console.log('odbij')
        console.log(id)


        const zahtev = {
            url: 'http://localhost:8800/api/trener/odbijTrening/' + id
        }

        // await PutMetoda(zahtev, setData, setGreska, setIsLoading)

        try {
            await axiosPrivate.put('http://localhost:8800/api/trening/odbijTrening/' + id)

        } catch (err) {
            alert('Doslo je do greske')
        }

        // if (greska !== false) {
        //     alert('doslo je do greske')
        // }

        setRefresh(!refresh)
    }

    const vidiEvidenciju = async (id) => {
        // GetData("http://localhost:8800/api/trener/vidiEvidenciju/" + user.trenerId + '/' + id,
        //     setEvidencija, setGreska, setIsLoading)


        await axiosPrivate.get("http://localhost:8800/api/evidencija/vidiEvidenciju/" + user.trenerId + '/' + id)
            .then(res => {
                if (res.status === 200) {

                    if (res.data) {
                        setEvidencija(res.data)
                    }
                }
            }).catch((error) => {
                if (error.response?.status !== 404)
                    alert('Doslo je do greske')
                console.log(error)
            });
    }

    const posaljiIzmenu = () => {

    }

    return (

        <Box className='marginS'>

            <Typography gutterBottom component="div" variant="h4" textAlign="center">Zahtevi</Typography>
            {isLoading && <Box className='cardCenter' ><CircularProgress size='2rem' /> </Box>}

            {
                zahtevi.map((z, i) => (
                    <Box key={i} display='flex' flexDirection='row'>
                        <Accordion
                            sx={{ flexGrow: 1, marginBottom: '1%' }}
                            expanded={current === i}
                            onClick={() => { changeState(i); vidiEvidenciju(z.idKorisnika) }}
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
                                <Grid container spacing={2}>

                                    <Grid item xs={12} md={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <Typography>Broj telefona: {z.brojtelefonaT}</Typography>
                                        <Typography>Intenzitet: {z.intenzitet}</Typography>
                                        <Typography>Tip: {z.tip}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={10}>
                                        <Box textAlign='center'>
                                            <Typography mb={1} textAlign='center' fontWeight='500'> EVIDENCIJA PROTEKLIH TRENINGA</Typography>
                                            <Grid container spacing={2} justifyContent='center' mb={1}>
                                                {
                                                    evidencija?.intenziteti?.map((e, i) => (
                                                        <Grid item xs={12} md={2} key={i}>
                                                            <Card className='cardShadow' sx={{ padding: '1vh', textAlign: 'justify' }}>
                                                                <Typography>Datum: {evidencija.datumi[i]}</Typography>
                                                                <Typography>Tip: {evidencija.tipTreninga[i]}</Typography>
                                                                <Typography>Intenzitet: {e}</Typography>
                                                            </Card>
                                                        </Grid>
                                                    ))

                                                }
                                            </Grid>

                                            <Button variant="outlined" onClick={() => setPredlog(true)}>posalji izmenu</Button>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </AccordionDetails>
                        </Accordion>

                        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '1% 0% 1% 1%' }}>
                            <IconButton
                                disableRipple={true}
                                sx={{ p: 0, color: 'green' }}
                                onClick={() => potvrdiZahtev(z.idZahteva)}
                            >
                                <CheckCircleIcon sx={{ fontSize: "1.5em" }} />
                            </IconButton>
                            <IconButton
                                disableRipple={true}
                                sx={{ p: 0, color: 'red' }}
                                onClick={() => odbijZahtev(z.idZahteva)}
                            >
                                <DeleteIcon sx={{ fontSize: "1.5em" }} />
                            </IconButton>
                        </Box>

                        {
                            predlog &&
                            <FormaPosaljiPredlog onClose={() => setPredlog(false)} idKorisnika={z.korisnikId} />
                        }

                    </Box>
                ))
            }

        </Box>)
}
export default ZahteviTrenera