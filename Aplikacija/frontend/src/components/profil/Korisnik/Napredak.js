import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from '../../../context/UserContext'
import { GetData } from '../../komponente/Fetch'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

const Napredak = () => {

    const { user } = useContext(UserContext);

    const [napredak, setNapredak] = useState([])

    const [greska, setGreska] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    //console.log(user)

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiNapredak/" + user.korisnikId, setNapredak, setGreska, setIsLoading)

    }, [])

    let navigate = useNavigate();

    return (<div>
        <div className="infoNapredak">

            {isLoading && <CircularProgress size='2rem' disableShrink />}

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
                    alignSelf:'center'
                 }}

                >Doslo je do greske prilikom ucitavanja ):</Alert>
            </Modal>

            <h3>Informacije sa poslednjeg merenja</h3>
            {
                napredak &&
                <Box>
                    <p>Tezina: {napredak.tezina}</p>
                    <p>Procenat masti: {napredak.procenatMasti}</p>
                    <p>Procenat proteina: {napredak.procenatProteina}</p>
                    <p>Tezina misica: {napredak.tezinaMisica}</p>
                    <p>Procenat vode: {napredak.procenatVode}</p>
                    <p>Kostana masa: {napredak.kostanaMasa}</p>
                    <p>BMI: {napredak.BMI}</p>
                    <p>BodyAge: {napredak.bodyAge}</p>
                </Box>
            }
            {
                !napredak && <div>
                    <Typography>Nema informacija</Typography>
                </div>
            }

        </div>
    </div >
    )
}
export default Napredak