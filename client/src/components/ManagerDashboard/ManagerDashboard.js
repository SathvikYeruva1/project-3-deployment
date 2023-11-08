import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Divider,
  Card,
  Grid,
  GridItem,
  VStack,
  HStack,
  Button,
  Text,
  Image,
  Center,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Flex,  // Import Flex from Chakra UI for layout
  UnorderedList,
   ListItem,
   Icon
} from "@chakra-ui/react";
import { FaDollarSign, FaReceipt, FaUsers } from 'react-icons/fa';
import "./ManagerDashboard.css";

function ManagerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };


  

  return (
    <Flex>
    <Box display="flex" width="200px">
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
            <a href="/manager-dashboard">Dashboard</a>
          </ListItem>
          <ListItem mb="10px">
            <a href="/manager-dashboard">Orders</a>
          </ListItem>
          <ListItem mb="10px">
            <a href="/manager-dashboard">Inventory</a>
          </ListItem>
          <ListItem mb="10px">
            <a href = "/menuboard">
              Menu
            </a>
          </ListItem>
          <ListItem mb="10px">
            <a href="/manager-dashboard">Employees</a>
          </ListItem>
          <ListItem mb="10px">
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </ListItem>
        </UnorderedList>
      </Box>
      </Box>
      {/* Right-side content */}
      <HStack
        flex="1"
        p={4}
        spacing={10}  // Adjust the spacing as needed
        align="center"
        color="white"
        paddingTop="70px" // Add padding to the top
      >
        <Box w="27%" bg="blue.900" ml={4} mr={4} borderRadius="lg" h="120px">
          <Center
            w="40px"
            h="58px"
          >
            <Icon as={FaDollarSign} fontSize="2xl" color="white" ml={3} />
          </Center>
          <Text fontSize="xl" textAlign="left" ml={3} mb={0.5}>$10,000</Text>
          <Text fontSize="l" textAlign="left" ml={3} >Total Revenue</Text>
        </Box>

        <Box w="27%"  bg="blue.900" ml={4} mr={4} borderRadius="lg" h="120px">
          <Center
            w="40px"
            h="58px"
            borderRadius="lg"
          >
            <Icon as={FaReceipt} fontSize="2xl" color="white" ml={3}/>
          </Center>
          <Text fontSize="xl" textAlign="left" ml={3} mb={0.5}>500</Text>
          <Text fontSize="l" textAlign="left" ml={3}>Total Orders</Text>
        </Box>

        <Box w="27%"  bg="blue.900" ml={4} mr={4} borderRadius="lg" h="120px">
          <Center
            w="40px"
            h="58px"
            borderRadius="lg"
          >
            <Icon as={FaUsers} fontSize="2xl" color="white" ml={3}/>
          </Center>
          <Text fontSize="xl" textAlign="left" ml={3} mb={0.5}>20</Text>
          <Text fontSize="l" textAlign="left" ml={3}>Employees</Text>
        </Box>
      </HStack>
    </Flex>
    
    
  );
}

export default ManagerDashboard;