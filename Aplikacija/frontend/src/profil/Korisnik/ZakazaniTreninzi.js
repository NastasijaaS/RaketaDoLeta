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


const ZakazaniTreninzi = () => {

    const { user, dispatch } = useContext(UserContext);

    const [zakazaniTreninzi, setZakazaniTreninzi] = useState([])

    const [greska, setGreska] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    //console.log(user)

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiZakazaneTreninge/" + user.korisnikId, setZakazaniTreninzi, setGreska, setIsLoading)

    }, [])

    let navigate = useNavigate();


    const izmeniTrening = (idTreninga) => {

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


    return (<div>
        <Modal
            sx={{ display: 'flex', justifyContent: 'center' }}
            open={greska ? true : false}
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
        </Modal>

        <div className="zakazaniTreninzi">

            {zakazaniTreninzi.map((tr) => (
                <div key={tr._id}>
                    <p>Trener: {tr.trener}</p>
                    <p>Datum: {tr.datum}</p>
                    <p>Vreme: {tr.vreme}</p>
                    <p>Trajanje: {tr.trajanje}</p>
                    <p>Tip: {tr.tip}</p>
                    <p>Intenzitet: {tr.intenzitet}</p>
                    <p>Grupni/personalni: {tr.tip}</p>
                    <p>online: {tr.isOnline}</p>

                    <Button variant="contained" size='small' onClick={izmeniTrening.bind(undefined, tr._id)}>Izmeni trening</Button>
                    <Button variant="contained" size='small' onClick={otkaziTrening.bind(undefined, tr._id)}>Otkazi trening</Button>
                </div>
            ))}
            {
                !ZakazaniTreninzi &&
                <Typography>Nemate zakazanih treninga</Typography>
            }

            {/* <div className="btnNoviTrening">
                <button onClick={zakaziTrening}>Zakazi novi trening</button>
            </div> */}

        </div>
    </div>)
}
export default ZakazaniTreninzi