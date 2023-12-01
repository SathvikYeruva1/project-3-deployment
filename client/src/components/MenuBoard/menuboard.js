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
import { AddIcon, InfoIcon, CloseIcon } from "@chakra-ui/icons";


const MenuBoard = () => {
  const [menuItemData, setMenuItemData] = useState([]);
  const [menuItemDescriptions, setMenuItemDescriptions] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [menuItemIngredients, setMenuItemIngredients] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Manage cart section visibility

  useEffect(() =>{
  const fetchMenuData = async () => {
    try{
      const initialResult = await fetch(`http://localhost:5001/menudata/teaorders`);
      const jsonResult = await initialResult.json();
      setMenuItemIngredients(jsonResult.menuitemsingredients);
      setMenuItemData(jsonResult.menuitemsingredients);
      setMenuItemDescriptions(jsonResult.menuitemsingredients);
      } catch (error) {
        // Handle the error or try an alternative URL
        console.error('Error fetching menu data:', error);
        // Attempt an alternative URL
        try {
          const initialResult = await fetch(`http://54.92.197.133/menudata/teaorders`);
          const jsonResult = await initialResult.json();
          setMenuItemIngredients(jsonResult.menuitemsingredients);
          setMenuItemData(jsonResult.menuitemsingredients);
          setMenuItemDescriptions(jsonResult.menuitemsingredients);
        } catch (alternativeError) {
          console.error('Error fetching menu data from the alternative URL:', alternativeError);
        }
      }
    }
    fetchMenuData();
  }, [])


  useEffect(() => {
    if (menuItemData.length !== 0 && menuItemDescriptions.length !== 0) {
      // Combine the data from menuItemData and menuItemDescriptions
      const newMenuItems = menuItemData.map((item) => {
        const description = item.description + '\nIngredients: ' + item.ingredients;
        let category;
        category = item.categories
        let image;
        if(category == "Punch" || category == "Slush"){
          category = "Fruit";
          image = "/punchTea.jpg";
        }else if(category == "Milk Tea"){
          image = "milkTea.jpg";
        }else{
          image = "/seasonalTea.jpg"
        }
        console.log(item);
        return {
          name: item.tea_name,
          image, // You can set the image path here
          category, // Set the category as needed
          description,
        };
      });
      const filteredItems = selectedCategory
      ? newMenuItems.filter((item) => item.category === selectedCategory)
      : newMenuItems;

    setFilteredItems(filteredItems);
    }
  }, [menuItemData, menuItemDescriptions,selectedCategory]);

  const handleFilterCategory = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
  };


  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]); // Add the selected item to the cart
    setIsCartOpen(true); // Display the cart section when an item is added
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + 4.99, 0); // Sum up the prices of all items in the cart
    return totalPrice.toFixed(2); // Return the total with two decimal places
  };

  return (
    <Flex flexDirection="column">
    {/* Dark Blue Banner */}
    <Box
      bg="grey" // Adjust the shade of blue as needed
      color="white"
      py={2}
      px={4}
      textAlign="center"
      borderRadius="md"
    >
      <Heading as="h1" size="lg" color="black">
        Menu Board
      </Heading>
    </Box>
    <Flex alignItems="flex-start" bg="#F2F2F2">
      {/* Left Side */}
      <Center w="20%" display="flex" flexDirection="column">

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
        <Button 
        variant={selectedCategory === "Milk Tea" ? "solid" : "outline"}
        colorScheme="blue"
        onClick={() => handleFilterCategory("Milk Tea")}
        align="start">
            Filter
        </Button>
        </Card>

        <Card
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
        <Button variant={selectedCategory === "Fruit" ? "solid" : "outline"}
          colorScheme="blue"
          onClick={() => handleFilterCategory("Fruit")}
          align="start">
            Filter
        </Button>
        </Card>

        <Card
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
        <Button variant={selectedCategory === "Classic" ? "solid" : "outline"}
          colorScheme="blue"
          onClick={() => handleFilterCategory("Classic")}
          align="start">
            Filter
        </Button>
        </Card>
      </Center>

      {/* Right Side */}
      <Grid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={4} // Reduced the gap to decrease the space between rows
        pl={6} // Left padding to ensure some space from the left side
        pb = {8}
        pt={10} // Increased the top padding
        pr={cartItems.length > 0 ? 320 : 8} // Adjust the right padding based on whether the cart is open or not
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
                <IconButton aria-label="Add to cart" icon={<AddIcon />} colorScheme="teal" onClick={() => handleAddToCart(item)}/>
        
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
      {cartItems.length > 0 && (
        <Box
          position="fixed"
          right="0"
          top="0"
          bottom="0"
          width="300px"
          bg="white"
          boxShadow="md"
          p="4"
          zIndex="1"
        >
          <Heading as="h3" size="md" mb="4" color="black">
            Cart
          </Heading>
          {cartItems.map((cartItem, index) => (
            <Flex key={index} alignItems="center" justifyContent="space-between" mb="2">
              {/* Add more details here as needed */}
              <IconButton
              aria-label="Remove from cart"
              icon={<CloseIcon />} // Use the CloseIcon component
              colorScheme="red"
              onClick={() => {
                const updatedCartItems = cartItems.filter((_, i) => i !== index); // Filter out the clicked item
                setCartItems(updatedCartItems); // Update the cart items
              }}
              mr={1}
            />
            <Text color="black" marginLeft="0" marginRight="2" flexGrow="1" >{cartItem.name}</Text>
            <Text color="black">${4.99}</Text> {/* Display the default price */}
            </Flex>
          ))}
          <Divider my={4} />
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold" color="black">Total Price:</Text>
            <Text color="black">${calculateTotalPrice()}</Text>
          </Flex>
        </Box>
      )}
    </Flex>
    </Flex>
  );
};

export default MenuBoard;