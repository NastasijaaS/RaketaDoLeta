import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabela from './Uprava/TabelaKorisnici';
import TabelaUsluge from './Uprava/TabelaUsluge';
import OdbijeniTreninzi from './Uprava/TabelaOdbijeniTreninzi';
import TabelaTreneri from './Uprava/TabelaTreneri';
import { Grid } from "@mui/material";
import Blogovi from "./Uprava/Blogovi";

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

export const Uprava = () => {

    const [tab, seTab] = useState(0);

    const promeniTab = (event, newValue) => {
        seTab(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
            <Grid container>
                <Grid item xs={12} sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
                    <Tabs
                        position="sticky"
                        orientation="horizontal"
                        variant="scrollable"
                        scrollButtons
                        value={tab}
                        onChange={promeniTab}
                    >
                        <Tab label="Korisnici"  />
                        <Tab label="Neverifikovani nalozi" />
                        <Tab label="Usluge" />
                        <Tab label="Treneri" />
                        <Tab label="Blogovi" />
                        {/* <Tab label="Treninzi" /> */}

                    </Tabs>
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Tabs
                        position="sticky"
                        orientation="vertical"
                        variant="scrollable"
                        value={tab}
                        onChange={promeniTab}
                        sx={{ borderRight: 1, borderColor: 'divider' }} >

                        <Tab label="Korisnici" />
                        <Tab label="Neverifikovani nalozi" />
                        <Tab label="Usluge" />
                        <Tab label="Treneri" />
                        <Tab label="Blogovi" />
                        {/* <Tab label="Treninzi" /> */}

                    </Tabs>
                </Grid>
                <Grid item xs={12} md={10}>

                    <TabPanel value={tab} index={0}>
                        <Tabela verifikovan={true} />
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Tabela verifikovan={false} />
                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <TabelaUsluge />
                    </TabPanel>

                    <TabPanel value={tab} index={3}>
                        <TabelaTreneri />
                    </TabPanel>

                    <TabPanel value={tab} index={4}>
                        <Blogovi/>
                    </TabPanel>

                    {/* <TabPanel value={tab} index={4}>
                        <OdbijeniTreninzi />
                    </TabPanel> */}
                </Grid>
            </Grid>
        </Box>
    );
}
export default Uprava