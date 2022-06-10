import { useState, useEffect, useContext, Fragment, useRef } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteMetoda, PutMetoda, GetData } from '../../komponente/Fetch'
import { UserContext } from '../../context/UserContext';
import Typography from '@mui/material/Typography';
import { Card, CardMedia, CardContent, CardActionArea,IconButton, CardActions, Grid} from '@mui/material';
import Modal from '../../komponente/Modal';
import FormaZakaziPersonalni from '../../komponente/FormaZakaziPersonalni';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from '@mui/system';


//vrati svoje treninge
//zakazi grupni trening
//izmeni trening

const TreninziTrenera = () => {

    const { user } = useContext(UserContext);

    const [treninzi, setTreninzi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [refresh, setRefresh] = useState(false)
    const [noviTrening, setNoviTrening] = useState(false)

    useEffect(() => {
        const get = async () => { await GetData("http://localhost:8800/api/trener/vratiTreninge/" + user.trenerId, setTreninzi, setGreska, setIsLoading) }

        get()
    }, [])


    const dodajTrening = () => {
        console.log(treninzi)

        //router.post("/zakaziGrupniTrening/:id",
        /** imeT:regT.ime,
                prezimeT:regT.prezime,
                datum: req.body.datum,
                nazivGrupnogTreninga: req.body.nazivGrupnogTreninga,
                intenzitet: req.body.intenzitet,
                trajanje:req.body.trajanje,
                brojMaxClanova: req.body.brojMaxClanova,
                trenerId: trener._id */
    }

    const izmeniTrening = () => {
        console.log(treninzi)
    }

    return (
    
    <Box className = 'marginS'>
        <Button variant = "outlined" onClick={() => setNoviTrening(true)}>Zakazi grupni trening</Button>
        {noviTrening && <Modal onClose={() => { setNoviTrening(false) }}>
            <FormaZakaziPersonalni idTrenera={user.trenerId} grupni={true} onClose={() => { setNoviTrening(false) }} />
        </Modal>}
        <Grid container spacing={2} >
        {treninzi.map((tr) => (
                <Grid item xs = {12} sm ={6} md ={4} lg = {3}>
                <Card className = 'cardShadow' key = {tr.id} sx={{ maxWidth: 345 }} >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Nada Jovanovic
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Broj telefona
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {tr.datum} {tr.vreme}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Trajanje: {tr.trajanje}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Intenzitet: {tr.intenzitet}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Tip: {tr.tip}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Online: {tr.isOnline}
                        </Typography>
                    </CardContent>
                    <CardActions sx ={{justifyContent:'flex-end'}}>
                        <IconButton sx={{ p: 0, color: 'inherit' }}>
                            <EditIcon  sx ={{fontSize: "1em" }} />
                        </IconButton>
                        <IconButton sx={{ p: 0, color: 'green' }}>
                            <CheckCircleIcon  sx ={{fontSize: "1em" }} />
                        </IconButton>
                        <IconButton sx={{ p: 0, color: 'red'}}>
                            <CloseIcon sx ={{fontSize: "1em" }}/>
                        </IconButton>    
                    </CardActions>                      
            </Card>
            </Grid>
        ))}
        </Grid>
    </Box>)
}
export default TreninziTrenera