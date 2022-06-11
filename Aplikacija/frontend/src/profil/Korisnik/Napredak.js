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
             const res = await axios.get("http://localhost:8800/api/korisnik/vidiNapredak/" + user.korisnikId)
             setNapredak(res.data)
             setZeljeno(res.data.tezina) 
             console.log(res.data)

             const res1 = await axios.get("http://localhost:8800/api/korisnik/vidiNapredakPoslednji/" + user.korisnikId)
             setPoslednji(res1.data)
             console.log(res1.data)
             }             
        get()
    }, [])

    function setdata (labela1, data1, labela2, zeljeniparam){

        let data = ''

        if(napredak)
        { 
        data  = {

        labels: napredak.datum,
        datasets:[
                {
                label: labela1,
                data: data1,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: labela2,
                    data: zeljeno.map( () => zeljeniparam),
                    borderColor: 'rgb(255, 0, 0)',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                }
            ],
        }}
        return data;
    }

    function setoptions (labela) {
        let option = {
            responsive: true,
            plugins: {
            legend: {
                position: 'top',
                },
            title: {
                display: true,
                text: labela,
                },
            }
        }
       return option
    }
  
    let data = setdata('Tezina', napredak.tezina, 'Zeljena tezina', user.zeljenaTezina)
    let data1 = setdata('Tezina misica', napredak.tezinaMisica, 'Zeljena tezina misica', user.zeljenaTezinaMisica)
    let data2 = setdata('Procenat proteina', napredak.procenatProteina, 'Zeljeni procenat proteina', user.zeljeniProcenatProteina)
    let data3 = setdata('Procenat masti', napredak.procenatMasti, 'Zeljena procenat masti', user.zeljeniProcenatMasti)

    let options = setoptions('Napredak tezina')
    let options1 = setoptions('Napredak misica')
    let options2 = setoptions('Napredak procenat proteina')
    let options3 = setoptions('Napredak procenat masti')


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
                    <Box>
                        <Line className = 'graf' options={options} data={data} />
                    </Box>
                    <Box>
                        <Line className = 'graf' options={options1} data={data1} />
                    </Box>
                    <Box>
                        <Line className = 'graf' options={options2} data={data2} />
                    </Box>
                    <Box>
                        <Line className = 'graf' options={options3} data={data3} />
                    </Box>
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