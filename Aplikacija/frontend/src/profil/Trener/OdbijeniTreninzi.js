import { Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { GetData, PutMetoda, DeleteMetoda } from "../../komponente/Fetch";
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import RasporedTrener from "../../komponente/RasporedTrener";


const OdbijeniTreninzi = () => {

    const { user } = useContext(UserContext);

    const [zahtevi, setZahtevi] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState(false)


  
    return (
        <RasporedTrener prosli = {true}/>
    )

}
export default OdbijeniTreninzi