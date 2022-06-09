import { useState, useEffect, useContext, Fragment, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GetData } from '../../komponente/Fetch'
import { UserContext } from '../../context/UserContext';
import { Card, CardMedia, CardContent, CardActionArea, CardAction, Typography, Grid, CardActions} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../styles/stil.css'



const KorisniciTrenera = () => {
    let buttonSelected = ''

    const { user } = useContext(UserContext);

    const [korisnici, setKorisnici] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

 
    useEffect(() => {
        const get = () => {
            GetData('http://localhost:8800/api/trener/vratiKorisnike/' + user.trenerId, setKorisnici, setGreska, setIsLoading)
        }
        get()
    }, [])

    const izbaciKlijenta = (id) => {

        console.log(id)

    }

    let navigate = useNavigate()
    
    return (
        <Box sx = {{margin: '2% 2%'}}>
            <Grid container spacing={2}>            
                {korisnici.map((k, i) => (
                        <Grid item key = {k.idkorisnika} xs={12} sm={6} md={4} lg={3} sx = {{ display: { xs:'flex', sm: 'block'} , justifyContent: 'center'}} >
                            <Card variant="outlined" sx={{ maxWidth: 345, minWidth:250}} onClick={() => {
                                navigate(`/trener/korisnik/${k.imeK + k.prezimeK}`, { state: k });
                            }}>
                                <CardActionArea >
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {k.imeK} {k.prezimeK}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            E-mail: {k.email}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Broj telefona: {k.brojtelefonaK}
                                        </Typography>            
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button onClick={() => { izbaciKlijenta(k.idkorisnika) }}>Izbaci klijenta</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                ))}
            </Grid>
        </Box>
    )


}
export default KorisniciTrenera