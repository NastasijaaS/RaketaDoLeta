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
import '../../styles/tabela.css'
import { DeleteMetoda, PutMetoda, GetData } from './Fetch'
import axios from 'axios'
import { UserContext } from '../../context/UserContext';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import Proba from './Proba'
import { FormControl } from '@mui/material';

function TablePaginationActions(props) {

    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    return (
        <Box sx={{ flexShrink: 0 }}>

            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>

            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>

        </Box>
    );
}



export default function Tabela(props) {

    let buttonSelected = ''

    const { user } = useContext(UserContext);

    const [korisnici, setKorisnici] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [nizUsluga, setUsluge] = useState([])
    const [nalog, setNalog] = useState('')


    useEffect(() => {

        const getKorisnici = async (url) => {
            await axios.get(url).then(p => {

                if (p.status === 200) {
                    setKorisnici(p.data)
                    setRows(p.data)
                }
            }).catch((error) => {
                alert('Doslo je do greske')
                console.log('greska prilko ucitavanja korisnika: ' + error)
            });
        }

        if (props.verifikovan) {
            getKorisnici("http://localhost:8800/api/uprava/vratiVerifikovaneNaloge")
        }
        else {
            getKorisnici("http://localhost:8800/api/uprava/vratiNeverifikovaneNaloge")
        }

    }, [refresh])

    useEffect(() => {
        GetData("http://localhost:8800/api/korisnik/vidiUsluge", setUsluge, setGreska, setIsLoading)
    }, [])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - korisnici.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [rows, setRows] = useState(korisnici)
    const [searchName, setSearchName] = useState("");
    const [searchBroj, setSearchBroj] = useState("");

    const searchByName = (ev) => {
        const filteredRows = korisnici.filter((row) => {
            return (row.ime + ' ' + row.prezime).toLowerCase().includes(ev.target.value.toLowerCase());
        });
        setRows(filteredRows)
        setSearchName(ev.target.value);
    }

    const searchByBroj = (ev) => {

        const filteredRows = korisnici.filter((row) => {
            return row.email.toString().includes(ev.target.value.toLowerCase());
        })

        setRows(filteredRows)
        setSearchBroj(ev.target.value);
    }

    const cancelSearch = () => {
        setSearchBroj("");
        setSearchName('')
        setRows(korisnici)
    };

    const obrisiKorisnika = async (id) => {

        const zahtev = {
            url: 'http://localhost:8800/api/uprava/' + user.id,
            body: {
                korisnikId: id
            }
        }

        await DeleteMetoda(zahtev, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')
        }
        setRefresh(!refresh)

    }



    const unesiClanarinu = async (idKorisnika) => {
        // console.log(buttonSelected)
        // console.log(idKorisnika)

        ///dodajClanarinu/:idKorisnika/:idUsluge

        const zahtev = {
            url: 'http://localhost:8800/api/uprava/dodajClanarinu/' + idKorisnika + '/' + buttonSelected
        }

        await PutMetoda(zahtev, setNalog, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')
            console.log(greska)
        }
    }

    const verifikujNalog = async (id) => {

        const zahtev = {
            url: 'http://localhost:8800/api/uprava//verifikujNalog/' + id
        }

        await PutMetoda(zahtev, setNalog, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')
        } else {
            setRefresh(!refresh)
        }

    }


    const handleRadioChange = (ev) => {
        ev.preventDefault();

        buttonSelected = ev.target.value;
    }

    const RadioButtons = (props) => {

        return (
            <RadioGroup
                sx={{ justifyContent: 'center' }}
            >
                <Grid container spacing={4} sx={{ justifyContent: 'center' }} >
                    <Grid item xs={6} sm={6} sx={{ justifyContent: 'center' }} >

                        {nizUsluga.map((usl) => (
                            <FormControlLabel
                                key={usl._id}
                                value={usl._id}
                                control={<Radio />}
                                onChange={handleRadioChange}
                                label={usl.opis} />

                        ))}
                    </Grid>
                </Grid>

                <Button
                    size="medium"
                    variant="text"
                    onClick={() => unesiClanarinu(props.idKorisnika)}
                >
                    Plati
                </Button>
            </RadioGroup >

        )
    }

    const Red = ({ row }) => {

        const [open, setOpen] = useState(false);

        return (
            <Fragment>
                < TableRow >
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => { setOpen(!open) }}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>

                    <TableCell style={{ width: 160 }} component="th" scope="row">
                        {row.ime + ' ' + row.prezime}
                    </TableCell>

                    <TableCell style={{ width: 160 }} align="right">
                        {row.email}
                    </TableCell>

                    {
                        !props.verifikovan && <TableCell style={{ width: 160 }} align="right">
                            {row.datumUplate}
                        </TableCell>
                    }

                    {
                        !props.verifikovan && <TableCell style={{ width: 160 }} align="right">
                            <Button
                                onClick={() => verifikujNalog(row.id)}
                                size="medium"
                                variant="text">
                                Verifikuj
                            </Button>
                        </TableCell>
                    }
                    <TableCell style={{ width: 160 }} align="right">
                        <Button
                            onClick={() => unesiClanarinu('row.id', 'idUsluge')}
                            size="small"
                            variant="text">
                            Plati clanarinu
                        </Button>
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                        <Button
                            onClick={() => obrisiKorisnika(row.id)}
                            size="medium"
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}>
                            Obrisi
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Usluge
                                </Typography>

                                <Box size="small" sx={{ dispay: 'flex', justifyContent: 'center' }} >
                                    <RadioButtons idKorisnika={row.id} />
                                </Box>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow >
            </Fragment>)
    }

    return (
        <Paper>
            <div className='divZaSearch'>
                <div>
                    <SearchIcon />
                    <input className='search' value={searchName} placeholder="ime i prezime" onChange={searchByName} />
                </div>

                <div>
                    <SearchIcon />
                    <input onChange={searchByBroj} value={searchBroj} className='search' placeholder="e-mail" />
                </div>

                <div>
                    <Button onClick={cancelSearch} size="medium" variant="outlined" color="error" >
                        Otkazi
                    </Button>

                </div>

            </div>

            <TableContainer >
                <Table>
                    <TableHead>
                        {/* <TableRow sx={{ 'borderBottom': '1px solid rgba(224, 224, 224, 1) ' }}>

                            <TableCell sx={{ 'textAlign': 'center' }}>
                                Ime i prezime
                            </TableCell>

                            <TableCell sx={{ 'textAlign': 'center' }}>
                                E-mail
                            </TableCell>
                            {props.verifikovan && <TableCell sx={{ 'textAlign': 'center' }}>
                                Datum isteka clanarine
                            </TableCell>}
                        </TableRow> */}
                    </TableHead>
                    <TableBody>
                        {
                            (rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <Red key={row.email} row={row} />
                            ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        <TableRow>

                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />

                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper >
    )
}
