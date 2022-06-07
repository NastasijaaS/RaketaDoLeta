import '../styles/usluge.css'
import { useState, useEffect, Fragment } from 'react'
import { GetData } from '../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Usluge = () => {

    const [nizUsluga, setUsluge] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [prikaziOpis, setPrikaziOpis] = useState(-1)

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiUsluge", setUsluge, setGreska, setIsLoading)
    }, [])

    return (
        <div className="sveUsluge">
            <Typography variant='h4' component ="div" align="center" gutterBottom>Cenovnik usluga</Typography>
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanje</p>}

            {nizUsluga.map((usl, i) => (

                <Accordion key = {usl._id} sx = {{marginBottom :'2vh'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography sx={{ width: '77%', flexShrink: 0 }}>
                        {usl.naziv}
                    </Typography>
                    <Typography>Cena: {usl.cena}</Typography> 
                </AccordionSummary>
                <AccordionDetails>
                    <Typography gutterBottom>
                        {usl.opis}
                    </Typography>
                    {/* <Button variant='contained' fullWidth>Cena:{usl.cena}</Button> */}
                </AccordionDetails>
                </Accordion>

                // <div key={usl._id} >

                //     {prikaziOpis !== i && <div className="usluga" onClick={() => setPrikaziOpis(i)}>
                //         <span className="nazivUsluge">{usl.naziv}</span>
                //         <span className="cenaUsluge">Cena: {usl.cena}</span>
                //     </div>}

                //     {prikaziOpis === i &&
                //         <Fragment>
                //             <div className="usluga" onClick={() => setPrikaziOpis(-1)}>
                //                 <span className="nazivUsluge">{usl.naziv}</span>
                //                 <span className="cenaUsluge">Cena: {usl.cena}</span>
                //             </div>
                //             <div>
                //                 <p>{usl.opis}</p>
                //             </div>
                //         </Fragment>
                //     }
                // </div>
            ))}

        </div >
    )
}

export default Usluge