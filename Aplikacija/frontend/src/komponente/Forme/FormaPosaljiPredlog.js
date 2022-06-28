import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { Box } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { PutMetoda } from '../Fetch'
import Modal from '../Modal'
import { UserContext } from "../../context/UserContext";


const DropDown = ({ labela, set, niz, value }) => {
    return (<FormControl sx={{ minWidth: 150, }}>
        <InputLabel>{labela}</InputLabel>
        <Select
            label={labela}
            value={value}
            size='small'
            onChange={(ev) => {
                set(ev.target.value)
            }}
        >
            {
                niz.map(n => (
                    <MenuItem key={n} value={n}>{n}</MenuItem>
                ))
            }

        </Select>
    </FormControl>)
}


const tip = ["Gornji deo tela", "Donji deo tela", "Kardio"]
const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h", "1h30min", "2h"]

const FormaPosaljiPredlog = (props) => {

    const [tipTreninga, setTip] = useState('')
    const [intenzitetTreninga, setIntenzitet] = useState('')
    const [trajanjeTreninga, setTrajanje] = useState('')

    const {user} = useContext(UserContext)

    const posaljiIzmenu = () => {

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