import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import Delete from '@mui/icons-material/Delete';
import { DeleteMetoda } from './Fetch';
import { ListItemText,  Typography, ListItem, Divider } from '@mui/material';

const Obavestenja = ({ anchorEl, handleClose, open, menuItems }) => {

  const [greska, setGreska] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const obrisiZahtev = (id) => {

    const zahtev = {
      url: 'http://localhost:8800/api/zahtev/obrisiZahtev/' + id
    }

    DeleteMetoda(zahtev, setGreska, setIsLoading)

    if (greska !== false) {
      alert('doslo je do greske')
    }


    handleClose()
  }

  return (
    <Menu
      // id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >

      {menuItems.map((item) => (
        <div key={item._id}>
          <ListItem
            alignItems="flex-start"
          >
            <ListItemText
              // primary={item.status}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item.poruka ? item.poruka : "Novi zahtev"}
                  <Delete onClick={() => { obrisiZahtev(item._id) }} />
                </Typography>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}

      {/* </List> */}
    </Menu>

  )
}

export default Obavestenja