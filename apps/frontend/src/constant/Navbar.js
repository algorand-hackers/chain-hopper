import React, { useState, useContext } from 'react'
import { Box, Flex, Button, Text, Icon, Image, useDisclosure,
    MenuItem,
    Menu,
    MenuButton,
    MenuList,
    MenuDivider,
    Center,
    Spacer
} from "@chakra-ui/react";
import {GiHamburgerMenu} from "react-icons/gi"
import { Link } from 'react-router-dom';
import Applogo from "../asset/Applogo.svg"
import wallet from "../asset/wallet.svg"
import Btn from '../components/UI/Btn';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import MobileNavbar from './MobileNavbar';
import ConnectWallet from '../components/ConnectWallet/ConnectWallet';
import metamask from "../asset/metamask.svg"
import { shortenAddress } from "../utils/shortenedAddress";
import { useAccount, useDisconnect } from "wagmi";
import { TransactionContext } from "../context/TransactionContext";
import Images_Icons from '../constant/icons-images';
import { toast } from 'react-toastify';
import copy from 'copy-to-clipboard';

const Navbar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isMenu, setIsMenu] = useState(false)
    const [isConnect, setIsConnect] = useState(true)
    const { address, isConnected } = useAccount();
    const { currentAccount, connectWallet, connectToMyAlgo, disconnectWallet } = useContext(TransactionContext);
    const { disconnect } = useDisconnect();
    //it will copy the current account that is connected 
     const [copyAddress, setCopyAddress] = useState(address);


    const connectWallets = () => {
      onOpen()
    }
 
     const handleCopyAddress = (e) => {
       setCopyAddress(e.target.value);
    };

     const copyAddressToClipboard = () => {
     copyAddress(copyAddress);
       toast.success('address copied successfully to clipboard', {
         position: toast.POSITION.TOP_RIGHT, 
         autoClose: 3000
       });
   };
   

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
                    <Menu>
                      <MenuButton
                        px={4}
                        py={2}
                      >
                      <Flex gap={2} align="center"  display={{base:"none", md:"flex"}}>
                          <Image src={metamask} w={"20px"} h={"20px"} alt="wallet" />
                          <Text>{shortenAddress(currentAccount)}</Text>
                        <MdOutlineKeyboardArrowDown className='w-[20px] h-[20px]'/>
                      </Flex> 
                      </MenuButton>
                      <MenuList borderRadius={"10.741px"}>
                        { /* Menu ITEM 1 */}
                      <MenuItem _focus={ { bg: "none" } }>
                        <Flex gap={4} align="center" display={{ base: 'none', md: 'flex' }}>
                         <Text fontWeight={500}>Connected to Metamask</Text>
                          <Center size='40px' bgColor="#F1F1F1">
                           <Image src={Images_Icons.metamasklogo} alt="metamask" />
                          </Center>
                        </Flex>
                        </MenuItem>
                        {/* Menu ITEM 2 */}
                        <MenuItem _focus={ { bg: "none" } }>
                        <Flex gap={3} align="center" display={{ base: 'none', md: 'flex' }}>
                          <Text value={copyAddress} onChange={handleCopyAddress}>{shortenAddress(currentAccount)}</Text>
                          <Flex gap={2} align="center" onClick={copyAddressToClipboard}>
                            <Text color={'#3774FF'} fontWeight={500}>
                              Copy address
                            </Text>
                            <Center size="40px">
                              <Image src={Images_Icons.copylogo} alt="copy" />
                            </Center>
                          </Flex>
                          </Flex>
                          </MenuItem>
                        <MenuDivider />
                        { /* Menu ITEM 3 */}
                        <MenuItem _focus={ { bg: "none" } }>
                          <Flex gap={2} align="center" display={{ base: 'none', md: 'flex' }}>
                            <Center size="50px">
                              <Image src={Images_Icons.algologo} alt="Algorand" />
                             </Center>
                            <Text>View on Algoexplorer</Text>
                          </Flex>
                        </MenuItem>
                        {/* Menu ITEM 4 */}
                        <MenuItem _focus={ { bg: "none" } } marginTop={"20px"}>
                          <Flex gap={2} align="center" display={{ base: 'none', md: 'flex' }}>
                            <Center size="50px" onClick={disconnectWallet}>
                              <Image src={Images_Icons.disconnectlogo} alt="Algrorand" />
                            </Center>
                            <Text color={"red"}>Disconnect</Text>
                          </Flex>
                        </MenuItem>
                      </MenuList>
                    </Menu>
            )}


            {/* Connect Wallet  */}

            <ConnectWallet 
            isOpen={isOpen} 
            onOpen={onOpen} 
            onClose={onClose} 
            currentAccount={currentAccount} 
            connectWallet={connectWallet}  
            connectToMyAlgo={connectToMyAlgo}
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