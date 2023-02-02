import React from 'react'
import {Flex, Box, Text, useColorMode} from "@chakra-ui/react"


const Footer = () => {

    let copyRightYear = new Date().getFullYear() + " ChainHooper "; 
    const { colorMode } = useColorMode();

  return (
    <Box 
     bg={ colorMode === 'light' ? 'bg1' : 'footerBg'}
     filter={ colorMode === 'light' ? '' : 'blur(100px)'}
     padding={4}
     width="100%"
     >
      <Flex borderTop={ colorMode === 'light' ? '1px solid #E3E7EE' : '1px solid #E3E7EE'} width="100%">
       <Text mt="5px">© {copyRightYear}</Text>
      </Flex>
   </ Box> 
  )
}

export default Footer
