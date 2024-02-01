import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import { useState } from 'react';
import { Fab } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import CurrencyButton from './CurrencyButton';

const pages = [ 'Summary', 'Donations'];

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const open = Boolean(anchorElNav);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (<div>
        <AppBar className='navb' position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography variant="h6" noWrap
                        component={NavLink} to='/'
                        sx={{
                            mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700,
                            letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
                        }}>
                        FUNDRAISING CAMPAIGN
                    </Typography>
                    {/* Menue foe when small */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large"
                            aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* Menue when small */}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                            open={open}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' }, }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} component={NavLink} to={{ page }} onClick={handleCloseNavMenu}>
                                    {page}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* Campaign logo when big */}
                    {/* <Avatar alt='fundraise'  srcSet="src/Picture2.png"  /> */}
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={NavLink} to='/'
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
                        CAMPAIGN
                    </Typography>
                    
                    {/* Menue button when big */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button component={Link} to={page}
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 1, position: "revert" }}  >
                        <Fab variant='extended' disableFocusRipple={false} >
                            <CurrencyButton />
                        </Fab>
                    </Box>
                    {/*Donate Now Component  */}

                    <Box sx={{ flexGrow: 0 }} >
                        <Fab variant='extended' component={NavLink} to='form'>
                            <VolunteerActivismOutlinedIcon /> Donate Now
                        </Fab>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        
    </div>);
}

export default NavBar;