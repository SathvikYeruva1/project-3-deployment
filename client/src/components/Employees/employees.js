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
import "./employees.css";
import EmployeeCRUD from "../PostComponent/EmployeeCRUD";

function Employees() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
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


  //get the employee data
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    fetch('http://54.92.197.133/employeesdata')
      .then(response => response.json())
      .then(data => setEmployeeData(data))
      .catch(() => {
        fetch('http://localhost:5001/employeesdata')
        .then(response => response.json())
        .then(data => setEmployeeData(data))
      });
  }, []);

  return (
 <Flex >
    <Box display="flex" width="200px">
      <Box className="sidebar" backgroundColor="#1A202C" color="#FFFFFF" height="100vh" width="200px" p="20px" >
      <Image
            src='/kungfutealogo.png' borderRadius="lg" mb={6} mt={10}
        />
        <UnorderedList styleType="none" p="0">
          <ListItem mb="15px" fontSize="lg">
            <a href="/manager-dashboard">Dashboard</a>
          </ListItem>
          <ListItem mb="15px" fontSize="lg">
            <a href="/inventory">Inventory</a>
          </ListItem>
          <ListItem mb="15px" fontSize="lg">
            <a href = "/menuinfo">
              Menu
            </a>
          </ListItem>
          <ListItem mb="15px" fontSize="lg">
            <a href="/employees">Employees</a>
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
        pb={-5}
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
      <EmployeeCRUD/>
        {/* Table */}
        <Box w="96%" bg="white" border="1px solid #E2E8F0" p={10} mx="auto">
          <Heading as="h2" fontSize="xl" mb={8} color="blackAlpha.900">
            Employee Details
          </Heading>
          <Table variant="simple" borderCollapse="separate">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Employee Name</Th>
                <Th>Salary</Th>
                <Th>Employee Role</Th>
              </Tr>
            </Thead>
            <Tbody>
          {/* Use the TableRow component to render rows */}
              {employeeData.map((employee, index) => (
                <TableRow key={index} data={[employee.id, employee.employeename, employee.salary, employee.employeerole]} />
              ))}
          {/* Add more rows as needed */}
            </Tbody>
          </Table>
        </Box>
        </Flex>
    </Flex>
  );
}

export default Employees;