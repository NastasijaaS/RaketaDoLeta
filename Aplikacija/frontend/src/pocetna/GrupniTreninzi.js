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
        const get = async () => { await GetData("http://localhost:8800/api/korisnik/vidiGrupneUsluge", setTreninzi, setGreska, setIsLoading) }
        get()
    }, [])


    return (
        <Box className="sveUsluge">
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanja</p>}

            {treninzi.map((tr, i) => (
                <Card key={i}>
                    <Grid container>
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
                                    onClick={() => { setKalendar(i) }}>Zakazite termin</Button>
                            </CardActions>
                        </Grid>
                    </Grid>

                    {kalendar === i
                        &&
                        <Box sx={{ marginTop: '1%'}}>
                            <KalendarForma idUsluge={tr._id} />
                        </Box>
                    }

                </Card>


                //   {/* 
                //     <div className="usluga">
                //         <span className="nazivUsluge">{tr.nazivGrupnogTreninga}</span>
                //         <span className="cenaUsluge">{tr.datum}</span> 
                //     </div> */}

            ))}

        </Box >
    )
}
export default GrupniTreninzi