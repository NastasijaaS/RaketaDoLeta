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
        label: 'First notification'
    },
    {
        id: 1,
        label: 'Second notification'
    },
];

const Zvonce = ({ iconColor, user }) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [greska, setGreska] = useState(false)
    const [refresh, setRefresh] = useState(false)

    // const { user } = useContext(UserContext);


    useEffect(() => {
        const get = async () => {
            await GetData('http://localhost:8800/api/korisnik/vidiZahteve/' + user, setData, setGreska, setIsLoading)
            console.log(refresh)
        }
        get()
    }, [refresh])

    setInterval(() => {
        setRefresh(!refresh)

    }, 10000);

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const newNotifications = `You have ${notifications.length} new notifications!`;
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
            <Tooltip title={notifications.length ? newNotifications : noNotifications}>
                <IconButton
                    color={iconColor}
                    onClick={notifications.length ? handleOpen : null}
                    anchorEl={anchorEl}
                >
                    <Badge
                        badgeContent={notifications.length}
                        color="error"
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Tooltip>

            {/* <Obavestenja
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                menuItems={notifications}
            /> */}

        </div>
    )
}

export default Zvonce