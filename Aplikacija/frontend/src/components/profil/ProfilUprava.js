import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabela from '../komponente/Tabela';


//dodaj clanarinu korisniku
//obrisi korisnika
//update bilo kog korisnika



//dodaj izmeni obrisi uslugu
//dodaj sertifikat treneru

//zahtev za treningom
//obrisi odbijen trening

//dodaj obrisi izmeni blog


const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div hidden={value !== index}>

            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
            
        </div>
    );
}

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };

export const Uprava = () => {
    const [value, setValue] = React.useState(0);

    const promeniTab = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={promeniTab}
                sx={{ borderRight: 1, borderColor: 'divider' }} >

                <Tab label="Korisnici" />
                <Tab label="Neverifikovani nalozi" />


                <Tab label="Usluge" />
                <Tab label="Treneri" />
                <Tab label="Treninzi" />

            </Tabs>

            <TabPanel value={value} index={0}>
                <Tabela verifikovan={true} />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Tabela verifikovan={false} />
            </TabPanel>

            <TabPanel value={value} index={2}>
                Usluge
            </TabPanel>

            <TabPanel value={value} index={3}>
                Treneri
            </TabPanel>

            <TabPanel value={value} index={4}>
                Treninzi
            </TabPanel>

        </Box>
    );
}
export default Uprava