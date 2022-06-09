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
import DodajTrenera from '../../komponente/DodajTrenera';


const TabelaTreneri = () => {

    const { user } = useContext(UserContext);

    const [refresh, setRefresh] = useState(false)

    const [sviTreneri, setTreneri] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
                return <Register />;
            case 1:
                return <DodajTrenera />;
            default:
                throw new Error('Unknown step');
        }
    }

    function onClose() {
        setActiveStep(0)
    }
    //ovde se zavrsava

    useEffect(() => {
        const get = async () => { await GetData("http://localhost:8800/api/korisnik/vidiTrenereSvi", setTreneri, setGreska, setIsLoading) }
        get()
    }, [refresh])

    const obrisiTrenera = async (id) => {
        const zahtev = {
            url: 'http://localhost:8800/api/uprava/obrisiTrenera/' + id,

        }

    //    console.log(zahtev)

        await DeleteMetoda(zahtev, setGreska, setIsLoading)

        if (greska !== false) {
            alert('doslo je do greske')
        }
        setRefresh(!refresh)
    }


    return (
        <div>
            <Button size="medium"
                variant="outlined"
                onClick={() => setDodaj(true)}>novi trener</Button>

            <Table>
                <TableHead>
                    <TableRow>
                        <th>ime</th>
                        <th>prezime</th>
                        <th>email</th>
                      
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sviTreneri.map((tr) => (
                        <TableRow key={tr.id}>
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
            </Table>

            {dodaj
                &&
                <Modal onClose={() => { setDodaj(false); handleReset() }}>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
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
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    Uspesno dodat trener!
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </Fragment>
                        ) : (
                            <Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 2 }}>
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