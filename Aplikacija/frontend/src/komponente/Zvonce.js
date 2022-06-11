import React, { useState, useEffect } from 'react'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Obavestenja from './Obavestenja'
import { GetData } from './Fetch';


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

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [greska, setGreska] = useState(false)
    const [refresh, setRefresh] = useState(false)

    // const { user } = useContext(UserContext);


    useEffect(() => {
        // if (status) {
        //     GetData('http://localhost:8800/api/korisnik/vidiZahteve/' + user + '/' + status, setData, setGreska, setIsLoading)
        // }
        // else {
            GetData('http://localhost:8800/api/korisnik/vidiZahteveZaKorisnika/' + user, setData, setGreska, setIsLoading)
        // }
    }, [refresh])

    // setInterval(() => {
    //     setRefresh(!refresh)
    // }, 10000);

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
                    color={iconColor}
                    onClick={data.length ? handleOpen : null}
                //  anchorEl={anchorEl}
                >
                    <Badge
                        badgeContent={data.length}
                        color="error"
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Obavestenja
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                menuItems={data}
            />

        </div>
    )
}

export default Zvonce