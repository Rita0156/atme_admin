import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import ResponsiveDrawer from '../sidebar';


const Header = ({headerName}) => {
  return (
    <div style={{marginTop:"-20px"}}>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#" style={{marginLeft:"-150px"}}>{headerName}</Navbar.Brand>
          </Container>
        </Navbar>
    </div>
  );
};

export default Header;
