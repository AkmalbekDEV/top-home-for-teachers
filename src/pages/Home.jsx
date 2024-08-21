import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';

const Home = () => {
  const [state, setState] = useState([])
  const navigate = useNavigate()
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()

  const correctPassword = '11216591';

  const handleLogin = (e) => {
    e.preventDefault()

    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      toast({
        title: 'Incorrect Password!',
        description: "Please refill the password input and try again",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return;
    }

    setPassword("")
  };

  const handleLogOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  }

  const getData = async () => {
    try {
      const response = await axios.get('https://a67474a4e6e67b1c.mokky.dev/courses')
      setState(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    getData()
  }, [])

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
                  )
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
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button colorScheme='blue' w={{ base: '30%', md: '8%' }} onClick={handleLogin}>Enter!</Button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Home