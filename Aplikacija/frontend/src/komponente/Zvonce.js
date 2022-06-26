import React, { useState, useEffect, useCallback } from 'react'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Obavestenja from './Obavestenja'
import { GetData } from './Fetch';
import useAxiosPrivate from '../api/useAxiosPrivate'

const notifications = [
    {
        id: 0,
        poruka: 'vas trening za datum je odobren'
    },
    {
        id: 1,
        poruka: 'vas trening za datum je odbijen'
    },
];

const Zvonce = ({ iconColor, user, status }) => {

    const axiosPrivate = useAxiosPrivate()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [greska, setGreska] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data1, setData1] = useState([])

    // const { user } = useContext(UserContext);


    useEffect(() => {
        let url = ''
        if (status) {
            //  GetData('http://localhost:8800/api/korisnik/vidiZahteve/' + user + '/' + status, setData1, setGreska, setIsLoading)
            url = 'http://localhost:8800/api/zahtev/vidiZahteve/' + user + '/' + status
        }
        else {
            //  GetData('http://localhost:8800/api/korisnik/vidiZahteveZaKorisnika/' + user, setData, setGreska, setIsLoading)
            url = 'http://localhost:8800/api/zahtev/vidiZahteveZaKorisnika/' + user
        }

        // const get = async () => {
        //     const res = await fetch(url, {
        //         method: 'GET',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //             
        //         },
        //     })
        //     if (res.ok) {
        //         // console.log(await res.json())

        //         const obavestenja = await res.json()
        //         if (data !== obavestenja) {
        //             setData(obavestenja)
        //         }
        //     }
        // }

        const get = async () => {
            await axiosPrivate.get(url).then(res => {
                if (res.status === 200) {

                    if (res.data && data !== res.data) {
                        setData(res.data)
                    }
                    console.log(data)
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
    // }, 1000);

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const newNotifications = `You have ${data.length} new notifications!`;
    const noNotifications = 'No new notifications';

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title={data.length ? newNotifications : noNotifications}>
                <IconButton
                    sx={{ color: 'white' }}
                    onClick={data?.length ? handleOpen : null}
                >
                    <Badge
                        badgeContent={data?.length}
                        color="error"
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Obavestenja
                open={open}
                handleClose={handleClose}
                menuItems={data}
                anchorEl={anchorEl}
                refresh = { () => setRefresh(!refresh)}
            />

        </div>
    )
}

export default Zvonce