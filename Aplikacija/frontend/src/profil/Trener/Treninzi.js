import { useState, useEffect, useContext, Fragment, useRef } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteMetoda, PutMetoda, GetData } from '../../komponente/Fetch'
import { UserContext } from '../../context/UserContext';
import Typography from '@mui/material/Typography';

//vrati svoje treninge
//zakazi grupni trening
//izmeni trening
const TreninziTrenera = () => {

    const { user } = useContext(UserContext);

    const [treninzi, setTreninzi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [refresh, setRefresh] = useState(false)

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
    
    return (<div>
        <Button onClick={dodajTrening}>Zakazi grupni trening</Button>
        <div><h1>nesto</h1></div>

        {treninzi.map((tr) => (
            <div key={tr._id}>

                <p>{tr.tip}</p>
                <p>{tr.intenzitet}</p>
                <p>{tr.trajanje}</p>

                <Button onClick={izmeniTrening}>izmeni trening</Button>
            </div>
        ))}
    </div>)
}
export default TreninziTrenera