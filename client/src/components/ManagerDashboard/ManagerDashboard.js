import React, { useEffect, useState } from "react";
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
   Icon,
   Table,
   Thead,
   Tbody,
   Tr,
   Th,
   Td,
} from "@chakra-ui/react";
import { FaDollarSign, FaReceipt, FaUsers } from 'react-icons/fa';
import "./ManagerDashboard.css";

function ManagerDashboard() {
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


  const TableRow = ({ data, borderBottom = true }) => (
    <Tr>
      {data.map((item, index) => (
        <Td key={index} borderBottom={borderBottom ? "1px solid #E2E8F0" : "none"} color="blackAlpha.900">
          {item}
        </Td>
      ))}
    </Tr>
  );

  //fetching the order data
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    fetch('https://bobaposapp.onrender.com/ordersdata')
    .then(response => response.json())
    .then(data => setOrdersData(data))
  }, []);

  return (
 <Flex >
    <Box display="flex" width="200px">
      <Box aria-label="Sidebar Navigation" className="sidebar" backgroundColor="#1A202C" color="#FFFFFF" height="100vh" width="200px" p="20px" >
      <Image
            src='/kungfutealogo.png' alt="Kung Fu Tea Logo" borderRadius="lg" mb={6} mt={10}
        />
        <UnorderedList styleType="none" p="0">
          <ListItem mb="15px" fontSize="lg">
            <Button onClick={handleDashboard} variant="unstyled">Dashboard</Button>
          </ListItem>
          <ListItem mb="15px" fontSize="lg">
            <Button onClick={handleInventory} variant="unstyled">Inventory</Button>
          </ListItem>
          <ListItem mb="15px" fontSize="lg">
            <Button onClick={handleMenuInfo} variant="unstyled">Menu</Button>
          </ListItem>
          <ListItem mb="15px" fontSize="lg">
            <Button onClick={handleEmployee} variant="unstyled">Employees</Button>
          </ListItem>
          <ListItem mb="15px" fontSize="lg">
          <Button onClick={handleLogout} variant="unstyled">Log out</Button>
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
          <Text fontSize="xl" textAlign="left" ml={3} mb={0.5}>$10,000</Text>
          <Text fontSize="l" textAlign="left" ml={3} >Total Revenue</Text>
        </Box>

        <Box w="32%"  bg="blue.900" ml={4} mr={4} borderRadius="lg" h="140px">
          <Center
            w="40px"
            h="58px"
            borderRadius="lg"
          >
            <Icon as={FaReceipt} fontSize="2xl" color="white" ml={3}/>
          </Center>
          <Text fontSize="xl" textAlign="left" ml={3} mb={0.5}>500</Text>
          <Text fontSize="l" textAlign="left" ml={3}><a href="/inventory">Inventory</a></Text>
        </Box>

        <Box w="32%"  bg="blue.900" ml={4} mr={4} borderRadius="lg" h="140px">
          <Center
            w="40px"
            h="58px"
            borderRadius="lg"
          >
            <Icon as={FaUsers} fontSize="2xl" color="white" ml={3}/>
          </Center>
          <Text fontSize="xl" textAlign="left" ml={3} mb={0.5}>20</Text>
          <Text fontSize="l" textAlign="left" ml={3}><a href="/employees">Employees</a></Text>
        </Box>
      </HStack>
        {/* Table */}
        <Box w="96%" bg="white" border="1px solid #E2E8F0" p={10} mx="auto">
          <Heading as="h2" fontSize="xl" mb={8} color="blackAlpha.900">
            Order Details
          </Heading>
          <Table variant="simple" borderCollapse="separate">
            <Thead>
              <Tr>
                <Th scope="col">Date</Th>
                <Th scope="col">Order Number</Th>
                <Th scope="col">Amount</Th>
                <Th scope="col">Cashier Name</Th>
              </Tr>
            </Thead>
            <Tbody>
          {/* Use the TableRow component to render rows */}
              {ordersData.map((order, index) => (
                <TableRow key={index} data={[order.orderdate, order.id, `$${order.totalamount}`, order.cashiername]} />
              ))}
          {/* Add more rows as needed */}
            </Tbody>
          </Table>
        </Box>
        </Flex>
    </Flex>
  );
}

export default ManagerDashboard;