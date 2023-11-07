// menuboard.js
import React, { useState } from 'react';
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

const MenuBoard = () => {
  // Define your menu items, e.g., an array of objects with name, image, category, and nutrition info
  const menuItems = [
    // Example menu item
    {
      name: "Coffee Milk Tea",
      image: "/milkTea.jpg",
      category: "Coffee",
      nutrition: "Aromatic coffee flavor blended with smooth milk tea.",
    },
    {
        name: "Rosehip Milk Tea",
        image: "/milkTea.jpg",
        category: "Coffee",
        nutrition: "Floral notes of rosehip in a creamy milk tea base.",
      },
      {
        name: "Green Tea",
        image: "/milkTea.jpg",
        category: "Coffee",
        nutrition: "Refreshing and detoxifying, rich in natural antioxidants.",
      },
      {
        name: "Taro Milk Tea",
        image: "/milkTea.jpg",
        category: "Coffee",
        nutrition: "Nutrition info for coffee drink",
      },
      {
        name: "Honey Milk Tea",
        image: "/milkTea.jpg",
        category: "Coffee",
        nutrition: "Nutrition info for coffee drink",
      },
      {
        name: "Thai Milk Tea",
        image: "/milkTea.jpg",
        category: "Coffee",
        nutrition: "Nutrition info for coffee drink",
      },
      {
        name: "Coconut Milk Tea",
        image: "/milkTea.jpg",
        category: "Coffee",
        nutrition: "Nutrition info for coffee drink",
      },
      {
        name: "Almond Milk Tea",
        image: "/milkTea.jpg",
        category: "Coffee",
        nutrition: "Nutrition info for coffee drink",
      },
    // Add more menu items as needed
  ];

  // State to filter menu items by category
  const [filteredItems, setFilteredItems] = useState(menuItems);

  const handleFilterCategory = (category) => {
    const filtered = menuItems.filter((item) => item.category === category);
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
            <Card borderRadius="lg" overflow="hidden" display="flex" flexDirection="column">
              {/* Display the image for the drink */}
              <Image src={item.image} alt={item.name} boxSize="100%" objectFit="cover" />
              
              {/* Product Name */}
              <Box p={3} d="flex" flexDirection="column" justifyContent="space-between" flexGrow={1}>
                <Text fontWeight="bold" textAlign="center" color="black">{item.name}</Text>
                <Flex justifyContent="center" alignItems="center" mt={2}>
                  {/* Add to Cart Button */}
                  <IconButton aria-label="Add to cart" icon={<ChevronRightIcon />} colorScheme="teal" />

                  {/* Nutrition Info Popover */}
                  <Popover>
                    <PopoverTrigger>
                      <IconButton aria-label="Nutrition info" icon={<InfoIcon />} colorScheme="teal" ml={2} />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader color="black">Nutrition Information</PopoverHeader>
                      {/* This is where the description will show */}
                      <PopoverBody color="black">{item.nutrition}</PopoverBody>
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
