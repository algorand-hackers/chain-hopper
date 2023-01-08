import React from 'react'
import { Box, Flex, Button, Text } from "@chakra-ui/react";


const Btn2 = ({ text }) => {
  return (
    <Flex justify={"center"} as="button" py={3} border="2px" w="100%" my={6} rounded="10px" color="#357AFF" >
        <Text>{text}</Text>
    </Flex>
  )
}

export default Btn2

