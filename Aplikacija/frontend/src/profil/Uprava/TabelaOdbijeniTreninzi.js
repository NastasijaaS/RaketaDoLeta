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

const OdbijeniTreninzi = () => {

    const [nizUsluga, setUsluge] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [izmeni, setIzmena] = useState(-1)
    const [data, setData] = useState('')


    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        const get = async () => {
            await
                GetData("http://localhost:8800/api/uprava/vratiZahteveOdbijeni", setUsluge, setGreska, setIsLoading)
        }
        get()
    }, [refresh])

    return (
        <div>
            odbijeni treninzi
        </div>
    )

}

export default OdbijeniTreninzi