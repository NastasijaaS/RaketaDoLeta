import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabela from './Uprava/TabelaKorisnici';
import TabelaUsluge from './Uprava/TabelaUsluge';
import OdbijeniTreninzi from './Uprava/TabelaOdbijeniTreninzi';
import TabelaTreneri from './Uprava/TabelaTreneri';


//izmeni korisnika


//obrisi klijenta
//get klijente
//napredak za klijenta

//zakazi grupni trening
//get treninzi

//prihvati trening
//dodaj evidenciju
//pogledaj evidenciju

//izmeni trening
//zakazi grupni trening

//dodaj profilnu sliku
//dodaj opis

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


const Trener = (props) => {

    const [value, setValue] = React.useState(0);

    const promeniTab = (event, newValue) => {
        setValue(newValue);
    };

    return (<Box sx={{ bgcolor: 'background.paper' }}>
        {/* <Tabs
            style={{ position: 'sticky' }}
            position="sticky"
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={promeniTab}
            sx={{ borderRight: 1, borderColor: 'divider' }} >

            <Tab label="Profil" />
            <Tab label="Korisnici" />
            <Tab label="zahetevi" />
            <Tab label="Treninzi" />

        </Tabs>

        <TabPanel value={value} index={0}>

        </TabPanel>

        <TabPanel value={value} index={1}>
            <Tabela verifikovan={true} trener = {true}/>
        </TabPanel>

        <TabPanel value={value} index={2}>

        </TabPanel>

        <TabPanel value={value} index={3}>

        </TabPanel>

        <TabPanel value={value} index={4}>

        </TabPanel> */}

    </Box>
    );
}

export default Trener