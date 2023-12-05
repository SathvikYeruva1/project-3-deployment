import React, { useState, useEffect } from "react";
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
import "./salesreport.css";

function SalesReport() {
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
  const handleReport = () => {
    navigate("/salesreport");
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


  //get the salesreport data
  const [salesreportData, setsalesreportData] = useState([]);
  const [honorsreportData, sethonorsreportData] = useState([]);
  const [salespairData, setsalespairData] = useState([]);
  const [selectedCard, setSelectedCard] = useState("sales");

  useEffect(() => {
    fetch('https://bobaposapp.onrender.com/salesreportdata')
    .then(response => response.json())
    .then(data => setsalesreportData(data))
    fetch('https://bobaposapp.onrender.com/honorsreportdata')
    .then(response => response.json())
    .then(data => sethonorsreportData(data))
    fetch('https://bobaposapp.onrender.com/salespairdata')
    .then(response => response.json())
    .then(data => setsalespairData(data))
  }, []);

  return (
 <Flex >
    <Box display="flex" width="200px">
      <Box className="sidebar" backgroundColor="#1A202C" color="#FFFFFF" height="100vh" width="200px" p="20px" >
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
            <Button onClick={handleReport} variant="unstyled">SalesReport</Button>
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
        pb={-5}
        spacing={3}  // Adjust the spacing as needed
        align="center"
        color="white"
        justifyContent="center"
      >
        <Box w="32%" bg="blue.900" ml={6} mr={4} borderRadius="lg" h="140px" _hover={{ bg: "blue.700" }}
          onClick={() => setSelectedCard("sales")}>
          <Center
            w="40px"
            h="58px"
          >
            <Icon as={FaDollarSign} fontSize="2xl" color="white" ml={3} />
          </Center>
          <Text fontSize="l" textAlign="center" ml={3} ><a href="/menuinfo">Sales Report</a></Text>
        </Box>

        <Box w="32%"  bg="blue.900" ml={4} mr={4} borderRadius="lg" h="140px" _hover={{ bg: "blue.700" }}
          onClick={() => setSelectedCard("honors")}>
          <Center
            w="40px"
            h="58px"
            borderRadius="lg"
          >
            <Icon as={FaReceipt} fontSize="2xl" color="white" ml={3}/>
          </Center>
          <Text fontSize="l" textAlign="center" ml={3}><a href="/inventory">Honors Report</a></Text>
        </Box>

        <Box w="32%"  bg="blue.900" ml={4} mr={4} borderRadius="lg" h="140px" _hover={{ bg: "blue.700" }}
          onClick={() => setSelectedCard("pair")}>
          <Center
            w="40px"
            h="58px"
            borderRadius="lg"
          >
            <Icon as={FaUsers} fontSize="2xl" color="white" ml={3}/>
          </Center>
          <Text fontSize="l" textAlign="center" ml={3}><a href="/employees">Pair Report</a></Text>
        </Box>
      </HStack>
        {/* Table */}
        <Flex w="96%" bg="white" border="1px solid #E2E8F0" p={10} mx="auto" alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
          <Heading as="h2" fontSize="xl" mb={8} color="blackAlpha.900">
          {selectedCard === "sales" ? "Sales" : selectedCard === "honors" ? "Honors" : "Pair"} Report Details
          </Heading>
          <Table variant="simple" borderCollapse="separate">
            <Thead>
              <Tr>
                <Th scope="col">Item Name</Th>
                <Th scope="col">Quantity Sold</Th>
              </Tr>
            </Thead>
            <Tbody>
            {selectedCard === "sales" && salesreportData.map((salesdata, index) => (
              <TableRow key={index} data={[salesdata.itemreport, salesdata.quantitysold]} />
            ))}
            {selectedCard === "honors" && honorsreportData.map((salesdata, index) => (
              <TableRow key={index} data={[salesdata.itemreport, salesdata.quantitysold]} />
            ))}
            {selectedCard === "pair" && salespairData.map((salespairs, index) => (
              <TableRow key={index} data={[salespairs.item1, salespairs.item2, salespairs.frequency]} />
            ))}
          {/* Add more rows as needed */}
            </Tbody>
          </Table>
        </Flex>
        </Flex>
    </Flex>
  );
}

export default SalesReport;