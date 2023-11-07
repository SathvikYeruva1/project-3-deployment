import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, UnorderedList, ListItem } from "@chakra-ui/react";
import "./ManagerDashboard.css";

function ManagerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleMenubooard = () => {
    navigate("/menuboard");
  };
  

  return (
    <Box>
      <Box className="sidebar" backgroundColor="#1A202C" color="#FFFFFF" height="100vh" width="200px" p="20px">
        <Heading as="h1" size="xl" textAlign="center" mb="20px">
          Kung Fu Tea
        </Heading>
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
            <a href="/menuboard">Menu</a>
          </ListItem>
          <ListItem mb="10px">
            <a href="#">Employees</a>
          </ListItem>
          <ListItem mb="10px">
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </ListItem>
          <ListItem mb="10px">
            <a onClick={handleMenubooard}>
              Menuboard
            </a>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
}

export default ManagerDashboard;
