import { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";

export default function EmployeePost() {
  const [formData, setFormData] = useState({
    id: "",
    employeeName: "",
    salary: "",
    employeeRole: "",
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
    fetch("http://localhost:5001/employee/post", {
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
    fetch(`http://localhost:5001/employee/edit/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        employeeName: formData.employeeName,
        salary: formData.salary,
        employeeRole: formData.employeeRole
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
  };
  
  // Delete item
  const handleDeleteClick = () => {
    fetch(`http://localhost:5001/employee/delete/${formData.id}`, {
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
  };

  return (
    <Box maxInlineSize={"sm"}>
      <Input
        {...inputStyle}
        placeholder="id"
        name="id"
        value={formData.id}
        onChange={handleInputChange}
      />
      <Input
        {...inputStyle}
        placeholder="employeeName"
        name="employeeName"
        value={formData.employeeName}
        onChange={handleInputChange}
      />
      <Input
        {...inputStyle}
        placeholder="Salary"
        name="salary"
        value={formData.salary}
        onChange={handleInputChange}
      />
      <Input
        {...inputStyle}
        placeholder="employeeRole"
        name="employeeRole"
        value={formData.employeeRole}
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