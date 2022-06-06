import { useState, useEffect, useRef, Fragment } from 'react'
import { GetData, DeleteMetoda, PutMetoda, PostMetoda } from '../../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Box, Modal, Typography } from '@mui/material';
import '../../styles/input.css'
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';

//vratiZahteveOdbijeni

const TabelaTreneri = () => {

    const [refresh, setRefresh] = useState(false)

    const [sviTreneri, setTreneri] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiTrenerePersonalni", setTreneri, setGreska, setIsLoading)
    }, [refresh])


    return (
        <div>
            Treneri

            <button>novi trener</button>

            <table>
                <thead>
                    <tr>
                        <th>ime</th>
                        <th>prezime</th>
                        <th>email</th>
                        <th>broj telefona</th>
                    </tr>
                </thead>
                <tbody>
                    {sviTreneri.map((tr) => (
                        <tr key={tr.email}>
                            <td>{tr.ime}</td>
                            <td>{tr.prezime}</td>
                            <td>{tr.email}</td>
                            <td>{tr.brojTelefona}</td>
                            <td><button>obrisi</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>


        </div >
    )

}

export default TabelaTreneri