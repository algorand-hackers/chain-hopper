import React from 'react'
import { Box, Flex, Button } from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <Box bg="#FFFFFF" h="10vh" pt="16px">
        <Flex w="90%" mx="auto" justify="space-between" align="center">
            <Flex>
                ChainHopper
            </Flex>
            <Flex>
                <NavLink>
                    ChainHopper
                </NavLink>
            </Flex>
            <Button>
                connect wallet
            </Button>
        </Flex>
    </Box>
  )
}

export default Navbar