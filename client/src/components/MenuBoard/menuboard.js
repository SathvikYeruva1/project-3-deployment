// menuboard.js
import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import {
  Box,
  Heading,
  Divider,
  Card,
  Grid,
  GridItem,
  VStack,
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
} from "@chakra-ui/react";
import { ChevronRightIcon, InfoIcon } from "@chakra-ui/icons";

/*function menudata() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/menuboard') // Adjust the URL as needed
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, []);*/
const MenuBoard = () => {
  const [menuItemData, setMenuItemData] = useState([]);
  const [menuItemDescriptions, setMenuItemDescriptions] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() =>{
    const fetchMenuData = async () => {
      const initialResult = await fetch(`http://localhost:5001/menudata`);
      const jsonResult = await initialResult.json();
      setMenuItemData(jsonResult.menuitemsnames);
    }
    const fetchMenuDescriptions = async () => {
      const initialResult = await fetch(`http://localhost:5001/menudata/descriptions`);
      const jsonResult = await initialResult.json();
      setMenuItemDescriptions(jsonResult.menuitemsdescriptions);
    }
    fetchMenuData();
    fetchMenuDescriptions();
  }, [])


  useEffect(() => {
    if (menuItemData.length !== 0 && menuItemDescriptions.length !== 0) {
      // Combine the data from menuItemData and menuItemDescriptions
      const newMenuItems = menuItemData.map((item, index) => {
        const description = menuItemDescriptions[index].descriptions;
        return {
          name: item.tea_name,
          image: "/milkTea.jpg", // You can set the image path here
          category: "Coffee", // Set the category as needed
          description,
        };
      });
      setFilteredItems(newMenuItems);
    }
  }, [menuItemData, menuItemDescriptions]);

  const handleFilterCategory = (category) => {
    // Filter the items based on the selected category
    const filtered = filteredItems.filter((item) => item.category === category);
    setFilteredItems(filtered);
  };


  return (
    <Flex>
      {/* Left Side */}
      <Center w="20%" display="flex" flexDirection="column">
        {/* <Button leftIcon={<ChevronRightIcon />} colorScheme="teal" mb={8}>
          Back
        </Button> */}

        {/* Kung Fu Tea Logo */}
        <Image
            src='/kungfutealogo.png'   // Adjust the image path as needed
            alt='Kung Fu Tea Logo'
            boxSize="125px"             // Reduce the size of the image
            objectFit="contain" 
            textAlign="center"  
            borderRadius="md"
            boxShadow="md"   
            mb={4}  
            mt = {20}  
        />
          
        {/* Category Cards */}
        
        <Card
        variant={filteredItems[0] ? "solid" : "outline"}
        onClick={() => handleFilterCategory("Coffee")}
        borderRadius="lg"      // Add rounded edges
        boxShadow="md"    
        boxSize="155px"
        mb={5}     // Add a small drop shadow
        height='auto'
        >
        <Image
            src='/milkTea.jpg'   // Adjust the image path as needed
            alt='Coffee Tea Example'
            objectFit="cover" 
            textAlign="center"
            borderRadius="md"
            boxShadow="md"
        />
        <Divider />
        {/* <Text>Freshly brewed teas paired with milk powder</Text> */}
        <Button variant='solid' colorScheme='blue' align="start">
            Filter
        </Button>
        </Card>

        <Card
        variant={filteredItems[0] ? "solid" : "outline"}
        onClick={() => handleFilterCategory("Coffee")}
        borderRadius="lg"      // Add rounded edges
        boxShadow="md"    
        boxSize="155px"
        mb={5}     // Add a small drop shadow
        height='auto'
        >
        <Image
            src='/classicTea.jpg'   // Adjust the image path as needed
            alt='Classic Tea Example'
            objectFit="cover" 
            textAlign="center"
            borderRadius="md"
            boxShadow="md"
        />
        <Divider />
        {/* <Text>Freshly brewed teas paired with milk powder</Text> */}
        <Button variant='solid' colorScheme='blue' align="start">
            Filter
        </Button>
        </Card>

        <Card
        variant={filteredItems[0] ? "solid" : "outline"}
        onClick={() => handleFilterCategory("Coffee")}
        borderRadius="lg"      // Add rounded edges
        boxShadow="md"    
        boxSize="155px"
        mb={5}     // Add a small drop shadow
        height='auto'
        >
        <Image
            src='/punchTea.jpg'   // Adjust the image path as needed
            alt='Punch Tea Example'
            objectFit="cover" 
            textAlign="center"
            borderRadius="md"
            boxShadow="md"
        />
        <Divider />
        {/* <Text>Freshly brewed teas paired with milk powder</Text> */}
        <Button variant='solid' colorScheme='blue' align="start">
            Filter
        </Button>
        </Card>

        <Card
        variant={filteredItems[0] ? "solid" : "outline"}
        onClick={() => handleFilterCategory("Coffee")}
        borderRadius="lg"      // Add rounded edges
        boxShadow="md"    
        boxSize="155px"
        mb={5}     // Add a small drop shadow
        height='auto'
        >
        <Image
            src='/seasonalTea.jpg'   // Adjust the image path as needed
            alt='Seasonal Tea Example'
            objectFit="cover" 
            textAlign="center"
            borderRadius="md"
            boxShadow="md"
        />
        <Divider />
        {/* <Text>Freshly brewed teas paired with milk powder</Text> */}
        <Button variant='solid' colorScheme='blue' align="start">
            Filter
        </Button>
        </Card>
      </Center>

      {/* Right Side */}
      <Grid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={4} // Reduced the gap to decrease the space between rows
        pl={6} // Left padding to ensure some space from the left side
        pt={10} // Increased the top padding
        w="full" // Ensure the grid takes full width of the right side
      >
        {filteredItems.map((item, index) => (
          <GridItem key={index} colSpan={1}>
          <Card borderRadius="lg" overflow="hidden" display="flex" flexDirection="column" position="relative">
            {/* Display the image for the drink */}
            <Image src={item.image} alt={item.name} boxSize="100%" objectFit="cover" />
                      
            {/* Product Name */}
            <Box p={3} d="flex" flexDirection="column" justifyContent="space-between" flexGrow={1}>
              <Text fontWeight="bold" textAlign="center" color="black">{item.name}</Text>
              <Flex justifyContent="center" alignItems="center" mt={2}>
                {/* Add to Cart Button */}
                <IconButton aria-label="Add to cart" icon={<ChevronRightIcon />} colorScheme="teal" />
        
                {/* Description Popover */}
                <Popover placement="bottom" strategy="fixed">
                  <PopoverTrigger>
                    <IconButton aria-label="Item Description" icon={<InfoIcon />} colorScheme="teal" ml={2} />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader color="black">Item Description</PopoverHeader>
                    {/* This is where the description will show */}
                    <PopoverBody color="black">{item.description}</PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
            </Box>
          </Card>
        </GridItem>
        
        ))}
      </Grid>
    </Flex>
  );
};

export default MenuBoard;