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
import { Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import FormaIzmeniTrening from "../../komponente/FormaIzmeniTrening";
import Modal from '../../komponente/Modal'

const ZakazaniTreninzi = () => {

    const { user, dispatch } = useContext(UserContext);

    const [zakazaniTreninzi, setZakazaniTreninzi] = useState([])

    const [grupniTreninzi, setGrupni] = useState([])

    const [greska, setGreska] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [izmeni, setIzmeni] = useState(false)

    const [refresh, setRefresh] = useState(false)
    //console.log(user)

    useEffect(() => {
        const get = async () => {
            await GetData("http://localhost:8800/api/korisnik/vidiZakazaneTreningePersonalni/" + user.korisnikId, setZakazaniTreninzi, setGreska, setIsLoading)
            await GetData("http://localhost:8800/api/korisnik/vidiZakazaneTreningeGrupni/" + user.korisnikId, setGrupni, setGreska, setIsLoading)
        }
        get()
    }, [refresh])

    let navigate = useNavigate();

    const izmeniTrening = (i) => {
        setIzmeni(i)
    }

    const otkaziTrening = (idTreninga) => {

        // console.log(idTreninga)

        axios.put('http://localhost:8800/api/korisnik/ukiniTrening/' + idTreninga,)
            .then((p) => {
                if (p.status === 200) {
                    console.log(p)
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

    const Kartica = ({ tr, i }) => {
        return (
            <Card sx={{ maxWidth: 345 }} >
                <CardActionArea>
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
                            Online: {tr.isOnline}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Button variant="contained" size='small' onClick={izmeniTrening.bind(undefined, i)}>Izmeni trening</Button>
                <Button variant="contained" size='small' onClick={otkaziTrening.bind(undefined, tr.id)}>Otkazi trening</Button>

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
        )
    }

    return (<div>
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

        <div className="zakazaniTreninzi">

            {zakazaniTreninzi.map((tr, i) => (

                <Kartica tr={tr} key={tr.id} i={i} />
                // <div key={tr.id}>
                //     <p>Trener: {tr.imeT} {tr.prezimeT}</p>
                //     <p>Datum: {tr.datum}</p>
                //     <p>Vreme: {tr.vreme}</p>
                //     <p>Trajanje: {tr.trajanje}</p>
                //     <p>Tip: {tr.tip}</p>
                //     <p>Intenzitet: {tr.intenzitet}</p>
                //     {/* <p>Grupni/personalni: {tr.tip}</p> */}
                //     <p>online: {tr.isOnline}</p>

                //     <Button variant="contained" size='small' onClick={izmeniTrening.bind(undefined, tr.id)}>Izmeni trening</Button>
                //     <Button variant="contained" size='small' onClick={otkaziTrening.bind(undefined, tr.id)}>Otkazi trening</Button>
                // </div>
            ))}
        </div>

        <div>
            {grupniTreninzi.map((tr) => (
                <div key={tr.id}>

                    <p>Trener: {tr.imeT} {tr.prezimeT}</p>
                    <p>Datum: {tr.datum}</p>
                    <p>Vreme: {tr.vreme}</p>
                    <p>Trajanje: {tr.trajanje}</p>
                    <p>Tip: {tr.tip}</p>
                    <p>Intenzitet: {tr.intenzitet}</p>
                    <p>online: {tr.isOnline}</p>

                    <Button variant="contained" size='small' onClick={izmeniTrening.bind(undefined, tr.id)}>Izmeni trening</Button>
                    <Button variant="contained" size='small' onClick={otkaziTrening.bind(undefined, tr.id)}>Otkazi trening</Button>

                    {izmeni && <Modal onClose={() => setIzmeni(false)}>
                        <FormaIzmeniTrening
                            trajanjeTreninga={tr.trajanje}
                            tipTreninga={tr.tipTreninga}
                            intenzitetTreninga={tr.intenzitet}
                            datum={tr.datum}
                            vreme={tr.vreme}
                            isOnline={tr.isOnline}
                            onClose={() => setIzmeni(false)} />
                    </Modal>}
                </div>
            ))}

            {
                !zakazaniTreninzi &&
                <Typography>Nemate zakazanih treninga</Typography>
            }

        </div>
    </div>)
}
export default ZakazaniTreninzi