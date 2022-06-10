import { Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { GetData , PutMetoda} from "../../komponente/Fetch";

const ZahteviTrenera = () => {
    const { user } = useContext(UserContext);

    const [zahtevi, setZahtevi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState(false)


    useEffect(() => {
        const get =
            async () => {
                await GetData("http://localhost:8800/api/trener/vratiTreningePersonalniC/" + user.trenerId,
                    setZahtevi, setGreska, setIsLoading)
            }

        get()
    }, [refresh])


    const potvrdiZahtev = async (id) => {

        console.log('potvridi')
        console.log(id)


        const zahtev = {
            url: 'http://localhost:8800/api/trener/prihvatiTrening/' + id
        }

        await PutMetoda(zahtev, setData, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')
        }

        setRefresh(!refresh)
    }

    const odbijZahtev = async (id) => {
        console.log('odbij')
        console.log(id)


        const zahtev = {
            url: 'http://localhost:8800/api/trener/odbijTrening/' + id
        }

        await PutMetoda(zahtev, setData, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')
        }

        setRefresh(!refresh)
    }

    return (<div>

        <div><h1>nesto</h1></div>
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
                    <Button onClick={() => { odbijZahtev(z.idZahteva) }}>otkazi</Button>
                    <Button onClick={() => { potvrdiZahtev(z.idZahteva) }}>potvrdi</Button>

                </div>
            ))
        }

    </div>)
}
export default ZahteviTrenera