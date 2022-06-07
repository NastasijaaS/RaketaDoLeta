import '../styles/usluge.css'
import { useState, useEffect } from 'react'
import { GetData } from '../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';
import { Card, CardActions, CardContent, CardMedia, Grid, Typography, Button } from '@mui/material';
import KalendarForma from '../komponente/KalendarForma'

const GrupniTreninzi = () => {
    const [treninzi, setTreninzi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [kalendar, setKalendar] = useState(-1)


    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiGrupneTreninge", setTreninzi, setGreska, setIsLoading)
    }, [])


    return (
        <div className="sveUsluge">
            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanja</p>}

            {treninzi.map((tr, i) => (
                <Card key={i} sx={{ marginBottom: '5%' }}>
                    <Grid container >
                        <Grid item xs={12} sm={4}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Usluga
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {tr.nazivGrupnogTreninga}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {tr.imeT} {tr.prezimeT}
                                </Typography>
                                <Typography variant="body2">
                                    Intenzitet trening: {tr.intenzitet}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} sm={8} className="zakazi">
                            <CardActions >
                                <Button fullWidth variant="contained" size="small" onClick={() => { setKalendar(i) }}>Zakazite termin</Button>
                            </CardActions>
                        </Grid>
                    </Grid>

                    {kalendar === i && <div>
                        <KalendarForma />
                    </div>}
                    
                </Card>


                //   {/* 
                //     <div className="usluga">
                //         <span className="nazivUsluge">{tr.nazivGrupnogTreninga}</span>
                //         <span className="cenaUsluge">{tr.datum}</span> 
                //     </div> */}

            ))}

        </div >
    )
}
export default GrupniTreninzi