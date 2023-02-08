import React, { useState, useContext, useEffect } from 'react'
import { Box, Flex, Text, Icon, useDisclosure} from "@chakra-ui/react";
import {GiHamburgerMenu} from "react-icons/gi"
import { Link } from 'react-router-dom';
import Applogo from "../asset/Applogo.svg"
import Btn from '../components/UI/Btn';
import MobileNavbar from './MobileNavbar';
import ConnectWallet from '../components/ConnectWallet/ConnectWallet';
import { TransactionContext } from "../context/TransactionContext";
import Images_Icons from '../constant/icons-images';
import ConnectedWallet from '../components/ConnectWallet/ConnectedWallet';

const Navbar = () => {

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
      otherExplorerName
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
            {(!algorandAccount || !otherChainAccount) && (
                <Box onClick={connectWallets} display={{base:"none", md:"block"}}>
                    <Btn text={!algorandAccount ? "connect Algo wallet" : "connect other wallet"} />
                </Box>
            )}
                
            {algorandAccount &&  (ConnectedWallet({chainName: "algo", walletImage:algorandWalletImage, account: algorandAccount, walletName: algorandWalletName, explorerUrl: algoscan, explorerName: "Algoscan", explorerLogo: Images_Icons.algologo, explorerLogoAltText: "Algorand", disconnectWallet}))}
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