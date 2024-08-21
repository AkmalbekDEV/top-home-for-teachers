import { Button, FormControl, FormLabel, Input, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, OrderedList, UnorderedList, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Odd16 = () => {
  const [data, setData] = useState([])
  const [listening, setListening] = useState("")
  const [reading, setReading] = useState("")
  const [writing, setWriting] = useState("")
  const [speaking, setSpeaking] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const listeningTopic = "Listening"
  const readingTopic = "Reading"
  const writingTopic = "Writing"
  const speakingTopic = "Speaking"

  const getData = async () => {
    try {
      const response = await axios.get('https://a67474a4e6e67b1c.mokky.dev/hwOdd16')
      if (Array.isArray(response.data)) {
        setData(response.data)
      } else {
        setData([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const putData = async () => {
    try {
      const res = await axios.patch('https://a67474a4e6e67b1c.mokky.dev/hwOdd16/1', {
        topic1: listeningTopic,
        desc1: listening,
        topic2: readingTopic,
        desc2: reading,
        topic3: writingTopic,
        desc3: writing,
        topic4: speakingTopic,
        desc4: speaking,
      })

      const updatedData = [...data]
      updatedData[0] = res.data
      setData(updatedData)

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (listening === "" || reading === "" || writing === "" || speaking === "") {
      toast({
        duration: 5000,
        status: "error",
        title: "Error",
        description: "You're not filled the all inputs, please try again!"
      })
    } else {
      toast({
        duration: 5000,
        status: "success",
        title: "Submitted!",
        description: "The homework is successfully saved for today!"
      })

      putData().then(() => {
        getData()
      })
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='mt-36 max-w-[1250px] mx-auto max-sm:px-5'>
      <div className='rounded-2xl shadow-2xl w-full p-10 border'>
        <h1 className='text-4xl max-sm:text-3xl font-medium text-blue-700 text-center'>Today's Homeworks</h1>
        <div className='flex justify-center my-10'>
          <Button onClick={onOpen} colorScheme='blue'>Add Homework</Button>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent className='max-sm:mx-5'>
            <ModalHeader>Add Homework</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Listening</FormLabel>
                <Input value={listening} onChange={(e) => setListening(e.target.value)} type='text' placeholder='Units' />
                <FormLabel marginTop={'10px'}>Reading</FormLabel>
                <Input value={reading} onChange={(e) => setReading(e.target.value)} type='text' placeholder='Units' />
                <FormLabel marginTop={'10px'}>Writing</FormLabel>
                <Input value={writing} onChange={(e) => setWriting(e.target.value)} type='text' placeholder='Topic' />
                <FormLabel marginTop={'10px'}>Speaking</FormLabel>
                <Input value={speaking} onChange={(e) => setSpeaking(e.target.value)} type='text' placeholder='Topic' />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleSubmit}>Submit</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <div>
          {data.length > 0 ? data.map((item) => (
            <OrderedList key={item.id} display={'grid'} gap={'5'}>
              <ListItem fontSize={'20'}>
                Listening: {item.desc1} <div><Button marginTop={'5'} colorScheme='blue'>Explaination is here</Button> <Button marginTop={'5'} colorScheme='blue'>Book is here</Button></div>
              </ListItem>
              <ListItem fontSize={'20'}>
                Reading: {item.desc2} <div><Button marginTop={'5'} colorScheme='blue'>Explaination is here</Button> <Button marginTop={'5'} colorScheme='blue'>Book is here</Button></div>
              </ListItem>
              <ListItem fontSize={'20'}>
                Writing: {item.desc3} <div><Button marginTop={'5'} colorScheme='blue'>Explaination is here</Button> <Button marginTop={'5'} colorScheme='blue'>Template is here</Button></div>
              </ListItem>
              <ListItem fontSize={'20'}>
                Speaking: {item.desc4} <div><Button marginTop={'5'} colorScheme='blue'>Explaination is here</Button> <Button marginTop={'5'} colorScheme='blue'>Questions are here</Button></div>
              </ListItem>
            </OrderedList>
          )) : <p className='font-medium text-3xl text-red-500 text-center'>No data available</p>}
        </div>
      </div>
    </div>
  )
}

export default Odd16
