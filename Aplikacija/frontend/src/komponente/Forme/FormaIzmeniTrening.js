import React, { useContext, useState,} from "react";
import '../../styles/formaZakazi.css'
import { UserContext } from "../../context/UserContext";
import Button from "@mui/material/Button";
import { FormControlLabel } from '@mui/material';
import { Checkbox } from "@mui/material";
import Greska from '../Alert'
import useAxiosPrivate from "../../api/useAxiosPrivate";
import DropDown from '../Inputi/DropDown'

const tip = ["Gornji deo tela", "Donji deo tela", "Kardio"]
const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h", "1h30min", "2h"]

const FormaIzmeniTrening = (props) => {
    // console.log(props.idTreninga)

    const axiosPrivate = useAxiosPrivate()

    const { user } = useContext(UserContext);

    let isOnline = props.isOnline
    const [tipTreninga, setTip] = useState(props.tipTreninga)
    const [intenzitetTreninga, setIntenzitet] = useState(props.intenzitetTreninga)
    const [trajanjeTreninga, setTrajanje] = useState(props.trajanjeTreninga)
    const [error, setError] = useState(false)
  
    const izmeniTrening = async (ev) => {

        if (tipTreninga === '' || intenzitetTreninga === '' || trajanjeTreninga === '') {
            setError('Morate uneti sve podatke')
            return
        }

        const zahtev = {
            url: 'http://localhost:8800/api/trening/izmeniTrening/' + user.korisnikId + '/' + props.idTreninga,
            body: {
                tip: tipTreninga,
                intenzitet: intenzitetTreninga,
                trajanje: trajanjeTreninga,
                isOnline: isOnline
            }
        }

        // await PutMetoda(zahtev, setData, setGreska, setIsLoading)

        try {
            await axiosPrivate.put(zahtev.url, zahtev.body)
            alert('Uspesno ste se izmenili trening')
        } catch (err) {
            alert('Doslo je do greske')
        }

        props.onClose()
    }

    const onlineTrening = (ev) => {
        isOnline = ev.target.checked
    }


    return (
        <form className="formaZakazi" onSubmit={izmeniTrening}>

            <Greska open={Boolean(error)} onClose={() => setError(false)} greska={error} />

            <DropDown labela='Tip treninga' set={setTip} niz={tip} value={tipTreninga} />
            <DropDown labela='Intenzitet treninga' set={setIntenzitet} niz={intenzitet} value={intenzitetTreninga} />
            <DropDown labela='Trajanje treninga' set={setTrajanje} niz={trajanje} value={trajanjeTreninga} />

            <FormControlLabel
                value="online"
                onChange={onlineTrening}
                control={<Checkbox />}
                label="On-line trening"
                labelPlacement="start"
            />

            <div>
                <Button size='small' variant="outlined" className="btn" onClick={izmeniTrening}>Potvrdi</Button>
                <Button size='small' variant="outlined" className="btn" onClick={props.onClose}>Otkazi</Button>
            </div>

        </form>
    )
}

export default FormaIzmeniTrening