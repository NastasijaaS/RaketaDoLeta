import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { GetData } from "../../komponente/Fetch";

const ZahteviTrenera = () => {
    const { user } = useContext(UserContext);

    const [zahtevi, setZahtevi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const get =
            async () => {
                await GetData("http://localhost:8800/api/trener/vratiTreningePersonalniC/" + user.trenerId,
                    setZahtevi, setGreska, setIsLoading)
            }

        get()
    }, [])


    const potvrdiZahtev = () => {



    }

    const odbijZahtev = () => {

    }

    return (<div>

        <div><h1>nesto</h1></div>

    </div>)
}
export default ZahteviTrenera