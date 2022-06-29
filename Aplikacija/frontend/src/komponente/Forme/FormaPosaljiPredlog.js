import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { Box } from '@mui/material';
import Modal from '../Modal'
import { UserContext } from "../../context/UserContext";
import DropDown from "../Inputi/DropDown";
import useAxiosPrivate from "../../api/useAxiosPrivate";

const tip = ["Gornji deo tela", "Donji deo tela", "Kardio"]
const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h"]

const FormaPosaljiPredlog = (props) => {
    console.log(props)

    const axiosPrivate = useAxiosPrivate()

    const [tipTreninga, setTip] = useState(tip[0])
    const [intenzitetTreninga, setIntenzitet] = useState(intenzitet[0])
    const [trajanjeTreninga, setTrajanje] = useState(trajanje[0])

    const posaljiIzmenu = async () => {

        try {
            //napravi zahtev trening
            await axiosPrivate.post('http://localhost:8800/api/zahtev/napraviZahtevTrener', {
                idTreninga: props.idTreninga,
                idKorisnika: props.idKorisnika,
                idZahteva: props.idZahteva,
                tip: tipTreninga,
                intenzitet: intenzitetTreninga,
                trajanje: trajanjeTreninga
            })
            alert('Uspesno poslat predlog')
            props.onClose()
        } catch (err) {
            console.log(err.response.data)
            alert('Doslo je do greske')
        }

    }

    return (
        <Modal onClose={props.onClose}>
            <Box className='cardCenter marginS' sx={{ gap: '1vh', padding: '0% 20%', alignItems: "stretch", display: 'flex', flexDirection: 'column' }}>
                <DropDown labela='Tip treninga' set={setTip} niz={tip} value={tipTreninga} />
                <DropDown labela='Intenzitet treninga' set={setIntenzitet} niz={intenzitet} value={intenzitetTreninga} />
                <DropDown labela='Trajanje treninga' set={setTrajanje} niz={trajanje} value={trajanjeTreninga} />

                <Box sx={{ alignItems: 'center' }}>
                    <Button onClick={posaljiIzmenu}>ok</Button>
                    <Button onClick={props.onClose}>otkazi</Button>
                </Box>

            </Box>
        </Modal>
    )
}
export default FormaPosaljiPredlog