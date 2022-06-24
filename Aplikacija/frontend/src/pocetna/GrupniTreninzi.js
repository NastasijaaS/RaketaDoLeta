import '../styles/usluge.css'
import { useState, useEffect } from 'react'
import { GetData } from '../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';
import { Card, CardActions, CardContent, CardMedia, Grid, Typography, Button, Box } from '@mui/material';
import KalendarForma from '../komponente/KalendarForma'
import { Container } from '@mui/system';


const GrupniTreninzi = () => {
    const [treninzi, setTreninzi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [kalendar, setKalendar] = useState(-1)


    useEffect(() => {
         GetData("http://localhost:8800/api/trening/vidiGrupneUsluge", setTreninzi, setGreska, setIsLoading) 
    }, [])



    const prikaziTermin = (index) => {
        if (index === kalendar)
            setKalendar(-1)
        else
            setKalendar(index)
    }


    return (
        <Box className="sveUsluge">
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanja</p>}

            {treninzi.map((tr, i) => (
                <Card key={i}>
                    <Grid container spacing = {2}>
                        <Grid item xs={12} md={4}>
                            <CardMedia
                                component="img"
                                src={tr.slika}
                                alt={tr.naziv}
                                className="trImg" />

                        </Grid>
                        <Grid item xs={12} md={8} >
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {tr.naziv}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {tr.opis}
                                </Typography>
                            </CardContent>
                            <CardActions >
                                <Button fullWidth
                                    variant="contained"
                                    size="small"
                                    onClick={() => { prikaziTermin(i) }}>Zakazite termin</Button>
                            </CardActions>
                        </Grid>
                    </Grid>

                    {kalendar === i
                        &&
                        <Box sx={{ marginTop: '1%' }}>
                            <KalendarForma idUsluge={tr._id} />
                        </Box>
                    }

                </Card>

            ))}

        </Box >
    )
}
export default GrupniTreninzi