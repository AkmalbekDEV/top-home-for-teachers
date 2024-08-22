import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';

const Home = () => {
  const [state, setState] = useState([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [show, setShow] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTime, setBlockTime] = useState(null);

  const navigate = useNavigate();
  const toast = useToast();

  const correctPassword = '11216591';
  const maxAttempts = 3;
  const blockDuration = 5 * 60 * 1000; // 5 daqiqa

  const handleClick = () => setShow(!show);

  const handleLogin = (e) => {
    e.preventDefault();

    if (isBlocked) {
      toast({
        title: 'Blocked!',
        description: 'You are temporarily blocked. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setAttempts(0);
      localStorage.removeItem('attempts');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem('attempts', newAttempts);

      if (newAttempts >= maxAttempts) {
        const blockUntil = Date.now() + blockDuration;
        setIsBlocked(true);
        setBlockTime(blockUntil);
        localStorage.setItem('isBlocked', 'true');
        localStorage.setItem('blockTime', blockUntil);
        toast({
          title: 'Blocked!',
          description: 'You have been blocked for 5 minutes because of       multiple incorrect attempts.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Incorrect Password!',
          description: 'Please refill the password input and try again',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }

    setPassword('');
  };

  const handleLogOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const getData = async () => {
    try {
      const response = await axios.get('https://a67474a4e6e67b1c.mokky.dev/courses');
      setState(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }

    const savedAttempts = localStorage.getItem('attempts');
    if (savedAttempts) {
      setAttempts(parseInt(savedAttempts, 10));
    }

    const blocked = localStorage.getItem('isBlocked');
    const savedBlockTime = localStorage.getItem('blockTime');
    if (blocked === 'true' && savedBlockTime) {
      const remainingTime = parseInt(savedBlockTime, 10) - Date.now();
      if (remainingTime > 0) {
        setIsBlocked(true);
        setBlockTime(parseInt(savedBlockTime, 10));
        const timer = setTimeout(() => {
          setIsBlocked(false);
          localStorage.removeItem('isBlocked');
          localStorage.removeItem('blockTime');
          setAttempts(0);
          localStorage.removeItem('attempts');
        }, remainingTime);

        return () => clearTimeout(timer);
      } else {
        localStorage.removeItem('isBlocked');
        localStorage.removeItem('blockTime');
        localStorage.removeItem('attempts');
      }
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div className='flex items-center justify-center w-full h-screen'>
          <div className='grid gap-10'>
            <div className='flex items-center justify-center'>
              <button onClick={handleLogOut} className='text-md text-white text-center cursor-pointer px-2 py-1 rounded-md bg-red-500 w-fit'>Log Out</button>
            </div>
            <h1 className='text-5xl text-blue-600 text-center font-bold'>Choose the group</h1>
            <div className='max-sm:flex max-sm:justify-center'>
              <div className='grid grid-cols-3 justify-items-center gap-5 max-sm:grid-cols-2'>
                {state.map((product) => {
                  return (
                    <div onClick={() => navigate(`/${product.href}`)} key={product.id} className='cursor-pointer hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600 transition-all px-5 py-3 max-sm:flex max-sm:justify-center rounded-xl bg-blue-600'>
                      <h1 className='text-lg font-medium text-white'>{product.name}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-evenly w-full h-screen max-w-[1250px] mx-auto max-sm:px-5'>
          <form onSubmit={handleLogin} className='w-full flex items-center justify-center flex-col gap-5'>
            <InputGroup size='lg' w={{ base: '100%', md: '50%' }} >
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isBlocked}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button colorScheme='blue' w={{ base: '30%', md: '8%' }} onClick={handleLogin} disabled={isBlocked}>Enter!</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
