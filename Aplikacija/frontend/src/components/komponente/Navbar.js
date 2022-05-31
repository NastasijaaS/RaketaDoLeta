import React, { useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';



const pages = [{val:'Trenirajte sa nama', link: '/usluge'}, {val:'Treneri', link:'/treneri'}, {val: 'O nama', link: '/onama'} ,{val:'Blog', link:'/blog'}, {val:'Kontakt', link:' '}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user } = useContext(UserContext);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RocketLaunchOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RaketaDoLeta
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, i) => (
                 <Link to = {page.link} >
                    <MenuItem key={page.val} onClick={handleCloseNavMenu}>
                      {/* <Link to = {page.link}>{page.val}</Link> */}
                      <Typography textAlign="center">{page.val}</Typography>
                    </MenuItem>
                 </Link>
              ))}

            </Menu>
          </Box>
          
          <RocketLaunchOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RDL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key = {page.val}
                href = {page.link}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.val}
              </Button>             
            ))}

          </Box>
          
          {!user &&
          <Box sx = {{flexGrow:0, display: { xs: 'flex', md: 'none' }}}>
              <Tooltip title="Login">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <LoginIcon sx = {{ color:'white'}}/>
                </IconButton>
              </Tooltip>    

          <Menu
              sx={{ mt: '45px' }}
              id="menu-login"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link to ='/login' >
                <MenuItem key= 'Log in' onClick={handleCloseUserMenu}>      
                  <Typography textAlign="center"> Log in</Typography>
                </MenuItem>
              </Link>
              <Link to = '/signup' >
                <MenuItem key='Sign up' onClick={handleCloseUserMenu}>      
                  <Typography textAlign="center"> Sign up</Typography>
                </MenuItem>
              </Link>
            </Menu>

          </Box>
          }
          
          
          <Box sx={{ flexGrow: 0 }}>
           {
               !user &&
               <Button
               href = '/login'
               sx={{ my: 2, color: 'white',display: {xs: 'none', md:'inline' }}}
               >
                Log in
               </Button> 
            }
            
            {
              !user &&
              <Button
              href = '/signup'
              sx={{ my: 2, color: 'white',display: { xs: 'none', md:'inline' } }}
              >
                Sign up
              </Button> 

            }
            {user &&
              <Tooltip title="Account">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleOutlinedIcon sx = {{ color:'white'}}/>
                </IconButton>
              </Tooltip> 
             &&       
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
        }     
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
