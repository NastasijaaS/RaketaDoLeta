import { useState, useEffect, useRef, Fragment } from 'react'
import { GetData, DeleteMetoda, PutMetoda, PostMetoda } from '../../komponente/Fetch'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

import Modal from '../../komponente/Modal'


const TabelaTreneri = () => {

    const [refresh, setRefresh] = useState(false)

    const [sviTreneri, setTreneri] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [dodaj, setDodaj] = useState(false)

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiTrenerePersonalni", setTreneri, setGreska, setIsLoading)
    }, [refresh])



    const obrisiTrenera = (id) => {
        // const zahtev = {
        //     url: 'http://localhost:8800/api/uprava/obrisiTrenera' + user.id,
        //     body: {
        //         trenerId: id
        //     }
        // }

        // await DeleteMetoda(zahtev, setGreska, setIsLoading)

        // if (greska !== false) {
        //     alert('doslo je do greske')
        // }
        // setRefresh(!refresh)
    }

    const dodajTrenera = () => {

    }

    return (
        <div>
            Treneri

            <Button size="medium"
                variant="outlined" 
                onClick={() => setDodaj(true)}>novi trener</Button>

            <Table>
                <TableHead>
                    <TableRow>
                        <th>ime</th>
                        <th>prezime</th>
                        <th>email</th>
                        <th>broj telefona</th>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sviTreneri.map((tr) => (
                        <TableRow key={tr.email}>
                            <TableCell>{tr.ime}</TableCell>
                            <TableCell>{tr.prezime}</TableCell>
                            <TableCell>{tr.email}</TableCell>
                            <TableCell>{tr.brojTelefona}</TableCell>
                            <TableCell><Button
                                onClick={() => obrisiTrenera(tr.id)}
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}>
                                Obrisi
                            </Button></TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>

            {dodaj && <Modal onClose={() => setDodaj(false)}>
                <div>nesto</div>
            </Modal>}


        </div >
    )

}

export default TabelaTreneri