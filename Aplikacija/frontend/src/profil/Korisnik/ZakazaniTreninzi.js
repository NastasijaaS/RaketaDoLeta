import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from '../../context/UserContext'
import { GetData } from '../../komponente/Fetch'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { Card, CardMedia, CardContent, CardActionArea, CardActions, Grid } from '@mui/material';
import FormaIzmeniTrening from "../../komponente/FormaIzmeniTrening";
import Modal from '../../komponente/Modal'
import '../../styles/stil.css'
import useAxiosPrivate from "../../api/useAxiosPrivate";

const ZakazaniTreninzi = () => {
    const axiosPrivate = useAxiosPrivate();

    const { user } = useContext(UserContext);

    const [zakazaniTreninzi, setZakazaniTreninzi] = useState([])

    const [grupniTreninzi, setGrupni] = useState([])

    const [greska, setGreska] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [izmeni, setIzmeni] = useState(false)

    const [refresh, setRefresh] = useState(false)
    //console.log(user)

    useEffect(() => {
        const get = async () => {
            //  GetData("http://localhost:8800/api/trening/vidiZakazaneTreningePersonalni/" + user.korisnikId, setZakazaniTreninzi, setGreska, setIsLoading)
            //  GetData("http://localhost:8800/api/trening/vidiZakazaneTreningeGrupni/" + user.korisnikId, setGrupni, setGreska, setIsLoading)

            try {

                setIsLoading(true)
                const res = await axiosPrivate.get("http://localhost:8800/api/trening/vidiZakazaneTreningePersonalni/" + user.korisnikId)
                setZakazaniTreninzi(res.data)
                const res1 = await axiosPrivate.get("http://localhost:8800/api/trening/vidiZakazaneTreningeGrupni/" + user.korisnikId)
                setGrupni(res1.data)
                setIsLoading(false)
            }
            catch (err) {
                setIsLoading(false)
                if (err.response.status !== 404)
                    alert('Doslo je do greske prilikom ucitavanja')
            }

        }
        get()
    }, [refresh])

    let navigate = useNavigate();

    const izmeniTrening = (i) => {
        setIzmeni(i)
    }

    const otkaziTrening = async (idTreninga) => {

        await axiosPrivate.put('http://localhost:8800/api/trening/ukiniTrening/' + idTreninga)
            .then((p) => {
                if (p.status === 200) {
                    alert('Uspesno ukinut trening')
                }
            }).catch((error) => {
                if (error.response.status)
                    alert(error.response.data)
                else
                    alert('Doslo je do greske')
            });
        setRefresh(!refresh)
    }

    const status = (s) => {
        let pom = 'primary'
        switch (s) {
            case 'Odobreno':
                pom = 'green'
                break;
            case 'Ukinuto':
                pom = 'red'
                break;
            case 'Odbijeno':
                pom = 'red'
                break;
            default:
                break;
        }
        return pom
    }

    return (
        <Box className='marginS'>

            {/* <Modal
            sx={{ display: 'flex', justifyContent: 'center' }}
            open={(zakazaniTreninzi || grupniTreninzi) ? true : false}
            onClose={() => navigate("../profil", { replace: true })}
        >
            <Alert
                severity="error"
                sx={{
                    height: 100,
                    display: 'flex',
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}

            >Doslo je do greske prilikom ucitavanja ):</Alert>
        </Modal> */}

            <Box className="zakazaniTreninzi">
                <Typography gutterBottom variant="h4" component="div" textAlign="center">Personalni treninzi</Typography>

                {isLoading && <Box className='cardCenter' ><CircularProgress size='2rem' /> </Box>}


                <Grid container spacing={2} >
                    {zakazaniTreninzi.map((tr, i) => (
                        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                            <Card className='cardShadow' key={tr.id} sx={{ maxWidth: 345 }} >
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {tr.imeT} {tr.prezimeT}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Datum: {tr.datum}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Vreme: {tr.vremeee}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Trajanje: {tr.trajanje}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Intenzitet: {tr.intenzitet}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Tip: {tr.tip}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Online: {tr.isOnline.toString()}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color={status(tr.status)}
                                    >
                                        Status: {tr.status}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" size='small' onClick={izmeniTrening.bind(undefined, i)}>Izmeni trening</Button>
                                    <Button variant="contained" size='small' onClick={otkaziTrening.bind(undefined, tr.id)}>Otkazi trening</Button>
                                </CardActions>
                                {izmeni === i && <Modal onClose={() => setIzmeni(false)}>
                                    <FormaIzmeniTrening
                                        trajanjeTreninga={tr.trajanje}
                                        tipTreninga={tr.tip}
                                        intenzitetTreninga={tr.intenzitet}
                                        datum={tr.datum}
                                        vreme={tr.vremeee}
                                        isOnline={tr.isOnline}
                                        idTreninga={tr.id}
                                        onClose={() => { setIzmeni(false); setRefresh(!refresh) }} />
                                </Modal>}

                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {
                    !zakazaniTreninzi &&
                    <Typography>Nemate zakazanih personalnih treninga</Typography>
                }

                <Typography gutterBottom variant="h4" component="div" textAlign="center" mt={2}>Grupni treninzi</Typography>

                <Grid container spacing={2} >
                    {grupniTreninzi.map((tr, i) => (
                        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                            <Card className='cardShadow' key={tr.id} sx={{ maxWidth: 345 }} >
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {tr.imeT} {tr.prezimeT}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Datum: {tr.datum}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Vreme: {tr.vreme}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Trajanje: {tr.trajanje}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Intenzitet: {tr.intenzitet}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Online: {tr.isOnline.toString()}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" size='small' onClick={otkaziTrening.bind(undefined, tr.id)}>Otkazi trening</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {
                    !grupniTreninzi &&
                    <Typography>Nemate zakazanih personalnih treninga</Typography>
                }

            </Box>
        </Box>)
}
export default ZakazaniTreninzi