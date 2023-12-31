import { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";

export default function InventoryCRUD(props) {
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
    props.onUpdate();
    // Assuming you have an API endpoint to handle the data
    fetch("https://bobaposapp.onrender.com/inventory/post", {
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

  const handleEditClick = () => {
    props.onUpdate();
    fetch(`https://bobaposapp.onrender.com/inventory/edit/${formData.itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quantity: formData.quantity,
        itemcategory: formData.itemCategory,
        minimumamount: formData.minimumAmount
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Item updated successfully:', data);
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      })
  };
  
  // Delete item
  const handleDeleteClick = () => {
    props.onUpdate();
    fetch(`https://bobaposapp.onrender.com/inventory/delete/${formData.itemId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Item deleted successfully:', data);
        // Perform additional actions if needed
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
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
        <Button color="black" onClick={handleEditClick}>Edit</Button>
        <Button color="black" onClick={handleDeleteClick}>Delete</Button>
      </Box>
    </Box>
  );
}