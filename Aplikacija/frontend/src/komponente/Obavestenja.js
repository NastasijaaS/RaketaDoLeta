import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import Delete from '@mui/icons-material/Delete';
import { DeleteMetoda } from './Fetch';
import { ListItemText, Typography, ListItem, Divider, Box, ListItemIcon } from '@mui/material';
import useAxiosPrivate from '../api/useAxiosPrivate';


const Obavestenja = async ({  handleClose, open, menuItems }) => {
  console.log(menuItems)

  const axiosPrivate = useAxiosPrivate()

  const [greska, setGreska] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const obrisiZahtev = async (id) => {

    const zahtev = {
      url: 'http://localhost:8800/api/zahtev/obrisiZahtev/' + id
    }

    // DeleteMetoda(zahtev, setGreska, setIsLoading)

    try {
      await axiosPrivate.delete('http://localhost:8800/api/zahtev/obrisiZahtev/' + id)

    } catch (err) {
      alert('Doslo je do greske')
    }


    if (greska !== false) {
      alert('doslo je do greske')
    }

    handleClose()
  }

  return (
    <Menu
      // id="basic-menu"
      // anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >

      {menuItems.map((item) => (
        <Box key={item._id}>
          <ListItem
            alignItems="flex-start"
          >
            <ListItemText
              // primary={item.status}
              // sx = { {display: 'flex'}}
              secondary={
                <Typography
                  // sx={{ display: 'inline', alignItems: 'center'}}
                  component="div"
                  variant="body2"
                  color="text.primary"
                >
                  {item.poruka ? item.poruka : "Novi zahtev"}

                </Typography>
              }
            />
            <ListItemIcon className='cardCenter' sx={{ marginTop: '0%', marginLeft: '2px', minWidth: '0px' }}>
              <Delete onClick={() => { obrisiZahtev(item._id) }} />
            </ListItemIcon>
          </ListItem>
          <Divider />
        </Box>
      ))}

      {/* </List> */}
    </Menu>

  )
}

export default Obavestenja