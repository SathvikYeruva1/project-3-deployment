import { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";

export default function PostComponent() {
  const [formData, setFormData] = useState({
    itemId: "",
    quantity: "",
    itemCategory: "",
    minimumAmount: "",
  });

  const inputStyle = {
    color: "black",
    borderColor: "lightgrey",
    mb: 2,
    '_placeholder': {
      color: 'grey',
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    console.log(formData);
    // Assuming you have an API endpoint to handle the data
    fetch("http://localhost:5001/inventory/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response or perform additional actions
        console.log("Data posted successfully:", data);
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  return (
    <Box maxInlineSize={"sm"}>
      <Input
        {...inputStyle}
        placeholder="ItemId"
        name="itemId"
        value={formData.itemId}
        onChange={handleInputChange}
      />
      <Input
        {...inputStyle}
        placeholder="Quantity"
        name="quantity"
        value={formData.quantity}
        onChange={handleInputChange}
      />
      <Input
        {...inputStyle}
        placeholder="Item Category"
        name="itemCategory"
        value={formData.itemCategory}
        onChange={handleInputChange}
      />
      <Input
        {...inputStyle}
        placeholder="Minimum Amount"
        name="minimumAmount"
        value={formData.minimumAmount}
        onChange={handleInputChange}
      />
      <Box display="flex" justifyContent={"center"}>
        <Button color="black" onClick={handleAddClick}>
          Add
        </Button>
        {/* Add Edit and Delete button handlers here */}
        <Button color="black">Edit</Button>
        <Button color="black">Delete</Button>
      </Box>
    </Box>
  );
}