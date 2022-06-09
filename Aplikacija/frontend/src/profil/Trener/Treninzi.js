import { useState, useEffect, useContext, Fragment, useRef } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteMetoda, PutMetoda, GetData } from '../../komponente/Fetch'
import { UserContext } from '../../context/UserContext';
import Typography from '@mui/material/Typography';
import { Card, CardMedia, CardContent, CardActionArea,IconButton, CardActions } from '@mui/material';
import Modal from '../../komponente/Modal';
import FormaZakaziPersonalni from '../../komponente/FormaZakaziPersonalni';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

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

    const Kartica = ({ tr }) => {
        return (
            <Card sx={{ maxWidth: 345 }}>
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
                        <IconButton size = 'small' sx={{ p: 0, color: 'inherit' }}>
                            <EditIcon  sx ={{fontSize: "1.5em" }} />
                        </IconButton>
                        <IconButton size="large" sx={{ p: 0, color: 'red'}}>
                            <CloseIcon sx ={{fontSize: "1.25em" }}/>
                        </IconButton>    
                    </CardActions>                      
            </Card>
        )
    }

    return (<div>
        <Button onClick={() => setNoviTrening(true)}>Zakazi grupni trening</Button>
        {noviTrening && <Modal onClose={() => { setNoviTrening(false) }}>
            <FormaZakaziPersonalni idTrenera={user.trenerId} grupni={true} onClose={() => { setNoviTrening(false) }} />
        </Modal>}
        <div><h1>nesto</h1></div>

        {treninzi.map((tr) => (

            <Kartica tr={tr} key={tr._id} />

            // <div key={tr._id}>

            //     <p>{tr.tip}</p>
            //     <p>{tr.intenzitet}</p>
            //     <p>{tr.trajanje}</p>

            //     <Button onClick={izmeniTrening}>izmeni trening</Button>
            // </div>
        ))}
    </div>)
}
export default TreninziTrenera