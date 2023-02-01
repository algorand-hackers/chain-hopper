import React, { useState, useContext } from 'react'
import { Box, Flex, Text, Image, useDisclosure,
    MenuItem,
    Menu,
    MenuButton,
    MenuList,
    MenuDivider,
    Center,
    Spacer
} from '@chakra-ui/react';
import { useColorMode } from "@chakra-ui/color-mode"
// import Btn from '../components/UI/Btn';
import CryptoModal from '../components/CryptoModal';
// import ConnectWallet from '../components/ConnectWallet/ConnectWallet';
// import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
// import metamask from "../asset/metamask.svg"
// import { nanoid } from "nanoid";
// import { useAccount, useDisconnect } from "wagmi";
// import { TransactionContext } from "../context/TransactionContext";
// import { shortenAddress } from "../utils/shortenedAddress";
// import Images_Icons from '../constant/icons-images';
// import { toast } from 'react-toastify';
// import copy from 'copy-to-clipboard';

const Home = () => {

  // const { colorMode, toggleColorMode } = useColorMode()
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const { address, isConnected } = useAccount();
  // const { disconnect } = useDisconnect();
  // const { currentAccount, connectWallet, connectToMyAlgo } = useContext(TransactionContext);
  // //it will copy the current account that is connected 
  // const [copyAddress, setCopyAddress] = useState(address);

  // const connectWallets = () => {
  //   onOpen()
  // }
  
  let copyRightYear = new Date().getFullYear() + " ChainHooper ";

//   const handleCopyAddress = (e) => {
//     setCopyAddress(e.target.value);
//  };

//   const copyAddressToClipboard = () => {
//   copy(copyAddress);
//     toast.success('address copied successfully to clipboard', {
//       position: toast.POSITION.TOP_RIGHT, 
//       autoClose: 3000
//     });
// };

  return (
    <Flex direction="column" justify="space-between"   h={{base:"90vh", md:"100%"}} px={5}>
        <Box w={{base:"100%", md:"100%", lg:"85%"}} mt="6rem" mx="auto">
            <Text w={{base:"100%", md:"100%", lg:"554px"}} mb={2} fontSize={{base:"2.2rem", md:"34px", lg:"38.8px"}} fontWeight="700" className='leading-[46px] font-[syne]'> Effortlessly connect different blockchains with Chainhopper </Text>
            <Text className='leading-[26px] font-[syne]' mb={5} maxWidth="500px">
              Are you tired of juggling multiple bridge solutions to transfer your
               assets between different blockchains? Our bridge aggregator simplifies 
               the process by curating the best route for you. Simply specify your source
                and destination chains, and we'll handle the rest.
                </Text>
            {/* {!currentAccount  ? ( */}
                {/* <Box onClick={connectWallets} display={{base:"none", md:"block"}}>
                    <Btn text="connect wallet" />
                </Box> */}
                {/* ):(
                    <Menu>
                      <MenuButton
                        px={4}
                        py={2}
                      > */}
                      {/* <Flex gap={2} align="center"  display={{base:"none", md:"flex"}}>
                          <Image src={metamask} w={"20px"} h={"20px"} alt="wallet" />
                          <Text>{shortenAddress(currentAccount)}</Text>
                        <MdOutlineKeyboardArrowDown className='w-[20px] h-[20px]'/>
                      </Flex>  */}
                      {/* </MenuButton>
                      <MenuList borderRadius={"10.741px"}> */}
                  
                      {/* <MenuItem _focus={ { bg: "none" } }>
                        <Flex gap={4} align="center" display={{ base: 'none', md: 'flex' }}>
                         <Text fontWeight={500}>Connected to Metamask</Text>
                          <Center size='40px' bgColor="#F1F1F1">
                           <Image src={Images_Icons.metamasklogo} alt="metamask" />
                          </Center>
                        </Flex>
                        </MenuItem> */}
                        {/* Menu ITEM 2 */}
                        {/* <MenuItem _focus={ { bg: "none" } }>
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
                          </MenuItem> */}
                        {/* <MenuDivider /> */}
                        { /* Menu ITEM 3 */}
                        {/* <MenuItem _focus={ { bg: "none" } }>
                          <Flex gap={2} align="center" display={{ base: 'none', md: 'flex' }}>
                            <Center size="50px">
                              <Image src={Images_Icons.algologo} alt="Algorand" />
                             </Center>
                            <Text>View on Algoexplorer</Text>
                          </Flex> */}
                        {/* </MenuItem> */}
                        {/* Menu ITEM 4 */}
                        {/* <MenuItem _focus={ { bg: "none" } } marginTop={"20px"}>
                          <Flex gap={2} align="center" display={{ base: 'none', md: 'flex' }}>
                            <Center size="50px" onClick={() => disconnect()}>
                              <Image src={Images_Icons.disconnectlogo} alt="Algrorand" />
                            </Center>
                            <Text color={"red"}>Disconnect</Text>
                          </Flex>
                        </MenuItem> */}
                      {/* </MenuList>
                    </Menu> */}
            {/* )} */}
        </Box>
        <CryptoModal/>
        <Text mb={3}>© {copyRightYear}</Text>
        {/* <ConnectWallet 
          isOpen={isOpen} 
          onOpen={onOpen} 
          onClose={onClose} 
          currentAccount={currentAccount} 
          connectWallet={connectWallet} 
          connectToMyAlgo={connectToMyAlgo}
          /> */}
    
    </Flex>
  )
}

export default Home