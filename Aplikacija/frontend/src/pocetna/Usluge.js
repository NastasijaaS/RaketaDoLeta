import '../styles/usluge.css'
import { useState, useEffect, Fragment } from 'react'
import { GetData } from '../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Usluge = () => {

    const [nizUsluga, setUsluge] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [prikaziOpis, setPrikaziOpis] = useState([])

    useEffect(() => {

        GetData("http://localhost:8800/api/usluga/vidiUsluge", setUsluge, setGreska, setIsLoading)
        // setPrikaziOpis(nizUsluga[1].opis.spilt('\n'))
        console.log(nizUsluga)
        console.log(prikaziOpis)

    }, [])


    return (
        <Box className="sveUsluge">
            <Typography variant='h4' component="div" align="center" gutterBottom>Cenovnik usluga</Typography>
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanje</p>}

            {nizUsluga.map((usl, i) => (

                <Accordion key={usl._id} sx={{ marginBottom: '2vh' }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography sx={{ width: '77%', flexShrink: 0 }}>
                            {usl.naziv}
                        </Typography>
                        <Typography color = 'primary' fontWeight={600}>Cena: {usl.cena}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography gutterBottom>
                            {
                            usl.opis
                            }
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}

        </Box >
    )
}

export default Usluge