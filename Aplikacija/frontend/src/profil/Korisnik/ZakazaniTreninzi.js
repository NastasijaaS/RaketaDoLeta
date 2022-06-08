import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from '../../context/UserContext'
import { GetData } from '../../komponente/Fetch'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { Card, CardMedia, CardContent, CardActionArea } from '@mui/material';

const ZakazaniTreninzi = () => {

    const { user, dispatch } = useContext(UserContext);

    const [zakazaniTreninzi, setZakazaniTreninzi] = useState([])

    const [grupniTreninzi, setGrupni] = useState([])

    const [greska, setGreska] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    //console.log(user)

    useEffect(() => {
        const get = () => {
            GetData("http://localhost:8800/api/korisnik/vidiZakazaneTreningePersonalni/" + user.korisnikId, setZakazaniTreninzi, setGreska, setIsLoading)
            GetData("http://localhost:8800/api/korisnik/vidiZakazaneTreningeGrupni/" + user.korisnikId, setGrupni, setGreska, setIsLoading)
        }

        get()
    }, [])

    let navigate = useNavigate();


    const izmeniTrening = (idTreninga) => {
        // console.log(grupniTreninzi)

        // axios.put('http://localhost:8800/api/korisnik/izmeniTrening/' + user.korisnikId + '/' + idTreninga, {
        //     //trening ?? sta menjam?? 
        // }).then((p) => {
        //     if (p.status === 200) {
        //         console.log(p)
        //         alert('Uspesno izmenjen trening')
        //     }
        // }).catch((error) => {
        //     if (error.response.status)
        //         alert(error.response.data)
        //     else
        //         alert('Doslo je do greske')
        // });
    }

    const otkaziTrening = (idTreninga) => {

        console.log(idTreninga)

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
    }

    const Kartica = ({tr}) => {
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
                <Button variant="contained" size='small' onClick={izmeniTrening.bind(undefined, tr.id)}>Izmeni trening</Button>
                <Button variant="contained" size='small' onClick={otkaziTrening.bind(undefined, tr.id)}>Otkazi trening</Button>
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

            {zakazaniTreninzi.map((tr) => (

                <Kartica tr={tr} key = {tr.id} />
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