import { Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { GetData, PutMetoda , DeleteMetoda} from "../../komponente/Fetch";
import CircularProgress from '@mui/material/CircularProgress';

const OdbijeniTreninzi = () => {

    const { user } = useContext(UserContext);

    const [zahtevi, setZahtevi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState(false)


    useEffect(() => {
        const get =
            async () => {
                await GetData("http://localhost:8800/api/trener/vratiTreningePersonalniO/" + user.trenerId,
                    setZahtevi, setGreska, setIsLoading)
            }

        get()
    }, [refresh])

    const obrisiTrening =  (id) => {

        console.log('potvridi')
        console.log(id)


        const zahtev = {
            url: 'http://localhost:8800/api/uprava/obrisiOdbijenTrening/' + id
        }

         DeleteMetoda(zahtev,  setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')
        }

        setRefresh(!refresh)
    }



    return (<div>

        <div><h1>nesto</h1></div>
        {isLoading && <CircularProgress size='2rem' disableShrink />}

        {
            zahtevi.map((z, i) => (
                <div key={i}>
                    <p>Datum: {z.datum}</p>
                    <p>Vreme: {z.vreme}</p>
                    <p>Trajanje: {z.trajanje}</p>
                    <p>{z.imeT} {z.prezimeT}</p>
                    <p>Broj telefona: {z.brojtelefonaT}</p>
                    <p>Intenzitet: {z.intenzitet}</p>
                    <p>Tip: {z.tip}</p>
                    <Button onClick={() => { obrisiTrening(z.idZahteva) }}>obrisi</Button>

                </div>
            ))
        }

    </div>)

}
export default OdbijeniTreninzi