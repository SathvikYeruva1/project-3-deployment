import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // if (username === "manager") {
    //   navigate("/manager-dashboard");
    // } else {
    //   alert("Invalid username or password.");
    // }
    navigate("/manager-dashboard");
  };

  return (
    <ChakraProvider>
      <Box className="login-page" width="360px" padding="8% 0 0" margin="auto">
        <Box className="login-title">
          <Heading as="h1" size="2xl" textAlign="center" color="#FFFFFF" mb="10px">
            Kung Fu Tea
          </Heading>
        </Box>
        <Box className="form" position="relative" zIndex="1" background="#FFFFFF" maxW="360px" margin="0 auto 100px" padding="45px" textAlign="center" boxShadow="0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)">
          <form className="login-form">
            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleLogin} colorScheme="teal" mt={4}>
              Log In
            </Button>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Login;
