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
                        alignSelf: 'center'
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
}{

napredak
                &&
                <Box>
                <Line options={options} data={data} />
                    <Line options={options1} data={data1} />
                    <Line options={options2} data={data2} />
                    <Line options={options3} data={data3} />

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