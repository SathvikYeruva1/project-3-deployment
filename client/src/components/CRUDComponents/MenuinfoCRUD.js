import { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";

export default function MenuinfoCRUD(props) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    ingredients: "",
    description: "",
    category: "",
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
    console.log(formData);
    fetch("https://bobaposapp.onrender.com/menuinfo/post", {
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
      })
  };

  const handleEditClick = () => {
    props.onUpdate();
    fetch(`https://bobaposapp.onrender.com/menuinfo/edit/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        price: formData.price,
        ingredients: formData.ingredients,
        description: formData.description,
        category: formData.category
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Item updated successfully:', data);
        // Perform additional actions if needed
      })
      .catch((error) => {
          console.error('Error updating item:', error);
      })
  };
  
  // Delete item
  const handleDeleteClick = () => {
    props.onUpdate();
    fetch(`https://bobaposapp.onrender.com/menuinfo/delete/${formData.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Item deleted successfully:', data);
        // Perform additional actions if needed
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      })
  };

  return (
    <Box maxInlineSize={"sm"}>
      <Input
        {...inputStyle}
        placeholder="ID"
        name="id"
        value={formData.id}
        onChange={handleInputChange}
      />
      <Input
        {...inputStyle}
        placeholder="Tea Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <Input
        {...inputStyle}
        placeholder="Price"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
      />
      <Input
        {...inputStyle}
        placeholder="Ingredients"
        name="ingredients"
        value={formData.ingredients}
        onChange={handleInputChange}
      />
      <Input
        {...inputStyle}
        placeholder="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <Input
        {...inputStyle}
        placeholder="Category"
        name="category"
        value={formData.category}
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