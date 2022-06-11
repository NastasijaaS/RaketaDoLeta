import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Obavestenja = ({ anchorEl, handleClose, open, menuItems }) => {
    return (
      <Menu
        // id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuItems.map((item) => (
          <MenuItem
          key={item}
            onClick={handleClose}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
 
    )
}

export default Obavestenja