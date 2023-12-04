import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  Text,
  extendTheme,
} from '@chakra-ui/react';
//import { GoogleLogin } from 'react-google-login';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('College Station'); // Set default city

  const clientId = "881293908310-52t5ht6pc84gr01iklt9bjr8voh7ng85.apps.googleusercontent.com";
  var isSignedIn = false;

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=4daab2a267f0a71ed3b614f2e168abfa`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleLogin = () => {
    if (username === 'manager' && password === 'manager') {
      navigate('/manager-dashboard');
    } else if (username === 'customer' && password === 'customer') {
      navigate('/menuboard');
    } else if (username === 'cashier' && password === 'cashier') {
      navigate('/CashierDashboard');
    } else {
      alert('Invalid username or password.');
    }
  };

  const onSuccess = (res) => {
    console.log("Login success. Current user: ", res.profileObj);
    isSignedIn = true;
    
    const profileObj = res.profileObj;
    const message = `Welcome, Manager ${profileObj.name}! \nYour email is ${profileObj.email}.`;
    alert(message);

    if (isSignedIn) {
      navigate('/manager-dashboard');
      isSignedIn = false;
    }
  }

  const onFailure = (res) => {
    console.log("Login failed. res: ", res);
  }

  return (
    <ChakraProvider theme={customTheme}>
      <Box className='weather-text' textAlign='center' marginTop='10px'>
        <Input
          type='text'
          placeholder='Enter City'
          value={city}
          onChange={handleCityChange}
          fontFamily='Varela Round'
          background='#2D3748'
          color='white'
          marginBottom='15px'
          padding='15px'
          top= '95px'
        />
      </Box>
      {weatherData && (
            <>
              <Text className='weather-text' style={{ top: '135px' }}>City: {weatherData.name}</Text>
              <Text className='weather-text' style={{ top: '165px' }}>Current Temperature: {weatherData.main.temp}°F</Text>
              <Text className='weather-text' style={{ top: '195px', color: 'red' }}>High: {weatherData.main.temp_max}°F <Text color="blue" display="inline">Low: {weatherData.main.temp_min}°F</Text></Text>
              <Text className='weather-text' style={{ top: '225px' }}>Wind: {weatherData.wind.speed} mph</Text>
              <Text className='weather-text' style={{ top: '255px' }}>Feels Like: {weatherData.main.feels_like}°F</Text>
              <Text className='weather-text' style={{ top: '285px' }}>Description: {weatherData.weather[0].description}</Text>
            </>
          )}
      <Box className='login-page' width='360px' padding='8% 0 0' margin='auto'>
        <Box
          className='form'
          position='relative'
          zIndex='1'
          background='#1A202C'
          maxW='360px'
          margin='0 auto 100px'
          padding='45px'
          textAlign='center'
        >
          <Text
            fontFamily='Varela Round'
            fontSize='40px'
            fontWeight='bold'
            color='#FFFFFF'
            marginBottom='10px'
          >
            Kung Fu Tea
          </Text>
          <Box as='form' className='login-form'>
            <Input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fontFamily='Varela Round'
              background='#2D3748'
              color='white'
              marginBottom='15px'
              padding='15px'
            />
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fontFamily='Varela Round'
              background='#2D3748'
              color='white'
              marginBottom='15px'
              padding='15px'
            />
            <Button
              onClick={handleLogin}
              fontFamily='Varela Round'
              textTransform='uppercase'
              background='#D49D8F'
              padding='15px'
              color='#FFFFFF'
              fontSize='14px'
              marginBottom={"10px"}
              _hover={{ background: '#C39B91' }}
            >
              Log In
            </Button>
            {/* <div id="SignInButton">
              <GoogleLogin clientId={clientId} buttonText="Manager Login with Google" onSuccess={onSuccess} onFailure={onFailure} cookiePolicy={'single_host_origin'}></GoogleLogin>
            </div> */}
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
        bg: 'gray.800',
        color: 'white',
        fontFamily: 'Roboto, sans-serif',
      },
      '.weather-text': {
        position: 'absolute',
        top: 0,
        color: 'white',
        textAlign: 'center',
        margin: 5,
      },
    },
  },
});

export default Login;