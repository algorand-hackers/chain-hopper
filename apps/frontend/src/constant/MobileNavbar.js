import React from 'react'
import { Box, Flex, Button, Text, Icon } from "@chakra-ui/react";

const MobileNavbar = () => {
  return (
    <Box position="relative">
        <Box pos="absolute" bg="#fff" right="0" >
            <Box pt={4} pb={2} pl={4} pr={12} className='mr-4 p-2 font-[500]'>
                Networks
            </Box>
            <Box py={2} pl={4} pr={12} className='mr-4 p-2 font-[500]'>
                Community
            </Box>
            <Box  py={2} pl={4} pr={12} className='mr-4 p-2 font-[500]'>
                Docs
            </Box>
            <Box  pt={2} pb={10} pl={4} pr={12} className='mr-4 p-2 font-[500]'>
                Contact us
            </Box>
        </Box>
    </Box>

  )
}

export default MobileNavbar