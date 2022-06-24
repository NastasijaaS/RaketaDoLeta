import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from '../../context/UserContext'
import { GetData } from '../../komponente/Fetch'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import {Typography, Grid, Card, CardContent, } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import NapredakGrafici from "../../komponente/NapredakGrafici";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  
  );  


const Napredak = () => {
    
    const { user } = useContext(UserContext);
    console.log(user)
    const [napredak, setNapredak] = useState([])
    const [poslednji, setPoslednji] = useState({})

    const [greska, setGreska] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [zeljeno, setZeljeno] = useState([])
    
    let navigate = useNavigate();

    useEffect(() => {
        const get = async () =>
         
            { 
            // await GetData("http://localhost:8800/api/korisnik/vidiNapredak/" +
            //  user.korisnikId, setNapredak, setGreska, setIsLoading)
             const res = await axios.get("http://localhost:8800/api/napredak/vidiNapredak/" + user.korisnikId)
             setNapredak(res.data)
             setZeljeno(res.data.tezina) 
             console.log(res.data)

             const res1 = await axios.get("http://localhost:8800/api/napredak/vidiNapredakPoslednji/" + user.korisnikId)
             setPoslednji(res1.data)
             console.log(res1.data)
             }             
        get()
    }, [])

    return (

        <div className = 'marginS'>

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
                        alignSelf: 'center'
                    }}

                >Doslo je do greske prilikom ucitavanja ):</Alert>
            </Modal>

            <Grid container spacing={2}>
                <Grid item xs={12} md ={3}>
            {
                napredak &&
                <Card>
                    <CardContent>
                    <h3>Informacije sa poslednjeg merenja</h3>

                    <p>Tezina: {poslednji.tezina}</p>
                    <p>Procenat masti: {poslednji.procenatMasti}</p>
                    <p>Procenat proteina: {poslednji.procenatProteina}</p>
                    <p>Tezina misica: {poslednji.tezinaMisica}</p>
                    <p>Procenat vode: {poslednji.procenatVode}</p>
                    <p>Kostana masa: {poslednji.kostanaMasa}</p>
                    <p>BMI: {poslednji.BMI}</p>
                    <p>BodyAge: {poslednji.bodyAge}</p>
                    </CardContent>
                </Card>
                }
            </Grid>
            <Grid item xs={12} md ={9} sx = {{maxHeight: '75vh'}}>
                {
                napredak
                &&
                <Box className ='scroll'>
                        <NapredakGrafici napredak = {napredak} zeljeno ={zeljeno} user = {user}/>
                </Box>
                }
           
              </Grid>
            </Grid>
            {
                    !napredak && <Box>
                        <Typography>Nema informacija</Typography>
                    </Box>
                }
        </div>  
    )
}
export default Napredak