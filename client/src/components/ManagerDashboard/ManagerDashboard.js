import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, UnorderedList, ListItem, Image } from "@chakra-ui/react";
import "./ManagerDashboard.css";

function ManagerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Box>
      <Box className="sidebar" backgroundColor="#1A202C" color="#FFFFFF" height="100vh" width="200px" p="20px">
      <Image
            src='/kungfutealogo.png'
            alt='Kung Fu Tea Logo'
            boxSize="125px"
            objectFit="contain" 
            textAlign="center"  
            borderRadius="md"
            boxShadow="md"   
            mb={4}  
            mt = {20}  
        />
        <UnorderedList styleType="none" p="0">
          <ListItem mb="10px">
            <a href="/Manager-Dashboard">Dashboard</a>
          </ListItem>
          <ListItem mb="10px">
            <a href="#">Orders</a>
          </ListItem>
          <ListItem mb="10px">
            <a href="#">Inventory</a>
          </ListItem>
          <ListItem mb="10px">
            <a href="#">Menu</a>
          </ListItem>
          <ListItem mb="10px">
            <a href="#">Employees</a>
          </ListItem>
          <ListItem mb="10px">
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
}

export default ManagerDashboard;