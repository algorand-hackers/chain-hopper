import React, { useState, useContext } from 'react'
import { Box, Flex, Text, Image, useDisclosure } from '@chakra-ui/react';
import { useColorMode } from "@chakra-ui/color-mode"
import Btn from '../components/UI/Btn';
import CryptoModal from '../components/CryptoModal';
import ConnectWallet from '../components/ConnectWallet/ConnectWallet';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import metamask from "../asset/metamask.svg"
import { nanoid } from "nanoid";
import { useAccount } from "wagmi";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenedAddress";

const Home = () => {

  // const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { address, isConnected } = useAccount();

  const [walletAddress, setWalletAddress] = useState('');
  const { currentAccount, connectWallet } = useContext(TransactionContext);
  const connectWallets = () => {
    onOpen()
  }
	
   let copyRightYear = new Date().getFullYear() + " ChainHooper ";

  return (
    <Flex direction="column" justify="space-between"   h={{base:"90vh", md:"100%"}} px={5}>
        <Box w={{base:"100%", md:"100%", lg:"85%"}} mt="6rem" mx="auto">
            <Text w={{base:"100%", md:"100%", lg:"554px"}} mb={2} fontSize={{base:"2.2rem", md:"34px", lg:"38.8px"}} fontWeight="700" className='leading-[46px] font-[syne]'> Effortlessly connect different blockchains with Chainhooper </Text>
            <Text className='leading-[24px] font-[syne]' mb={5}>Are you tired of juggling multiple bridge solutions to transfer your assets between different blockchains? Our bridge aggregator simplifies the process by curating the best route for you. Simply specify your source and destination chains, and we'll handle the rest</Text>
            {!currentAccount ? (
                <Box onClick={connectWallets} display={{base:"none", md:"block"}}>
                    <Btn text="connect wallet" />
                </Box>
                ):(
                <Flex  gap={2} align="center"  display={{base:"none", md:"flex"}}>
                    <Image src={metamask} w={"20px"} h={"20px"} alt="wallet" />
                    <Text>{shortenAddress(currentAccount)}</Text>
                    <MdOutlineKeyboardArrowDown className='w-[30px] h-[30px]'/>
                </Flex>
            )}
        </Box>
        <CryptoModal/>
        <Text mb={3}>© {copyRightYear}</Text>
        <ConnectWallet isOpen={isOpen} onOpen={onOpen} onClose={onClose} currentAccount={currentAccount} connectWallet={connectWallet} />
    </Flex>
  )
}

export default Home