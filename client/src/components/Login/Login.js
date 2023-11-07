import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  Text,
  extendTheme,
} from "@chakra-ui/react";

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
    <ChakraProvider theme={customTheme}>
      <Box className="login-page" width="360px" padding="8% 0 0" margin="auto">
        <Box className="form" position="relative" zIndex="1" background="#1A202C" maxW="360px" margin="0 auto 100px" padding="45px" textAlign="center">
          <Text fontFamily="Varela Round" fontSize="40px" fontWeight="bold" color="#FFFFFF" marginBottom="10px">
            Kung Fu Tea
          </Text>
          <Box as="form" className="login-form">
            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} fontFamily="Varela Round" background="#2D3748" color="white" marginBottom="15px" padding="15px" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} fontFamily="Varela Round" background="#2D3748" color="white" marginBottom="15px" padding="15px" />
            <Button onClick={handleLogin} fontFamily="Varela Round" textTransform="uppercase" background="#D49D8F" padding="15px" color="#FFFFFF" fontSize="14px" _hover={{ background: "#C39B91" }}>
              Log In
            </Button>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.800",
        color: "white",
        fontFamily: "Roboto, sans-serif",
      },
    },
  },
});

export default Login;