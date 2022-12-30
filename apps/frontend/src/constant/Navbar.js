import React, { useState } from 'react'
import { Box, Flex, Button, Text, Icon } from "@chakra-ui/react";
import {GiHamburgerMenu} from "react-icons/gi"
import { useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Applogo from "../asset/Applogo.svg"
import wallet from "../asset/wallet.svg"
import Btn from '../components/UI/Btn';
import MobileNavbar from './MobileNavbar';


const Navbar = () => {
    const { getDisclosureProps, getButtonProps } = useDisclosure()

    const buttonProps = getButtonProps()
    const disclosureProps = getDisclosureProps()

  return (
    <Box  h="10vh" pt="16px">
        <Flex w="95%" mx="auto" justify="space-between" align="center">
            <Flex className="font-[syne]">
                <img src={Applogo} alt="logo" />
                <Text ml="3" fontWeight="800"  fontSize="20px">ChainHopper</Text>
            </Flex>
            <Flex display={{base:"none", md:"block"}}>
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
            <Box display={{base:"none", md:"block"}}>
                <Btn text="connect wallet" />
            </Box>
            <Box 
                display={{base:"block", md:"none"}}
                {...buttonProps}
            >
                <Icon boxSize={6} as={GiHamburgerMenu} />
            </Box>
        </Flex>
        <Box {...disclosureProps} display={{base:"block", md:"none"}}>
            <MobileNavbar />
        </Box>
    </Box>
  )
}

export default Navbar