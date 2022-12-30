import React from 'react'
import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { useColorMode } from "@chakra-ui/color-mode"
import Btn from '../components/UI/Btn';




const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex direction="column" justify="space-between"   h={{base:"90vh", md:"100%"}} px={5}>
        <Box w={{base:"100%", md:"100%", lg:"85%"}} mt="6rem" mx="auto">
            <Text w={{base:"100%", md:"100%", lg:"554px"}} mb={2} fontSize={{base:"2.2rem", md:"34px", lg:"38.8px"}} fontWeight="700" className='leading-[46px] font-[syne]'> Effortlessly connect different blockchains with Chainhooper </Text>
            <Text className='leading-[24px] font-[syne]' mb={5}>Are you tired of juggling multiple bridge solutions to transfer your assets between different blockchains? Our bridge aggregator simplifies the process by curating the best route for you. Simply specify your source and destination chains, and we'll handle the rest</Text>
            <Btn text="connect wallet" />
        </Box>
        <Text mb={3}>© 2023 ChainHooper</Text>
    </Flex>
  )
}

export default Home