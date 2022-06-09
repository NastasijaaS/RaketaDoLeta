import { useState, useEffect, useContext, Fragment, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteMetoda, PutMetoda, GetData } from '../../komponente/Fetch'
import axios from 'axios'
import { UserContext } from '../../context/UserContext';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Modal from '../../komponente/Modal'
import DodajNapredak from '../../komponente/DodajNapredak';
import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Kartica = ({ k }) => {
    let navigate = useNavigate()
    return (
        <Card sx={{ maxWidth: 345 }} onClick={() => {
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
        </Card>
    )
}

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


    return (
        <div>

            {korisnici.map((k, i) => (
                <Box key={k.idkorisnika}>
                    <Kartica k={k} />

                    <Button onClick={() => { izbaciKlijenta(k.idkorisnika) }}>Izbaci klijenta</Button>

                </Box>
            ))}
        </div>
    )



}
export default KorisniciTrenera