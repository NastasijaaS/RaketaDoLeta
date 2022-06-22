import { useState, Fragment, useEffect } from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { GetData, PutMetoda, DeleteMetoda } from './Fetch'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const RasporedTrener = (props) => {

    // console.log(props)

    const { user } = useContext(UserContext);

    const [termini, setTermini] = useState([])
    const [greska, setGreska] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [data, setData] = useState(false)
    const [grupniTreninzi, setGrupniTreninzi] = useState([])
    const [reload, setReload] = useState(false)


    useEffect(() => {

        GetData(`http://localhost:8800/api/termin/vratiZauzeteTermineZaTreneraPoDatumu/${props.idTrenera}/${props.datum}`, setTermini, setGreska, setIsLoading)
        GetData(`http://localhost:8800/api/trener/vratiTreningeGrupni/${props.idTrenera}/${props.datum}`, setGrupniTreninzi, setGreska, setIsLoading)

    }, [props.datum, reload])

    const unesiEvidenciju = (treningId, korisnikId)=>{

        const zahtev = {
            url: 'http://localhost:8800/api/trener/izmeniEvidenciju/'+user.trenerId+'/'+treningId,
            body: {
                korisnikId:korisnikId  
            }
        }

      PutMetoda(zahtev, setData, setGreska, setIsLoading)

      setReload(!reload)
    }

    const obrisiTrening = (treningId) => {

        const zahtev = {
            url: 'http://localhost:8800/api/uprava/obrisiTrening/'+treningId,
          
        }

      DeleteMetoda(zahtev, setData, setGreska, setIsLoading)

      setReload(!reload)

    }

    const Tabela = ({ row, niz }) => {
        return (
            <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
                <Table
                    sx={{ maxWidth: 650 }} size="small" >
                    <TableHead>
                        <TableRow>
                            {row.map((r, i) => (
                                <TableCell key={i} align="right">{r}</TableCell>
                            ))}
                            <TableCell> </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {niz.map((t, i) => (
                            <TableRow key={i}>

                                <TableCell align="right"> {t.vreme}</TableCell>
                                <TableCell align="right">{t.trajanje}</TableCell>
                                <TableCell align="right">{t.intenzitet}</TableCell>

                                {t.imeK && <TableCell align="right">{t.imeK} {t.prezimeK}</TableCell>}
                                {t.brojSlobodnihMesta && <TableCell align="right">{t.brojSlobodnihMesta}</TableCell>}
                                <TableCell align = "right">
                                    <IconButton sx={{ p: 0, color: 'green' }} onClick = { () => unesiEvidenciju(t.treningId, t.korisnikId)}>
                                        <CheckCircleIcon  sx ={{fontSize: "1em" }} />
                                    </IconButton>
                                    <IconButton sx={{ p: 0, color: 'red'}}  onClick = { () => obrisiTrening(t.treningId)} >
                                        <CancelIcon sx ={{fontSize: "1em" }}/>
                                    </IconButton>  
                                </TableCell>  
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    const rowPersonalni = ['Vreme', 'Trajanje', 'Intenzitet', 'Klijent']
    const rowGrupni = ['Vreme', 'Trajanje', 'Intenzitet', 'Mesta']


    return (
        <Fragment>

            <Typography variant='h5' >Personalni treninzi</Typography>

            {termini.length !== 0 ?
                <Tabela row={rowPersonalni} niz={termini} />
                :
                <Typography color='error'>Nemate zakazanih personalnih treninga za danas</Typography>
            }

            <Typography  variant='h5'>Grupni treninzi</Typography>

            {grupniTreninzi.length !== 0 ?

                <Tabela row={rowGrupni} niz={grupniTreninzi} />
                :
                <Typography color='error'>Nemate zakazanih grupnih treninga za danas</Typography>
            }

        </Fragment>
    )
}

export default RasporedTrener