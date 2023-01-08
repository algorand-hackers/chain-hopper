import React from 'react'
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import wallet from "../../asset/wallet.svg"


const Btn = ({ text }) => {
  return (
    <Flex  as="button" py={3} px={6} bg="btnBg" rounded="24px" color="white" >
        <img src={wallet} alt="logo" />
        <Text ml="2">{text}</Text>
    </Flex>
  )
}

export default Btn

