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
      image: "coffee-image.jpg",
      category: "Coffee",
      nutrition: "Nutrition info for coffee drink",
    },
    {
        name: "Rosehip Milk Tea",
        image: "coffee-image.jpg",
        category: "Coffee",
        nutrition: "Nutrition info for coffee drink",
      },
      {
        name: "Green Tea",
        image: "coffee-image.jpg",
        category: "Coffee",
        nutrition: "Nutrition info for coffee drink",
      },
      {
        name: "Taro Milk Tea",
        image: "coffee-image.jpg",
        category: "Coffee",
        nutrition: "Nutrition info for coffee drink",
      },
      {
        name: "Honey Milk Tea",
        image: "coffee-image.jpg",
        category: "Coffee",
        nutrition: "Nutrition info for coffee drink",
      },
      {
        name: "Thai Milk Tea",
        image: "coffee-image.jpg",
        category: "Coffee",
        nutrition: "Nutrition info for coffee drink",
      },
      {
        name: "Coconut Milk Tea",
        image: "coffee-image.jpg",
        category: "Coffee",
        nutrition: "Nutrition info for coffee drink",
      },
      {
        name: "Almond Milk Tea",
        image: "coffee-image.jpg",
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
      <VStack spacing={4} align="center" mt={50} mr={20}>
        {filteredItems.map((item, index) => (
          <Card key={index} borderRadius="lg" boxShadow="md" w="200px">
            <Image src='/punchTea.jpg' alt={item.name} boxSize="100%" objectFit="cover" />

            {/* Product Name */}
            <Text>{item.name}</Text>

            {/* Add to Cart Button */}
            <IconButton icon={<ChevronRightIcon />} colorScheme="teal" />

            {/* Nutrition Info Popover */}
            <Popover>
              <PopoverTrigger>
                <IconButton icon={<InfoIcon />} colorScheme="teal" />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Nutrition Information</PopoverHeader>
                <PopoverBody>{item.nutrition}</PopoverBody>
              </PopoverContent>
            </Popover>
          </Card>
        ))}
      </VStack>
    </Flex>
  );
};

export default MenuBoard;
