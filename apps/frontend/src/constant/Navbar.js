import React, { useState, useContext, useEffect } from 'react'
import {  Flex, Text, Icon, useDisclosure, Box,  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,  useToast,} from "@chakra-ui/react";
import {GiHamburgerMenu} from "react-icons/gi"
import {BsChevronDown} from "react-icons/bs"
import { Link } from 'react-router-dom';
import Applogo from "../asset/Applogo.svg"
import Btn from '../components/UI/Btn';
import MobileNavbar from './MobileNavbar';
import ConnectWallet from '../components/ConnectWallet/ConnectWallet';
import { TransactionContext } from "../context/TransactionContext";
import Images_Icons from '../constant/icons-images';
import ConnectedWallet from '../components/ConnectWallet/ConnectedWallet';
import { Chains } from '@chain-hopper/sdk';

const Navbar = () => {

    const [selectedNetwork, setSelectedNetwork] = useState("mainnet");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toast = useToast();
  
    const handleNetworkChange = (event) => {
        setSelectedNetwork(event.target.value);
        setIsModalOpen(false);
        toast({
          title: `Switched to ${event.target.value}`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
  
    const handleArrowClick = () => {
      setIsModalOpen(true);
    };

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isMenu, setIsMenu] = useState(false)
    const {
      algorandAccount,
      otherChainAccount,
      connectMetamask,
      connectToMyAlgo,
      disconnectWallet,
      connectPhantom,
      algorandWalletName,
      otherWalletName,
      algorandWalletImage,
      otherWalletImage,
      algoscan,
      otherScan,
      otherChainName,
      otherExplorerLogo,
      otherExplorerLogoAltText,
      otherExplorerName,
    } = useContext(TransactionContext);

    const connectWallets = () => {
      onOpen()
    }
 
    useEffect(() => {
      onClose()
      
    }, [algorandAccount, otherChainAccount, connectMetamask, connectToMyAlgo, connectPhantom ])
   

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
            <Box
      border="2px solid"
      borderColor="gray.300"
      borderRadius="full"
      p={2}
      position="relative"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        cursor="pointer"
        onClick={handleArrowClick}
      >
        <Text fontWeight="bold" mr={2}>
          Switch Mode
        </Text>
        <BsChevronDown />
      </Box>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Switch Mode</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              variant="ghost"
              width="full"
              value="mainnet"
              onClick={handleNetworkChange}
            >
              Mainnet
            </Button>
            <Button
              variant="ghost"
              width="full"
              value="testnet"
              onClick={handleNetworkChange}
            >
              Testnet
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
            {(!algorandAccount || !otherChainAccount) && (
                <Box onClick={connectWallets} display={{base:"none", md:"block"}}>
                    <Btn text={!algorandAccount ? "connect Algo wallet" : "connect other wallet"} />
                </Box>
            )}
                
            {algorandAccount &&  (ConnectedWallet({chainName: Chains.ALGO, walletImage:algorandWalletImage, account: algorandAccount, walletName: algorandWalletName, explorerUrl: algoscan, explorerName: "Algoscan", explorerLogo: Images_Icons.algologo, explorerLogoAltText: "Algorand", disconnectWallet}))}
            {otherChainAccount &&  (ConnectedWallet({chainName: otherChainName, walletImage:otherWalletImage, account: otherChainAccount, walletName: otherWalletName, explorerUrl: otherScan, explorerName: otherExplorerName, explorerLogo: otherExplorerLogo, explorerLogoAltText: otherExplorerLogoAltText, disconnectWallet}))}


            {/* Connect Wallet  */}

            <ConnectWallet 
            algorandAccount={algorandAccount}
            otherChainAccount={otherChainAccount}
            isOpen={isOpen} 
            onClose={onClose} 
            connectMetamask={connectMetamask}  
            connectToMyAlgo={connectToMyAlgo}
            connectPhantom={connectPhantom}
            />

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