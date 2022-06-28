import { useState, useEffect, useContext, Fragment } from 'react'
import { GetData, DeleteMetoda, PutMetoda, PostMetoda } from '../../komponente/Fetch'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { UserContext } from '../../context/UserContext';
import Modal from '../../komponente/Modal'
import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Register from '../../pocetna/RegisterForma';
import DodajTrenera from '../../komponente/Forme/FormaDodajTrenera';
import useAxiosPrivate from '../../api/useAxiosPrivate';
import TabelaZaReciklazu from "../../komponente/Tabele/TabelaZaReciklazu"
import CircularProgress from '@mui/material/CircularProgress';


const TabelaTreneri = () => {

    const axiosPrivate = useAxiosPrivate()

    const { user } = useContext(UserContext);

    const [refresh, setRefresh] = useState(false)

    const [sviTreneri, setTreneri] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [idTrenera, setIdTrenera] = useState(false)


    const [dodaj, setDodaj] = useState(false)
    // ovde krece steper
    const steps = ['Registruj trenera', 'Dodaj trenera'];

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Register sx={{ margin: '0%' }} setIdTrenera={setIdTrenera} />;
            case 1:
                return <DodajTrenera idTrenera={idTrenera} />;
            default:
                throw new Error('Unknown step');
        }
    }

    function onClose() {
        setActiveStep(0)
    }
    //ovde se zavrsava

    useEffect(() => {
        // GetData("http://localhost:8800/api/trener/vidiTrenereSvi", setTreneri, setGreska, setIsLoading)

        const get = async () => {
            setIsLoading(true)
            try {
                const res = await axiosPrivate.get("http://localhost:8800/api/trener/vidiTrenereSvi")
                if (res.data) {
                    setTreneri(res.data)
                    console.log(res.data)
                }
                setIsLoading(false)

            } catch (err) {
                setIsLoading(false)
                alert('Doslo je do greske')
            }
        }
        get()

    }, [refresh])

    const obrisiTrenera = async (id) => {
        const zahtev = {
            url: 'http://localhost:8800/api/trener/obrisiTrenera/' + id,
        }

        //    console.log(zahtev)

        //DeleteMetoda(zahtev, setGreska, setIsLoading)

        try {
            await axiosPrivate.delete('http://localhost:8800/api/trener/obrisiTrenera/' + id)

        } catch (err) {
            alert('Doslo je do greske')
        }

        // if (greska !== false) {
        //     alert('doslo je do greske')
        // }
        setRefresh(!refresh)
    }

    const head = ['Ime', 'Prezime', 'E-mail']
    const rowName = ['ime', 'prezime', 'email']

    if (isLoading)
        return (<Box><CircularProgress /></Box>)

    return (
        <div>
            <Button size="medium"
                variant="outlined"
                onClick={() => setDodaj(true)}>novi trener</Button>

            <TabelaZaReciklazu head={head} rows={sviTreneri} rowName={rowName} onDelete={obrisiTrenera} search1='ime' search2='prezime' />


            {/* <Table>
                <TableHead>
                    <TableRow>
                        <th>ime</th>
                        <th>prezime</th>
                        <th>email</th>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {sviTreneri.map((tr,i) => (
                        <TableRow key={i}>
                            <TableCell>{tr.ime}</TableCell>
                            <TableCell>{tr.prezime}</TableCell>
                            <TableCell>{tr.email}</TableCell>

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
            </Table> */}

            {dodaj
                &&
                <Modal onClose={() => { setDodaj(false); handleReset() }}>
                    <Box sx={{ width: '100%' }}>
                        <Stepper sx={{ mt: '1vh' }} activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <Fragment>
                                <Typography component='div' variant='h4' className='cardCenter' sx={{ width: '100%', height: '50vh' }}>
                                    Uspesno dodat trener!
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </Fragment>
                        ) : (
                            <Fragment >
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Button onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Box>
                            </Fragment>
                        )}
                    </Box>
                </Modal>}


        </div >
    )

}

export default TabelaTreneri