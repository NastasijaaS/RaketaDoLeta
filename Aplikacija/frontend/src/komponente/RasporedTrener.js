import { useState, Fragment, useEffect } from 'react'
import FormaZakazi from './FormaZakazi'
import Modal from './Modal'
import LogIn from '../pocetna/LoginForma'
import Register from '../pocetna/RegisterForma'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { GetData, PutMetoda } from './Fetch'
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const RasporedTrener = (props) => {

   // console.log(props)

    const { user } = useContext(UserContext);

    const [termini, setTermini] = useState([])
    const [greska, setGreska] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [data, setData] = useState(false)
    const [zakazi, setZakazi] = useState(false)
    const [login, setLogin] = useState(true)


    useEffect(() => {
        GetData(`http://localhost:8800/api/termin/vratiZauzeteTermineZaTreneraPoDatumu/${props.idTrenera}/${props.datum}`, setTermini, setGreska, setIsLoading)
    }, [props.datum])


    return (
        <Fragment>
            <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
                <Table
                    sx={{ maxWidth: 650 }} size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Vreme</TableCell>
                            <TableCell align="right">Trajanje</TableCell>
                            <TableCell align="right">Intenzitet</TableCell>
                            {/* <TableCell align="right">Klijent</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {termini.map((t, i) => (
                            <TableRow
                                key={i}
                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                               
                                <TableCell align="right"> {t.vreme}</TableCell>
                                <TableCell align="right">{t.trajanje}</TableCell>
                                <TableCell align="right">{t.intenzitet}</TableCell>

                             
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

          
        </Fragment>
    )
}

export default RasporedTrener