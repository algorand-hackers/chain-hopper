import React from 'react'
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import Applogo from "../asset/Applogo.svg"
import wallet from "../asset/wallet.svg"


const Navbar = () => {
  return (
    <Box bg="#FFFFFF" h="10vh" pt="16px">
        <Flex w="90%" mx="auto" justify="space-between" align="center">
            <Flex className="font-[syne]">
                <img src={Applogo} alt="logo" />
                <Text ml="3" fontWeight="800"  fontSize="20px">ChainHopper</Text>
            </Flex>
            <Flex>
                <Link className='mr-4 p-2 font-[500]'>
                    Networks
                </Link>
                <Link className='mr-4 p-2 font-[500]'>
                    Community
                </Link>
                <Link className='mr-4 p-2 font-[500]'>
                    Docs
                </Link>
                <Link className='mr-4 p-2 font-[500]'>
                    Contact us
                </Link>
            </Flex>
            <Button bg="btnBg" rounded="24px" color="white" >
                <img src={wallet} alt="logo" />
                <Text ml="2">connect wallet</Text>
            </Button>
        </Flex>
    </Box>
  )
}

export default Navbar