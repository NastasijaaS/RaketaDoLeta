import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import Delete from '@mui/icons-material/Delete';
import { DeleteMetoda } from '../Fetch';
import { ListItemText, Typography, ListItem, Divider, Box, ListItemIcon, ButtonBase } from '@mui/material';
import useAxiosPrivate from '../../api/useAxiosPrivate';


const Obavestenja =  ({  handleClose, open, menuItems, anchorEl,refresh }) => {
  //console.log(menuItems)

  const axiosPrivate = useAxiosPrivate()

  const [greska, setGreska] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const obrisiZahtev = async (id) => {
console.log(id)
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
      alert('Doslo je do greske')
    }

    refresh()
    handleClose()
  }

  return (
    <Menu
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
    >

      {menuItems.map((item) => (
        <Box key={item._id}>
          <ListItem
            alignItems="flex-start"
          >
            <ListItemText
              secondary={
                <Typography
                  component="div"
                  variant="body2"
                  color="text.primary"
                >
                  {item.poruka ? item.poruka : "Novi zahtev"}

                </Typography>
              }
            />
            <ButtonBase className='cardCenter' sx={{ marginTop: '0%', marginLeft: '2px', minWidth: '0px' }}>
              <Delete onClick={() => { obrisiZahtev(item._id) }} />
            </ButtonBase>
          </ListItem>
          <Divider />
        </Box>
      ))}
    </Menu>

  )
}

export default Obavestenja