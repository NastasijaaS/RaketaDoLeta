import { useState, useEffect } from 'react';
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

// TablePaginationActions.propTypes = {
//     count: PropTypes.number.isRequired,
//     onPageChange: PropTypes.func.isRequired,
//     page: PropTypes.number.isRequired,
//     rowsPerPage: PropTypes.number.isRequired,
// };

const data = [
    { ime: "ime", prezime: 'prezime', broj: 12, datum: '02.03.2022' },
    { ime: "ime1", prezime: 'prezime1', broj: 3, datum: '22.03.2022' },
    { ime: "ime2", prezime: 'prezime2', broj: 123, datum: '22.03.2022' },
    { ime: "ime3", prezime: 'prezime3', broj: 55, datum: '22.03.2022' },
    { ime: "ime4", prezime: 'prezime4', broj: 345, datum: '22.03.2022' },
    { ime: "ime5", prezime: 'prezime5', broj: 13, datum: '22.03.2022' },
]


export default function Tabela(props) {

    // const [data, setData] = useState('')
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {
    //     if (props.verifikovan) {
    //         //get korisnici

    //         GetData("http://localhost:8800/api/uprava/sviKorisnici" , setData, setGreska)
    //     }
    //     else {
    //         GetData("http://localhost:8800/api/uprava/neverifikovaniKorisnici" , setData, setGreska)
    //         //get neverifikovani
    //     }

    // }, [])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [rows, setRows] = useState(data);
    const [searchName, setSearchName] = useState("");
    const [searchBroj, setSearchBroj] = useState("");

    const searchByName = (ev) => {

        const filteredRows = data.filter((row) => {
            return (row.ime + ' ' + row.prezime).toLowerCase().includes(ev.target.value.toLowerCase());
        });
        setRows(filteredRows)
        setSearchName(ev.target.value);
    }

    const searchByBroj = (ev) => {

        const filteredRows = data.filter((row) => {
            return row.broj.toString().includes(ev.target.value.toLowerCase());
        })

        setRows(filteredRows)
        setSearchBroj(ev.target.value);
    }

    const cancelSearch = () => {
        setSearchBroj("");
        setSearchName('')
        setRows(data)
    };

    const obrisiKorisnika = async (props) => {

        // const zahtev = {
        //     url: 'http://localhost:8800/api/uprava/' + props.id
        // }

        // await DeleteMetoda(zahtev, setGreska, setIsLoading)

        // if (greska !== 'false') {
        //     alert('doslo je do greske')
        // }
    }

    const unesiClanarinu = (props) => {
        ///dodajClanarinu/:idKorisnika/:idUsluge

        // const zahtev = {
        //     url: 'http://localhost:8800/api/uprava/dodajClanarinu/' + props.idKorisnika + '/' + props.idUsluge
        // }

        // await PutMetoda(zahtev, setGreska, setIsLoading)

        // if (greska !== 'false') {
        //     alert('doslo je do greske')
        // }
    }

    const verifikujNalog = (props) => {

        // const zahtev = {
        //     url: 'http://localhost:8800/api/uprava/verifikuj/' + props.idKorisnika 
        // }

        // await PutMetoda(zahtev, setGreska, setIsLoading)

        // if (greska !== 'false') {
        //     alert('doslo je do greske')
        // }
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
                    <input onChange={searchByBroj} value={searchBroj} className='search' placeholder="broj clanske karte" />
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
                        <TableRow>

                            <TableCell>
                                Ime i prezime
                            </TableCell>

                            <TableCell>
                                Broj clanske karte
                            </TableCell>

                            <TableCell>
                                Datum isteka clanarine
                            </TableCell>

                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (

                            <TableRow key={row.ime}>

                                <TableCell style={{ width: 160 }} component="th" scope="row">
                                    {row.ime + ' ' + row.prezime}
                                </TableCell>

                                <TableCell style={{ width: 160 }} align="right">
                                    {row.broj}
                                </TableCell>

                                <TableCell style={{ width: 160 }} align="right">
                                    {row.datum}
                                </TableCell>

                                {!props.verifikovan && <TableCell style={{ width: 160 }} align="right">
                                    <Button
                                        onClick={() => verifikujNalog('row.id')}
                                        size="medium"
                                        variant="text">
                                        Verifikuj
                                    </Button>
                                </TableCell>}

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
                                        onClick={() => obrisiKorisnika('row.id')}
                                        size="medium"
                                        variant="outlined"
                                        color="error"
                                        startIcon={<DeleteIcon />}>
                                        Obrisi
                                    </Button>
                                </TableCell>

                            </TableRow>
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
