import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import CategoryIcon from '@mui/icons-material/Category';
import QuizIcon from '@mui/icons-material/Quiz';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window,onItemClick} = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  
  const getDestinationUrl = (text) => {
    switch (text) {
      case 'Category':
        return '/'; 
      case 'Quiz':
        return '/quizlist'; 
      case 'Dashboard':
        return '/dashboard'; 
      default:
        return '/'; 
    }
  };
  
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List style={{marginTop:"-60px"}}>
        {['Category', 'Quiz', 'Dashboard'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => onItemClick(text)}>
            <ListItemButton component={Link} to={getDestinationUrl(text)} >
            <ListItemIcon>
                {index === 0 && <CategoryIcon />}
                {index === 1 && <QuizIcon />}
                {index === 2 && <DashboardIcon />}
              </ListItemIcon> 
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
  // Remove this const when copying and pasting into your project.
  
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          onTransitionEnd={handleDrawerTransitionEnd}
          open={mobileOpen}
          variant="permanent"
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,marginTop: '55px',borderRight: '0', },
        
          }}
          
        
        >
          {drawer}
        </Drawer>
      </Box>
      {/* <Box component="main" sx={{ flexGrow: 2, p: 3 }}>
        <Toolbar>
          <MenuIcon onClick={handleDrawerToggle} />
        </Toolbar>
      </Box> */}
    </Box>
  );
}
ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
  onItemClick: PropTypes.func.isRequired,
};
export default ResponsiveDrawer;