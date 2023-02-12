import { Flex, Text, Image,
    MenuItem,
    Menu,
    MenuButton,
    MenuList,
    MenuDivider,
    Center
} from "@chakra-ui/react";import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { shortenAddress } from "../../utils/shortenedAddress";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Images_Icons from "../../constant/icons-images";
import React, {useState} from 'react';

const ConnectedWallet = ({chainName, walletImage, account, walletName, explorerUrl, explorerName, explorerLogo, explorerLogoAltText, disconnectWallet} ) => {

  
 

    const copyAddressToClipboard = () => {

        copy(account);
        toast.success('The Address was copied to the clipboard', {
        position: toast.POSITION.BOTTOM_RIGHT, 
        autoClose: 2000
        });
    };

return (<Menu>
    <MenuButton
      px={4}
      py={2}
    >
    <Flex gap={2} align="center"  display={{base:"none", md:"flex"}}>
        {/* <Image src={metamask} w={"20px"} h={"20px"} alt="wallet" /> */}
        <Image boxSize="20px" src={walletImage} alt="" />
        <Text>{shortenAddress(account)}</Text>
      <MdOutlineKeyboardArrowDown className='w-[20px] h-[20px]'/>
    </Flex> 
    </MenuButton>
    <MenuList borderRadius={"10.741px"}>
      { /* Menu ITEM 1 */}
    <MenuItem _focus={ { bg: "none" } }>
      <Flex gap={4} align="center" display={{ base: 'none', md: 'flex' }}>
        {/* name is coming from useTransactions Context */}
       <Text fontWeight={500}>Connected to {walletName}</Text>
     

        <Center size='20px' bgColor="#F1F1F1">
         <Image boxSize="25px" src={walletImage} alt="" />
        </Center>
      </Flex>
      </MenuItem>
      {/* Menu ITEM 2 */}
      <MenuItem _focus={ { bg: "none" } }>
      <Flex gap={3} align="center" display={{ base: 'none', md: 'flex' }}>
        <Text value={account} >{shortenAddress(account)}</Text>
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
        <Flex gap={2} align="center" direction="column" display={{ base: 'none', md: 'flex' }}>
                <Flex pr="10px">
                <Image src={explorerLogo} alt={explorerLogoAltText} w="30px" h="30px"   />
                <a href={`${explorerUrl}/${account}`} isExternal target="_blank">
               
              <Text ml="10px">View on {explorerName}</Text>
              </a>
               </Flex>         
        </Flex>
      </MenuItem>
      {/* Menu ITEM 4 */}
      <MenuItem _focus={ { bg: "none" } } marginTop={"20px"}>
        <Flex gap={2} align="center" display={{ base: 'none', md: 'flex' }}
        onClick={() => disconnectWallet(chainName)}
        >
          <Center size="50px">
            <Image src={Images_Icons.disconnectlogo} alt="Algrorand" />
          </Center>
          <Text color={"red"}>Disconnect</Text>
        </Flex>
      </MenuItem>
    </MenuList>
  </Menu>)
}


export default ConnectedWallet;