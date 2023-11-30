import { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";

export default function MenuinfoCRUD() {
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
    console.log(formData);
    fetch("http://54.92.197.133/menuinfo/post", {
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
      .catch(() => {
        fetch("http://localhost:5001/menuinfo/post", {
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
      })
  };

  const handleEditClick = () => {
    fetch(`http://54.92.197.133/menuinfo/edit/${formData.id}`, {
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
      .catch(() => {
        fetch(`http://localhost:5001/menuinfo/edit/${formData.id}`, {
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
            // Handle error
          });
      })
  };
  
  // Delete item
  const handleDeleteClick = () => {
    fetch(`http://54.92.197.133/menuinfo/delete/${formData.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Item deleted successfully:', data);
        // Perform additional actions if needed
      })
      .catch(() => {
        fetch(`http://localhost:5001/menuinfo/delete/${formData.id}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Item deleted successfully:', data);
            // Perform additional actions if needed
          })
          .catch((error) => {
            console.error('Error deleting item:', error);
            // Handle error
          });
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