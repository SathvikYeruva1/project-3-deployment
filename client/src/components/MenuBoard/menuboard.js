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
import { ChevronRightIcon, InfoIcon, CloseIcon } from "@chakra-ui/icons";

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
  const [menuItemIngredients, setMenuItemIngredients] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Manage cart section visibility

  useEffect(() =>{
    const fetchMenuData = async () => {
      try{
      const initialResult = await fetch(`http://54.92.197.133/menudata`);
      const jsonResult = await initialResult.json();
      setMenuItemData(jsonResult.menuitemsnames);
      } catch (error) {
        // Handle the error or try an alternative URL
        console.error('Error fetching menu data:', error);
        // Attempt an alternative URL
        try {
          const initialResult = await fetch(`http://localhost:5001/menudata`);
          const jsonResult = await initialResult.json();
          setMenuItemData(jsonResult.menuitemsnames);
        } catch (alternativeError) {
          console.error('Error fetching menu data from the alternative URL:', alternativeError);
        }
      }
    }

    const translateText = async (text, wantedLanguage) => {
      try{
      const initialResult = await fetch(`http://54.92.197.133/translate`);
      const jsonResult = await initialResult.json();
      return jsonResult.translated;
      } catch (error) {
        // Handle the error or try an alternative URL
        console.error('Error translating text:', error);
        // Attempt an alternative URL
        try {
          const initialResult = await fetch(`http://localhost:5001/translate`);
          const jsonResult = await initialResult.json();
          return jsonResult.translated;
        } catch (alternativeError) {
          console.error('Error translating text from the alternative URL:', alternativeError);
        }
      }
    }

    const fetchMenuDescriptions = async () => {
      try{
      const initialResult = await fetch(`http://54.92.197.133/menudata/descriptions`);
      const jsonResult = await initialResult.json();
      setMenuItemDescriptions(jsonResult.menuitemsdescriptions);
    } catch (error) {
      // Handle the error or try an alternative URL
      console.error('Error fetching menu data:', error);
      // Attempt an alternative URL
      try {
        const initialResult = await fetch(`http://localhost:5001/menudata/descriptions`);
        const jsonResult = await initialResult.json();
        setMenuItemDescriptions(jsonResult.menuitemsdescriptions);
      } catch (alternativeError) {
        console.error('Error fetching menu data from the alternative URL:', alternativeError);
      }
    }
    }
  const fetchMenuIngredients = async () => {
    try{
      const initialResult = await fetch(`http://54.92.197.133/menudata/teaorders`);
      const jsonResult = await initialResult.json();
      setMenuItemIngredients(jsonResult.menuitemsingredients);
      } catch (error) {
        // Handle the error or try an alternative URL
        console.error('Error fetching menu data:', error);
        // Attempt an alternative URL
        try {
          const initialResult = await fetch(`http://localhost:5001/menudata/teaorders`);
          const jsonResult = await initialResult.json();
          setMenuItemIngredients(jsonResult.menuitemsingredients);
        } catch (alternativeError) {
          console.error('Error fetching menu data from the alternative URL:', alternativeError);
        }
      }
    }
    fetchMenuData();
    fetchMenuDescriptions();
    fetchMenuIngredients();
  }, [])


  useEffect(() => {
    if (menuItemData.length !== 0 && menuItemDescriptions.length !== 0) {
      // Combine the data from menuItemData and menuItemDescriptions
      const newMenuItems = menuItemData.map((item, index) => {
        const description = menuItemDescriptions[index].descriptions + '\nIngredients: ' + menuItemIngredients[index].ingredients;
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

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]); // Add the selected item to the cart
    setIsCartOpen(true); // Display the cart section when an item is added
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0); // Sum up the prices of all items in the cart
    return totalPrice.toFixed(2); // Return the total with two decimal places
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
        pr={cartItems.length > 0 ? 320 : 0} // Adjust the right padding based on whether the cart is open or not
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
                <IconButton aria-label="Add to cart" icon={<ChevronRightIcon />} colorScheme="teal" onClick={() => handleAddToCart(item)}/>
        
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
  );
};

export default MenuBoard;