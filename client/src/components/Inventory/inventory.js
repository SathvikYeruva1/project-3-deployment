import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  HStack,
  Text,
  Image,
  Center,
  Flex,  // Import Flex from Chakra UI for layout
  UnorderedList,
   ListItem,
   Icon,
   Table,
   Thead,
   Tbody,
   Tr,
   Th,
   Td,
   useToast,
} from "@chakra-ui/react";
import { FaDollarSign, FaReceipt, FaUsers } from 'react-icons/fa';
import "./inventory.css";
import InventoryCRUD from "../CRUDComponents/InventoryCRUD";

function Inventory() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  const handleEmployee = () => {
    navigate("/employees");
  };
  const handleInventory = () => {
    navigate("/inventory");
  };
  const handleMenuInfo = () => {
    navigate("/menuinfo");
  };
  const handleDashboard = () => {
    navigate("/manager-dashboard");
  };
  const [inventoryItems, setInventoryItems] = useState([]);
  const [handleInventoryUpdate, setInventoryUpdate] = useState(false);
  const toast = useToast();
  
  useEffect(() =>{
    const fetchInventory = async () => {
      try{
        const initialResult = await fetch(`https://bobaposapp.onrender.com/inventory/data`);
        const jsonResult = await initialResult.json();
        setInventoryItems(jsonResult);
      } catch (error) {
        // Handle the error or try an alternative URL
        console.error('Error fetching inventory ID data:', error);
      }
    }
    fetchInventory();
  }, [handleInventoryUpdate])
  


  const handleCrudButtonClick = () => {
    setInventoryUpdate((prevValue) => !prevValue);
    toast({ title: 'Operation Success', description: 'Database modified', status: 'success', duration: 2500 });
  };

  const TableRow = ({ data, borderBottom = true }) => (
    <Tr>
      {data.map((item, index) => (
        <Td key={index} borderBottom={borderBottom ? "1px solid #E2E8F0" : "none"} color="blackAlpha.900">
          {item}
        </Td>
      ))}
    </Tr>
  );  

  return (
 <Flex >
    <Box display="flex" width="200px" alignItems="center" justifyContent="center">
      <Box className="sidebar" backgroundColor="#1A202C" color="#FFFFFF" height="100vh" width="200px" p="20px" >
      <Image
            src='/kungfutealogo.png' borderRadius="lg" mb={6} mt={10}
        />
        <UnorderedList styleType="none" p="0">
          <ListItem mb="15px" fontSize="lg">
            <a onClick={handleDashboard}>Dashboard</a>
          </ListItem>
          <ListItem mb="15px" fontSize="lg">
            <a onClick={handleInventory}>Inventory</a>
          </ListItem>
          <ListItem mb="15px" fontSize="lg">
            <a onClick={handleMenuInfo}>
              Menu
            </a>
          </ListItem>
          <ListItem mb="15px" fontSize="lg">
            <a onClick={handleEmployee}>Employees</a>
          </ListItem>
          <ListItem mb="15px" fontSize="lg">
            <a href="/" onClick={handleLogout}>
              Log out </a>
          </ListItem>
        </UnorderedList>
      </Box>
      </Box>
      {/* Right-side content */}
      <Flex direction="column" flex="10" bg="#F2F2F2"  minHeight="100vh" pb={10} mt={5}> 
      <HStack
        flex="1"
        pt={-10}  // Adjust the padding-top as needed
        pb={5}
        spacing={3}  // Adjust the spacing as needed
        align="center"
        color="white"
        justifyContent="center"
      >
        <Box w="32%" bg="blue.900" ml={6} mr={4} borderRadius="lg" h="140px">
          <Center
            w="40px"
            h="58px"
          >
            <Icon as={FaDollarSign} fontSize="2xl" color="white" ml={3} />
          </Center>
          <Text fontSize="l" textAlign="center" ml={3} ><a href="/menuinfo">Menu</a></Text>
        </Box>

        <Box w="32%"  bg="blue.900" ml={4} mr={4} borderRadius="lg" h="140px">
          <Center
            w="40px"
            h="58px"
            borderRadius="lg"
          >
            <Icon as={FaReceipt} fontSize="2xl" color="white" ml={3}/>
          </Center>
          <Text fontSize="l" textAlign="center" ml={3}><a href="/inventory">Inventory</a></Text>
        </Box>

        <Box w="32%"  bg="blue.900" ml={4} mr={4} borderRadius="lg" h="140px">
          <Center
            w="40px"
            h="58px"
            borderRadius="lg"
          >
            <Icon as={FaUsers} fontSize="2xl" color="white" ml={3}/>
          </Center>
          <Text fontSize="l" textAlign="center" ml={3}><a href="/employees">Employees</a></Text>
        </Box>
      </HStack>
        {/* Table */}
        <Flex w="96%" bg="white" border="1px solid #E2E8F0" p={10} mx="auto" justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
          <Heading as="h2" fontSize="xl" mb={8} color="blackAlpha.900">
            Inventory Details
          </Heading>
          <Table variant="simple" borderCollapse="separate">
            <Thead>
              <Tr>
                <Th>Item ID</Th>
                <Th>Quantity</Th>
                <Th>Item Category</Th>
                <Th>Minimum Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
          {/* Use the TableRow component to render rows */}
          {inventoryItems.map((item, index) => (
          <TableRow key = {index} data={[item.itemid, item.quantity, item.itemcategory, item.minimumamount]} />
          ))}
          {/* Add more rows as needed */}
            </Tbody>
          </Table>
          <InventoryCRUD onUpdate={handleCrudButtonClick}></InventoryCRUD>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Inventory;