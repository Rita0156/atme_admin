import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CategoryIcon from '@mui/icons-material/Category';
import QuizIcon from '@mui/icons-material/Quiz';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Link} from 'react-router-dom'
export default function SidePanel() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {[
          { text: 'Category', icon: <CategoryIcon />, link: '/' },
          { text: 'Contest', icon: <QuizIcon />, link: '/quizlist' },
          { text: 'Dashboard', icon: <DashboardIcon /> },
        ].map((item, index) => (
          <ListItem button key={item.text} component={Link} to={item.link}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
      </List>
    </Box>
  );
  return (
    <div>
      <IconButton onClick={toggleDrawer} sx={{ position: 'absolute', top: -5, left: 10 }}>
        <MenuIcon  sx={{backgroundColor:"black",color:"white",padding:"5px",fontWeight:"bold",fontSize:"25px",width:"40px",marginTop:"10px"}} />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
       
      >
        {list}
      </Drawer>
    </div>
  );
}