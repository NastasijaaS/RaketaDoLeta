import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';



const usluge = ['usluga1', 'usluga2', 'usluga3', 'usluga4', 'usluga12', 'usluga22', 'usluga23', 'usluga42']
function CheckboxesGroup() {
    return (
        <RadioGroup
            defaultValue="female"
            name="radio-buttons-group"
            sx={{ justifyContent: 'center' }}
        >
            <Grid container spacing={4} sx={{ justifyContent: 'center' }} >
                <Grid item xs={6} sm={6} sx={{ justifyContent: 'center' }}>

                    {usluge.map((usl) => (
                        <FormControlLabel key={usl} value={usl} control={<Radio />} label={usl} />
                    ))}

                </Grid>
            </Grid>
        </RadioGroup >
    )

    // return (
    // <FormControl>
    {/* 
<Grid container spacing={2}>
  <Grid item xs={6} md={8}>
    <Item>xs=6 md=8</Item>
  </Grid>
  </Grid> */}


    {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */ }
    {/* <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                {
                    usluge.map((usl) => (
                        <FormControlLabel key={usl} value={usl} control={<Radio />} label={usl} />
                    ))
                }

            </RadioGroup> */}
    {/* </FormControl> */ }
    // )

}

function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}



function Row(props) {
    // const { row } = props;
    const [open, setOpen] = React.useState(false);
    const row = { ime: 'ime', prezime: 'prezime', email: 'email' }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell component="th" scope="row">
                    {row.ime}
                </TableCell>
                <TableCell align="right">{row.prezime}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    <Button
                        size="medium"
                        variant="text">
                        Verifikuj
                    </Button>
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                    <Button
                        size="medium"
                        variant="text">
                        Verifikuj
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

                            <Box size="small" sx={{ dispay: 'flex' ,  justifyContent: 'center'}} >
                                <CheckboxesGroup />
                                <Button
                                    size="medium"
                                    variant="contained">
                                    Plati
                                </Button>
                            </Box>

                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function Proba() {
    console.log('proba')
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
}