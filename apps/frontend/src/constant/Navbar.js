import React, { useState, useContext } from 'react'
import { Box, Flex, Button, Text, Icon, Image, useDisclosure } from "@chakra-ui/react";
import {GiHamburgerMenu} from "react-icons/gi"
import { Link } from 'react-router-dom';
import Applogo from "../asset/Applogo.svg"
import wallet from "../asset/wallet.svg"
import Btn from '../components/UI/Btn';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import MobileNavbar from './MobileNavbar';
import ConnectWallet from '../components/ConnectWallet/ConnectWallet';
import metamask from "../asset/metamask.svg"
import { useAccount } from 'wagmi';
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenedAddress";

const Navbar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isMenu, setIsMenu] = useState(false)
    const [isConnect, setIsConnect] = useState(true)
    const { address, isConnected } = useAccount();
    const { currentAccount, connectWallet } = useContext(TransactionContext);
    const connectWallets = () => {
      onOpen()
    }

   

  return (
    <Flex  h="100px">
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
            {!currentAccount ? (
                <Box onClick={connectWallets} display={{base:"none", md:"block"}}>
                    <Btn text="connect wallet" />
                </Box>
                ):(
                <Flex gap={2} align="center"  display={{base:"none", md:"flex"}}>
                    <Image src={metamask} w={"20px"} h={"20px"} alt="wallet" />
                    <Text>{shortenAddress(currentAccount)}</Text>
                    <MdOutlineKeyboardArrowDown className='w-[30px] h-[30px]'/>
                </Flex>
            )}


            {/* Connect Wallet  */}

            <ConnectWallet isOpen={isOpen} onOpen={onOpen} onClose={onClose} currentAccount={currentAccount} connectWallet={connectWallet} />

            {/* Mobile Harmburger */}

        
                <Box 
                    display={{base:"block", md:"none"}}
                    cursor="pointer"
                    onClick={() => setIsMenu(true)}
                >
                    <Icon boxSize={6} as={GiHamburgerMenu} />                
                </Box>
        </Flex>
        {isMenu && <Box  display={{base:"block", md:"none"}}>
            <MobileNavbar setIsMenu={setIsMenu} />
        </Box>}

    </Flex>
  )
}

export default Navbar