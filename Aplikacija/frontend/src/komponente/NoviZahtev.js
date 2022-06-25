import { Fragment } from "react"
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Badge } from '@mui/material';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { UserContext } from '../context/UserContext';
import Zvonce from './Zvonce'
import { GetData } from './Fetch'
import useAxiosPrivate from "../api/useAxiosPrivate";

const NoviZahtev = () => {
    const { user } = useContext(UserContext);

    const axiosPrivate = useAxiosPrivate()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [greska, setGreska] = useState(false)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {

        //GetData('http://localhost:8800/api/zahtev/vidiZahteve/' + user.id + '/Na cekanju', setData, setGreska, setIsLoading)

        const get = async () => {
            await axiosPrivate.get('http://localhost:8800/api/zahtev/vidiZahteve/' + user.id + '/Na cekanju')
                .then(res => {
                    if (res.status === 200) {

                        if (res.data ) {
                            setData(res.data)
                        }
                    }
                }).catch((error) => {
                    alert('Doslo je do greske')
                    console.log(error)
                });
        }
        get()

    }, [refresh])

    // setInterval(() => {
    //     setRefresh(!refresh)
    // }, 10000);

    return (
        <Fragment>
            <Badge
                badgeContent={data.length}
                color="error"
            >
                <Button
                    href={`/RDL/trener/${user.ime}/zahtevi`}
                    sx={{ m: 0, color: 'white', textAlign: 'center', display: 'block' }}
                >
                    Zahtevi
                </Button>
            </Badge>
        </Fragment>
    )
}
export default NoviZahtev